import { allEvents, TravelEvent } from '../data/events';
import { showToast } from '../components/Toast';

// 事件冷却时间（毫秒）
const EVENT_COOLDOWN = 60 * 60 * 1000; // 1小时
let lastEventTime = 0;

// 触发随机事件
export function tryTriggerEvent(condition: TravelEvent['triggerCondition'], cityId?: string): TravelEvent | null {
  const now = Date.now();
  if (now - lastEventTime < EVENT_COOLDOWN) return null;

  // 20% 概率触发
  if (Math.random() > 0.2) return null;

  const eligible = allEvents.filter(e => e.triggerCondition === condition);
  if (eligible.length === 0) return null;

  const event = eligible[Math.floor(Math.random() * eligible.length)];
  lastEventTime = now;

  // 显示 Toast
  const typeMap: Record<string, 'success' | 'miles' | 'event' | 'city'> = {
    festival: 'event',
    storm: 'event',
    meet_friend: 'success',
    package: 'miles',
    discount: 'miles',
    challenge: 'event',
    lucky: 'miles',
    weather: 'success',
    culture: 'event',
    food: 'success',
  };

  showToast({
    type: typeMap[event.type] || 'event',
    title: event.title,
    message: event.message,
    emoji: event.emoji,
  });

  return event;
}

// 任务完成时触发事件
export function onTaskComplete(streak: number): TravelEvent | null {
  if (streak >= 7) {
    return tryTriggerEvent('streak');
  }
  return tryTriggerEvent('task_complete');
}

// 到达新城市时触发事件
export function onCityArrival(cityId: string): TravelEvent | null {
  return tryTriggerEvent('city_arrival', cityId);
}

// 随机事件（定时触发）
export function tryRandomEvent(): TravelEvent | null {
  return tryTriggerEvent('random');
}
