import { Task, PomodoroRecord, TravelProgress, UserProfile, Achievement } from '../types';

const KEYS = {
  TASKS: 'traveltodo_tasks',
  POMODOROS: 'traveltodo_pomodoros',
  TRAVEL: 'traveltodo_travel',
  PROFILE: 'traveltodo_profile',
  ACHIEVEMENTS: 'traveltodo_achievements',
};

// 跨平台存储
async function getItem(key: string): Promise<string | null> {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    return await AsyncStorage.getItem(key);
  } catch { return null; }
}

async function setItem(key: string, value: string): Promise<void> {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
      return;
    }
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem(key, value);
  } catch {}
}

// ========== Tasks ==========
export async function loadTasks(): Promise<Task[]> {
  const data = await getItem(KEYS.TASKS);
  return data ? JSON.parse(data) : [];
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await setItem(KEYS.TASKS, JSON.stringify(tasks));
}

// ========== Pomodoros ==========
export async function loadPomodoros(): Promise<PomodoroRecord[]> {
  const data = await getItem(KEYS.POMODOROS);
  return data ? JSON.parse(data) : [];
}

export async function savePomodoros(records: PomodoroRecord[]): Promise<void> {
  await setItem(KEYS.POMODOROS, JSON.stringify(records));
}

// ========== Travel ==========
export async function loadTravel(): Promise<TravelProgress | null> {
  const data = await getItem(KEYS.TRAVEL);
  return data ? JSON.parse(data) : null;
}

export async function saveTravel(progress: TravelProgress): Promise<void> {
  await setItem(KEYS.TRAVEL, JSON.stringify(progress));
}

// ========== Profile ==========
export async function loadProfile(): Promise<UserProfile | null> {
  const data = await getItem(KEYS.PROFILE);
  return data ? JSON.parse(data) : null;
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  await setItem(KEYS.PROFILE, JSON.stringify(profile));
}

// ========== Achievements ==========
export async function loadAchievements(): Promise<Achievement[]> {
  const data = await getItem(KEYS.ACHIEVEMENTS);
  return data ? JSON.parse(data) : [];
}

export async function saveAchievements(achievements: Achievement[]): Promise<void> {
  await setItem(KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
}
