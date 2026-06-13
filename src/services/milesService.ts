import { Task, TaskPriority } from '../types';

// 基础里程
const BASE_MILES: Record<TaskPriority, number> = {
  urgent: 50,
  important: 25,
  normal: 10,
};

// 番茄钟里程
export const POMODORO_MILES = 15;

// 计算任务完成获得的里程
export function calculateTaskMiles(task: Task): number {
  let miles = BASE_MILES[task.priority] || 10;

  // 提前完成加成：在 deadline 前完成 ×2
  if (task.deadline) {
    const deadline = new Date(task.deadline).getTime();
    const now = Date.now();
    const hoursBeforeDeadline = (deadline - now) / (1000 * 60 * 60);
    if (hoursBeforeDeadline > 24) {
      miles *= 2;
    }
  }

  return Math.round(miles);
}

// 连续打卡加成
export function getStreakMultiplier(streak: number): number {
  if (streak >= 30) return 2.0;
  if (streak >= 14) return 1.8;
  if (streak >= 7) return 1.5;
  if (streak >= 3) return 1.2;
  return 1.0;
}

// 计算经验值
export function calculateXP(task: Task): number {
  const base = BASE_MILES[task.priority] || 10;
  return base * 2;
}
