import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Task, TaskPriority } from '../types';
import { useColors } from '../theme/useColors';
import { typography, spacing, radius, shadow } from '../theme';

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  index?: number;
}

export default function TaskCard({ task, onComplete, onDelete, index = 0 }: TaskCardProps) {
  const colors = useColors();
  const isCompleted = task.status === 'completed';
  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !isCompleted;

  const priorityConfig: Record<TaskPriority, { color: string; bg: string; label: string; emoji: string }> = {
    urgent: { color: colors.urgent, bg: colors.urgent + '12', label: '紧急', emoji: '🔴' },
    important: { color: colors.important, bg: colors.important + '12', label: '重要', emoji: '🟡' },
    normal: { color: colors.normal, bg: colors.normal + '12', label: '普通', emoji: '🔵' },
  };

  const priority = priorityConfig[task.priority];
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;

  const handleComplete = () => {
    if (isCompleted) return;
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 80, friction: 6, useNativeDriver: true }),
    ]).start();
    Animated.timing(checkAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    onComplete(task.id);
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <View style={[s.card, { backgroundColor: colors.surface }, isCompleted && s.cardCompleted]}>
        <View style={[s.priorityBar, { backgroundColor: priority.color }]} />
        <View style={s.row}>
          <TouchableOpacity
            style={[s.checkBtn, { borderColor: priority.color }, isCompleted && { backgroundColor: colors.success, borderColor: colors.success }]}
            onPress={handleComplete}
            activeOpacity={0.7}
          >
            {isCompleted && <Animated.Text style={[s.checkMark, { opacity: checkAnim }]}>✓</Animated.Text>}
          </TouchableOpacity>
          <View style={s.info}>
            <Text style={[s.title, { color: colors.textPrimary }, isCompleted && { textDecorationLine: 'line-through', color: colors.textTertiary }]} numberOfLines={1}>
              {task.title}
            </Text>
            <View style={s.meta}>
              <View style={[s.priorityTag, { backgroundColor: priority.bg }]}>
                <Text style={[s.priorityText, { color: priority.color }]}>{priority.emoji} {priority.label}</Text>
              </View>
              {task.isDaily && (
                <View style={[s.dailyTag, { backgroundColor: colors.primaryLight }]}>
                  <Text style={[s.dailyText, { color: colors.primary }]}>🔄 每日</Text>
                </View>
              )}
              <Text style={[s.milesText, { color: colors.miles }]}>+{task.milesEarned || 0} 里程</Text>
              {isOverdue && <Text style={[s.overdueText, { color: colors.destructive }]}>已超期</Text>}
            </View>
          </View>
          <TouchableOpacity onPress={() => onDelete(task.id)} style={[s.deleteBtn, { backgroundColor: colors.separator }]} activeOpacity={0.6}>
            <Text style={[s.deleteText, { color: colors.textTertiary }]}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  card: { borderRadius: 18, padding: 16, paddingLeft: 20, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3, overflow: 'hidden' },
  cardCompleted: { opacity: 0.65 },
  priorityBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, borderTopLeftRadius: 18, borderBottomLeftRadius: 18 },
  row: { flexDirection: 'row', alignItems: 'center' },
  checkBtn: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  checkMark: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  info: { flex: 1 },
  title: { fontSize: 17, fontWeight: '600', marginBottom: 4 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  priorityTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 100 },
  priorityText: { fontSize: 11, fontWeight: '600' },
  dailyTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 100 },
  dailyText: { fontSize: 11, fontWeight: '600' },
  milesText: { fontSize: 12, fontWeight: '700' },
  overdueText: { fontSize: 11, fontWeight: '700' },
  deleteBtn: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  deleteText: { fontSize: 20, fontWeight: '300' },
});
