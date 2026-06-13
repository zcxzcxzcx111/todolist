import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Task, TaskPriority } from '../types';
import { colors, typography, spacing, radius, shadow } from '../theme';

const PRIORITY_CONFIG: Record<TaskPriority, { color: string; bg: string; label: string; emoji: string }> = {
  urgent: { color: colors.urgent, bg: 'rgba(239, 68, 68, 0.08)', label: '紧急', emoji: '🔴' },
  important: { color: colors.important, bg: 'rgba(245, 158, 11, 0.08)', label: '重要', emoji: '🟡' },
  normal: { color: colors.normal, bg: 'rgba(59, 130, 246, 0.08)', label: '普通', emoji: '🔵' },
};

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  index?: number;
}

export default function TaskCard({ task, onComplete, onDelete, index = 0 }: TaskCardProps) {
  const priority = PRIORITY_CONFIG[task.priority];
  const isCompleted = task.status === 'completed';
  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !isCompleted;

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;

  const handleComplete = () => {
    if (isCompleted) return;
    // 完成动画
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 80, friction: 6, useNativeDriver: true }),
    ]).start();

    Animated.timing(checkAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();

    onComplete(task.id);
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <View style={[styles.card, isCompleted && styles.cardCompleted]}>
        {/* 优先级条 */}
        <View style={[styles.priorityBar, { backgroundColor: priority.color }]} />

        <View style={styles.row}>
          {/* 完成按钮 */}
          <TouchableOpacity
            style={[styles.checkBtn, isCompleted && { backgroundColor: colors.success, borderColor: colors.success }]}
            onPress={handleComplete}
            activeOpacity={0.7}
          >
            {isCompleted && (
              <Animated.Text style={[styles.checkMark, { opacity: checkAnim }]}>✓</Animated.Text>
            )}
          </TouchableOpacity>

          {/* 任务信息 */}
          <View style={styles.info}>
            <Text style={[styles.title, isCompleted && styles.titleCompleted]} numberOfLines={1}>
              {task.title}
            </Text>
            <View style={styles.meta}>
              <View style={[styles.priorityTag, { backgroundColor: priority.bg }]}>
                <Text style={[styles.priorityText, { color: priority.color }]}>
                  {priority.emoji} {priority.label}
                </Text>
              </View>
              <Text style={styles.milesText}>+{task.milesEarned || 0} 里程</Text>
              {isOverdue && <Text style={styles.overdueText}>已超期</Text>}
            </View>
          </View>

          {/* 删除按钮 */}
          <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteBtn} activeOpacity={0.6}>
            <Text style={styles.deleteText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    paddingLeft: spacing.lg + 4,
    marginBottom: spacing.md,
    ...shadow.card,
    overflow: 'hidden',
  },
  cardCompleted: {
    opacity: 0.65,
  },
  priorityBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: radius.lg,
    borderBottomLeftRadius: radius.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  checkMark: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  title: {
    ...typography.headline,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textTertiary,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  priorityTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  priorityText: {
    ...typography.caption2,
    fontWeight: '600',
  },
  milesText: {
    ...typography.caption1,
    color: colors.miles,
    fontWeight: '700',
  },
  overdueText: {
    ...typography.caption2,
    color: colors.destructive,
    fontWeight: '700',
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  deleteText: {
    fontSize: 20,
    color: colors.textTertiary,
    fontWeight: '300',
  },
});
