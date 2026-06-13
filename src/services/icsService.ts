import { Task } from '../types';
import { Platform } from 'react-native';

// 生成 ICS 文件内容
export function generateICS(tasks: Task[]): string {
  const now = new Date();
  const timestamp = formatICSDate(now);

  let ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TravelTodo//TravelTodo//CN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:别拖了 - 每日任务',
    'X-WR-TIMEZONE:Asia/Shanghai',
  ];

  tasks.forEach(task => {
    const dueDate = task.deadline ? new Date(task.deadline) : new Date();
    dueDate.setHours(9, 0, 0, 0); // 默认早上9点提醒

    const isDaily = task.isDaily;

    ics.push('BEGIN:VTODO');
    ics.push(`UID:${task.id}@traveltodo`);
    ics.push(`DTSTAMP:${timestamp}`);
    ics.push(`DUE;VALUE=DATE:${formatICSDate(dueDate)}`);
    ics.push(`SUMMARY:${escapeICS(task.title)}`);
    ics.push(`DESCRIPTION:${escapeICS(getTaskDescription(task))}`);
    ics.push(`PRIORITY:${getPriority(task.priority)}`);
    ics.push(`STATUS:${task.status === 'completed' ? 'COMPLETED' : 'NEEDS-ACTION'}`);

    if (isDaily) {
      ics.push('RRULE:FREQ=DAILY');
    }

    // 提醒
    ics.push('BEGIN:VALARM');
    ics.push('TRIGGER:-PT15M');
    ics.push('ACTION:DISPLAY');
    ics.push(`DESCRIPTION:别拖了！${escapeICS(task.title)} 马上到截止时间了`);
    ics.push('END:VALARM');

    ics.push('END:VTODO');
  });

  ics.push('END:VCALENDAR');
  return ics.join('\r\n');
}

// 生成 Apple Reminders URL Scheme
export function generateRemindersURL(task: Task): string {
  const title = encodeURIComponent(task.title);
  const notes = encodeURIComponent(getTaskDescription(task));
  const priority = getPriority(task.priority);

  // Apple Reminders URL Scheme
  // x-apple-reminderkit:// 只在 iOS 上有效
  // 使用 x-apple-reminder:// 也可以
  return `x-apple-reminderkit://REMINDERS_NAME/reminder?title=${title}&notes=${notes}&priority=${priority}`;
}

// 生成 Calendar URL Scheme
export function generateCalendarURL(task: Task): string {
  const title = encodeURIComponent(task.title);
  const startDate = task.deadline || new Date().toISOString();
  const endDate = new Date(new Date(startDate).getTime() + 60 * 60 * 1000).toISOString();

  return `caladd:${title}&startDate=${startDate}&endDate=${endDate}`;
}

// 下载 ICS 文件
export function downloadICS(tasks: Task[]): void {
  const icsContent = generateICS(tasks);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'traveltodo-daily-tasks.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 分享 ICS 文件（移动端）
export async function shareICS(tasks: Task[]): Promise<void> {
  const icsContent = generateICS(tasks);

  if (Platform.OS === 'web' && navigator.share) {
    try {
      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const file = new File([blob], 'traveltodo-tasks.ics', { type: 'text/calendar' });
      await navigator.share({
        title: '别拖了 - 每日任务',
        text: '导入到 iPhone 提醒事项',
        files: [file],
      });
    } catch {
      // 如果分享失败，回退到下载
      downloadICS(tasks);
    }
  } else {
    downloadICS(tasks);
  }
}

// 辅助函数
function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function escapeICS(text: string): string {
  return text.replace(/[,;\\]/g, '\\$&').replace(/\n/g, '\\n');
}

function getPriority(priority: string): number {
  switch (priority) {
    case 'urgent': return 1;
    case 'important': return 5;
    case 'normal': return 9;
    default: return 9;
  }
}

function getTaskDescription(task: Task): string {
  const parts = [];
  parts.push(`优先级: ${task.priority === 'urgent' ? '紧急' : task.priority === 'important' ? '重要' : '普通'}`);
  if (task.estimatedMinutes) parts.push(`预估时长: ${task.estimatedMinutes}分钟`);
  if (task.isDaily) parts.push('🔄 每日重复任务');
  parts.push('来自: 别拖了 App');
  return parts.join('\n');
}

// 预设的每日任务模板
export const DAILY_TASK_TEMPLATES = [
  { title: '🏃 晨跑30分钟', priority: 'important' as const, minutes: 30 },
  { title: '📖 阅读30分钟', priority: 'important' as const, minutes: 30 },
  { title: '🧘 冥想10分钟', priority: 'normal' as const, minutes: 10 },
  { title: '📝 写日记', priority: 'normal' as const, minutes: 15 },
  { title: '💧 喝8杯水', priority: 'normal' as const, minutes: 0 },
  { title: '🍎 吃水果', priority: 'normal' as const, minutes: 0 },
  { title: '📱 不玩手机1小时', priority: 'important' as const, minutes: 60 },
  { title: '🧹 整理房间', priority: 'normal' as const, minutes: 20 },
  { title: '💪 健身30分钟', priority: 'important' as const, minutes: 30 },
  { title: '🎵 练琴30分钟', priority: 'normal' as const, minutes: 30 },
  { title: '📧 回复邮件', priority: 'urgent' as const, minutes: 15 },
  { title: '🛒 买菜', priority: 'normal' as const, minutes: 30 },
];
