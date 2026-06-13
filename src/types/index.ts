// ========== 任务 ==========
export type TaskPriority = 'urgent' | 'important' | 'normal';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'abandoned';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  deadline?: string;
  estimatedMinutes: number;
  actualMinutes?: number;
  tags: string[];
  pomodorosCompleted: number;
  milesEarned: number;
  isDaily?: boolean; // 是否每日任务
  dailyResetDate?: string; // 上次重置日期
}

// ========== 番茄钟 ==========
export interface PomodoroRecord {
  id: string;
  taskId?: string;
  startedAt: string;
  endedAt?: string;
  durationMinutes: number;
  completed: boolean;
}

// ========== 旅行 ==========
export interface City {
  id: string;
  name: string;
  nameEn: string;
  country: string;
  emoji: string;
  description: string;
  stories: CityStory[];
  postcard: Postcard;
  souvenir: Souvenir;
  requiredMiles: number;
  coordinates: { lat: number; lng: number };
}

export interface CityStory {
  title: string;
  content: string;
  funFact: string;
}

export interface Postcard {
  quote: string;
  author: string;
}

export interface Souvenir {
  name: string;
  emoji: string;
  effect?: string;
}

export interface TravelProgress {
  currentCityId: string;
  visitedCityIds: string[];
  totalMiles: number;
  currentMiles: number;
  milesToNextCity: number;
  collectedPostcards: string[];
  collectedSouvenirs: string[];
  startedAt: string;
  events: TravelEvent[];
}

export interface TravelEvent {
  id: string;
  type: 'festival' | 'storm' | 'meet_friend' | 'package' | 'discount' | 'challenge';
  cityId?: string;
  message: string;
  milesBonus: number;
  createdAt: string;
  expiresAt?: string;
}

// ========== 用户 ==========
export interface UserProfile {
  id: string;
  nickname: string;
  level: number;
  experience: number;
  totalTasksCompleted: number;
  totalPomodoros: number;
  streak: number;
  lastActiveDate: string;
}

// ========== 成就 ==========
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  progress: number;
  target: number;
  unlockedAt?: string;
}
