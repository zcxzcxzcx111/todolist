import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Platform,
} from 'react-native';
import { Task, TaskPriority } from '../types';
import Calendar from '../components/Calendar';
import TaskCard from '../components/TaskCard';
import { downloadICS, shareICS, DAILY_TASK_TEMPLATES } from '../services/icsService';
import { StaggerCard } from '../components/AnimatedCard';
import { colors, typography, spacing, radius, shadow } from '../theme';

interface CalendarScreenProps {
  visible: boolean;
  tasks: Task[];
  onClose: () => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onAddDailyTask: (title: string, priority: TaskPriority) => void;
}

export default function CalendarScreen({
  visible, tasks, onClose, onComplete, onDelete, onAddDailyTask,
}: CalendarScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showTemplates, setShowTemplates] = useState(false);

  // 选中日期的任务
  const selectedDayTasks = tasks.filter(t =>
    t.createdAt.startsWith(selectedDate) ||
    (t.deadline && t.deadline.startsWith(selectedDate)) ||
    (t.isDaily)
  );

  const completedCount = selectedDayTasks.filter(t => t.status === 'completed').length;

  const handleExportICS = () => {
    const dailyTasks = tasks.filter(t => t.isDaily);
    if (dailyTasks.length === 0) {
      alert('还没有每日任务，先添加一些吧！');
      return;
    }
    if (Platform.OS === 'web') {
      downloadICS(dailyTasks);
    } else {
      shareICS(dailyTasks);
    }
  };

  const handleAddTemplate = (title: string, priority: TaskPriority) => {
    onAddDailyTask(title, priority);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>📅 日历</Text>
          <TouchableOpacity onPress={handleExportICS} style={styles.exportBtn}>
            <Text style={styles.exportText}>导出</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* 日历 */}
          <Calendar
            tasks={tasks}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />

          {/* 选中日期的任务 */}
          <View style={styles.taskSection}>
            <View style={styles.taskHeader}>
              <Text style={styles.taskTitle}>
                {selectedDate === new Date().toISOString().split('T')[0]
                  ? '📋 今日任务'
                  : `📋 ${selectedDate} 任务`}
              </Text>
              <Text style={styles.taskCount}>{completedCount}/{selectedDayTasks.length}</Text>
            </View>

            {selectedDayTasks.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyEmoji}>📭</Text>
                <Text style={styles.emptyText}>这一天没有任务</Text>
              </View>
            ) : (
              selectedDayTasks.map((task, index) => (
                <StaggerCard key={task.id} index={index}>
                  <TaskCard
                    task={task}
                    onComplete={onComplete}
                    onDelete={onDelete}
                    index={index}
                  />
                </StaggerCard>
              ))
            )}
          </View>

          {/* 快捷操作 */}
          <View style={styles.actionSection}>
            <Text style={styles.actionTitle}>⚡ 快捷操作</Text>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setShowTemplates(!showTemplates)}
              activeOpacity={0.7}
            >
              <Text style={styles.actionEmoji}>🔄</Text>
              <View style={styles.actionTextWrap}>
                <Text style={styles.actionLabel}>添加每日任务</Text>
                <Text style={styles.actionHint}>从模板快速添加</Text>
              </View>
              <Text style={styles.actionArrow}>{showTemplates ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {showTemplates && (
              <View style={styles.templateGrid}>
                {DAILY_TASK_TEMPLATES.map((template, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.templateChip}
                    onPress={() => handleAddTemplate(template.title, template.priority)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.templateText}>{template.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleExportICS}
              activeOpacity={0.7}
            >
              <Text style={styles.actionEmoji}>📤</Text>
              <View style={styles.actionTextWrap}>
                <Text style={styles.actionLabel}>导出到 iPhone 提醒事项</Text>
                <Text style={styles.actionHint}>生成 .ics 文件，导入到系统日历</Text>
              </View>
              <Text style={styles.actionArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* 使用说明 */}
          <View style={styles.helpSection}>
            <Text style={styles.helpTitle}>💡 如何导入 iPhone 提醒事项</Text>
            <View style={styles.helpStep}>
              <Text style={styles.helpNum}>1</Text>
              <Text style={styles.helpText}>点击「导出到 iPhone 提醒事项」</Text>
            </View>
            <View style={styles.helpStep}>
              <Text style={styles.helpNum}>2</Text>
              <Text style={styles.helpText}>下载 .ics 文件</Text>
            </View>
            <View style={styles.helpStep}>
              <Text style={styles.helpNum}>3</Text>
              <Text style={styles.helpText}>用 iPhone 打开文件，选择「日历」或「提醒事项」</Text>
            </View>
            <View style={styles.helpStep}>
              <Text style={styles.helpNum}>4</Text>
              <Text style={styles.helpText}>任务会自动添加到系统，每天提醒你！</Text>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 50, paddingBottom: spacing.lg, paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 0.5, borderBottomColor: colors.separator,
  },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center',
  },
  closeBtnText: { fontSize: 16, color: colors.textSecondary, fontWeight: '600' },
  title: { flex: 1, ...typography.title3, color: colors.textPrimary, textAlign: 'center' },
  exportBtn: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    backgroundColor: colors.primaryLight, borderRadius: radius.pill,
  },
  exportText: { ...typography.caption1, color: colors.primary, fontWeight: '600' },
  scroll: { padding: spacing.xl },
  taskSection: { marginTop: spacing.xl },
  taskHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.md,
  },
  taskTitle: { ...typography.headline, color: colors.textPrimary },
  taskCount: { ...typography.caption1, color: colors.primary, fontWeight: '600' },
  emptyCard: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.xxxl, alignItems: 'center', ...shadow.card,
  },
  emptyEmoji: { fontSize: 40, marginBottom: spacing.md },
  emptyText: { ...typography.subhead, color: colors.textSecondary },
  actionSection: { marginTop: spacing.xl },
  actionTitle: { ...typography.headline, color: colors.textPrimary, marginBottom: spacing.md },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.lg, marginBottom: spacing.sm,
    ...shadow.subtle,
  },
  actionEmoji: { fontSize: 24, marginRight: spacing.md },
  actionTextWrap: { flex: 1 },
  actionLabel: { ...typography.headline, color: colors.textPrimary },
  actionHint: { ...typography.caption1, color: colors.textSecondary, marginTop: 2 },
  actionArrow: { fontSize: 20, color: colors.textTertiary, fontWeight: '300' },
  templateGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm,
    padding: spacing.lg, backgroundColor: colors.surface,
    borderRadius: radius.lg, marginBottom: spacing.sm,
    ...shadow.subtle,
  },
  templateChip: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    backgroundColor: colors.background, borderRadius: radius.pill,
    borderWidth: 1, borderColor: colors.separator,
  },
  templateText: { ...typography.caption1, color: colors.textPrimary },
  helpSection: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.lg, ...shadow.subtle,
  },
  helpTitle: { ...typography.headline, color: colors.textPrimary, marginBottom: spacing.md },
  helpStep: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: spacing.sm, gap: spacing.md,
  },
  helpNum: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: colors.primary, color: '#FFF',
    textAlign: 'center', lineHeight: 24,
    ...typography.caption1, fontWeight: '700',
  },
  helpText: { ...typography.subhead, color: colors.textSecondary, flex: 1 },
});
