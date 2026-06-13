import { useState, useCallback, useEffect, useMemo } from 'react';
import { Task, TravelProgress, UserProfile, TaskStatus } from '../types';
import { cities, getNextCityMiles } from '../data/cities';
import { calculateTaskMiles, getStreakMultiplier, calculateXP } from '../services/milesService';
import * as storage from '../services/storage';

export function useStore() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [travel, setTravel] = useState<TravelProgress | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // 启动时加载数据
  useEffect(() => {
    (async () => {
      const [loadedTasks, loadedTravel, loadedProfile] = await Promise.all([
        storage.loadTasks(),
        storage.loadTravel(),
        storage.loadProfile(),
      ]);

      setTasks(loadedTasks);
      setTravel(loadedTravel || createDefaultTravel());
      setProfile(loadedProfile || createDefaultProfile());
      setIsLoaded(true);
    })();
  }, []);

  // 数据变化时自动保存
  useEffect(() => {
    if (!isLoaded) return;
    storage.saveTasks(tasks);
  }, [tasks, isLoaded]);

  useEffect(() => {
    if (!isLoaded || !travel) return;
    storage.saveTravel(travel);
  }, [travel, isLoaded]);

  useEffect(() => {
    if (!isLoaded || !profile) return;
    storage.saveProfile(profile);
  }, [profile, isLoaded]);

  // ========== 任务操作 ==========
  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'status' | 'pomodorosCompleted' | 'milesEarned'>) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      pomodorosCompleted: 0,
      milesEarned: 0,
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  }, []);

  const completeTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const completedTask: Task = {
        ...t,
        status: 'completed',
        completedAt: new Date().toISOString(),
        milesEarned: calculateTaskMiles(t),
      };

      // 增加里程
      const miles = completedTask.milesEarned;
      const streak = profile?.streak || 0;
      const multiplier = getStreakMultiplier(streak);
      const finalMiles = Math.round(miles * multiplier);

      // 更新旅行进度
      setTravel(prevTravel => {
        if (!prevTravel) return prevTravel;
        const newTravel = { ...prevTravel };
        newTravel.totalMiles += finalMiles;
        newTravel.currentMiles += finalMiles;

        // 检查是否到达新城市
        const nextCity = getNextCityMiles(newTravel.currentCityId, newTravel.visitedCityIds);
        if (nextCity && newTravel.currentMiles >= nextCity.miles) {
          newTravel.currentCityId = nextCity.city.id;
          newTravel.visitedCityIds = [...newTravel.visitedCityIds, nextCity.city.id];
          newTravel.currentMiles = newTravel.currentMiles - nextCity.miles;
          newTravel.collectedPostcards = [...newTravel.collectedPostcards, nextCity.city.id];
          newTravel.collectedSouvenirs = [...newTravel.collectedSouvenirs, nextCity.city.id];
        }

        return newTravel;
      });

      // 更新用户资料
      setProfile(prevProfile => {
        if (!prevProfile) return prevProfile;
        const xp = calculateXP(completedTask);
        const newXP = prevProfile.experience + xp;
        const newLevel = Math.floor(newXP / 100) + 1;
        return {
          ...prevProfile,
          experience: newXP,
          level: newLevel,
          totalTasksCompleted: prevProfile.totalTasksCompleted + 1,
        };
      });

      return completedTask;
    }));
  }, [profile]);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  }, []);

  // ========== 番茄钟 ==========
  const addPomodoroMiles = useCallback((taskId?: string) => {
    const streak = profile?.streak || 0;
    const multiplier = getStreakMultiplier(streak);
    const miles = Math.round(15 * multiplier);

    setTravel(prev => {
      if (!prev) return prev;
      const newTravel = { ...prev, totalMiles: prev.totalMiles + miles, currentMiles: prev.currentMiles + miles };

      const nextCity = getNextCityMiles(newTravel.currentCityId, newTravel.visitedCityIds);
      if (nextCity && newTravel.currentMiles >= nextCity.miles) {
        newTravel.currentCityId = nextCity.city.id;
        newTravel.visitedCityIds = [...newTravel.visitedCityIds, nextCity.city.id];
        newTravel.currentMiles = newTravel.currentMiles - nextCity.miles;
        newTravel.collectedPostcards = [...newTravel.collectedPostcards, nextCity.city.id];
        newTravel.collectedSouvenirs = [...newTravel.collectedSouvenirs, nextCity.city.id];
      }

      return newTravel;
    });

    if (taskId) {
      setTasks(prev => prev.map(t =>
        t.id === taskId ? { ...t, pomodorosCompleted: t.pomodorosCompleted + 1 } : t
      ));
    }

    setProfile(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        totalPomodoros: prev.totalPomodoros + 1,
        experience: prev.experience + 20,
        level: Math.floor((prev.experience + 20) / 100) + 1,
      };
    });
  }, [profile]);

  // ========== 统计 ==========
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(t => t.createdAt.startsWith(today));
    const completedToday = todayTasks.filter(t => t.status === 'completed');
    const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress');
    const overdueTasks = tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed');

    return {
      todayTotal: todayTasks.length,
      todayCompleted: completedToday.length,
      pendingCount: pendingTasks.length,
      overdueCount: overdueTasks.length,
    };
  }, [tasks]);

  return {
    tasks,
    travel,
    profile,
    stats,
    isLoaded,
    addTask,
    completeTask,
    deleteTask,
    addPomodoroMiles,
  };
}

// ========== 辅助函数 ==========
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function createDefaultTravel(): TravelProgress {
  return {
    currentCityId: 'beijing',
    visitedCityIds: ['beijing'],
    totalMiles: 0,
    currentMiles: 0,
    milesToNextCity: 200,
    collectedPostcards: ['beijing'],
    collectedSouvenirs: ['beijing'],
    startedAt: new Date().toISOString(),
    events: [],
  };
}

function createDefaultProfile(): UserProfile {
  return {
    id: generateId(),
    nickname: '旅行者',
    level: 1,
    experience: 0,
    totalTasksCompleted: 0,
    totalPomodoros: 0,
    streak: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
  };
}
