import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../types';
import { colors, typography, spacing, radius, shadow } from '../theme';

interface CalendarProps {
  tasks: Task[];
  onDateSelect: (date: string) => void;
  selectedDate: string;
}

export default function Calendar({ tasks, onDateSelect, selectedDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // 月份第一天是周几
  const firstDay = new Date(year, month, 1).getDay();
  // 月份天数
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // 今天
  const today = new Date().toISOString().split('T')[0];

  // 生成日历网格
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  // 每天的任务数
  const getTaskCount = (day: number): number => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(t =>
      t.createdAt.startsWith(dateStr) ||
      (t.deadline && t.deadline.startsWith(dateStr)) ||
      (t.isDaily)
    ).length;
  };

  // 每天完成的任务数
  const getCompletedCount = (day: number): number => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(t =>
      (t.createdAt.startsWith(dateStr) || (t.deadline && t.deadline.startsWith(dateStr))) &&
      t.status === 'completed'
    ).length;
  };

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <View style={styles.container}>
      {/* 月份导航 */}
      <View style={styles.monthNav}>
        <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
          <Text style={styles.navText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthTitle}>{year}年{monthNames[month]}</Text>
        <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
          <Text style={styles.navText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* 星期标题 */}
      <View style={styles.weekRow}>
        {weekDays.map(day => (
          <Text key={day} style={styles.weekDay}>{day}</Text>
        ))}
      </View>

      {/* 日期网格 */}
      <View style={styles.daysGrid}>
        {days.map((day, index) => {
          if (day === null) {
            return <View key={`empty-${index}`} style={styles.dayCell} />;
          }

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isToday = dateStr === today;
          const isSelected = dateStr === selectedDate;
          const taskCount = getTaskCount(day);
          const completedCount = getCompletedCount(day);
          const hasTasks = taskCount > 0;
          const allCompleted = hasTasks && completedCount === taskCount;

          return (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayCell,
                isToday && styles.dayCellToday,
                isSelected && styles.dayCellSelected,
              ]}
              onPress={() => onDateSelect(dateStr)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.dayText,
                isToday && styles.dayTextToday,
                isSelected && styles.dayTextSelected,
              ]}>
                {day}
              </Text>
              {/* 任务指示点 */}
              {hasTasks && (
                <View style={styles.dotRow}>
                  <View style={[
                    styles.dot,
                    allCompleted ? styles.dotCompleted : styles.dotPending,
                  ]} />
                  {taskCount > 1 && (
                    <Text style={styles.dotCount}>{taskCount}</Text>
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    ...shadow.card,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  navBtn: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: colors.background,
  },
  navText: { fontSize: 24, color: colors.textPrimary, fontWeight: '300' },
  monthTitle: { ...typography.title3, color: colors.textPrimary },
  weekRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  weekDay: {
    flex: 1, textAlign: 'center',
    ...typography.caption1, color: colors.textTertiary, fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  dayCellToday: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
  },
  dayCellSelected: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
  },
  dayText: {
    ...typography.subhead,
    color: colors.textPrimary,
  },
  dayTextToday: {
    color: colors.primary,
    fontWeight: '700',
  },
  dayTextSelected: {
    color: '#FFF',
    fontWeight: '700',
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 2,
  },
  dot: {
    width: 5, height: 5, borderRadius: 2.5,
  },
  dotCompleted: { backgroundColor: colors.success },
  dotPending: { backgroundColor: colors.primary },
  dotCount: {
    ...typography.caption2,
    color: colors.textTertiary,
    fontSize: 8,
  },
});
