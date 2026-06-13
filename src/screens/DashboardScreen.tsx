import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Modal, KeyboardAvoidingView, Platform, Animated,
} from 'react-native';
import { TaskPriority } from '../types';
import TaskCard from '../components/TaskCard';
import TravelDashboard from '../components/TravelDashboard';
import PostcardScreen from './PostcardScreen';
import SouvenirScreen from './SouvenirScreen';
import AchievementScreen from './AchievementScreen';
import CalendarScreen from './CalendarScreen';
import SettingsScreen from './SettingsScreen';
import { useTheme } from '../theme/ThemeContext';
import { useColors } from '../theme/useColors';
import Toast, { ToastData, useToastListener, showToast } from '../components/Toast';
import { StaggerCard, FadeSlideUp, Pulse } from '../components/AnimatedCard';
import { useStore } from '../hooks/useStore';
import { onTaskComplete } from '../services/eventService';
import { typography, spacing, radius, shadow } from '../theme';

export default function DashboardScreen() {
  const { tasks, travel, profile, stats, isLoaded, addTask, completeTask, deleteTask } = useStore();
  const { currentTheme, setTheme } = useTheme();
  const colors = useColors();
  const [showAdd, setShowAdd] = useState(false);
  const [showPostcards, setShowPostcards] = useState(false);
  const [showSouvenirs, setShowSouvenirs] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<TaskPriority>('normal');
  const [newDeadline, setNewDeadline] = useState<string>('');
  const [newIsDaily, setNewIsDaily] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoaded) {
      Animated.timing(headerAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }
  }, [isLoaded]);

  // Toast 监听
  useToastListener(useCallback((t: ToastData) => setToast(t), []));

  if (!isLoaded || !travel || !profile) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingEmoji}>✈️</Text>
        <Text style={styles.loadingText}>准备出发...</Text>
      </View>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const dailyTasks = tasks.filter(t => t.isDaily && t.dailyResetDate === today);
  const pendingTasks = tasks.filter(t => !t.isDaily && (t.status === 'pending' || t.status === 'in_progress'));

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const estimatedMinutes = newPriority === 'urgent' ? 60 : newPriority === 'important' ? 45 : 30;
    addTask({
      title: newTitle.trim(),
      priority: newPriority,
      estimatedMinutes,
      tags: [],
      deadline: newDeadline || undefined,
      isDaily: newIsDaily,
    });
    setNewTitle('');
    setNewPriority('normal');
    setNewDeadline('');
    setNewIsDaily(false);
    setShowAdd(false);
  };

  const handleComplete = (taskId: string) => {
    completeTask(taskId);
    // 触发事件
    const event = onTaskComplete(profile.streak);
    if (event && event.milesBonus > 0) {
      showToast({
        type: 'miles',
        title: event.title,
        message: `获得 ${event.milesBonus} 额外里程！`,
        emoji: event.emoji,
      });
    }
  };

  // 设置截止日期（默认选项）
  const deadlineOptions = [
    { label: '今天', value: 'today' },
    { label: '明天', value: 'tomorrow' },
    { label: '本周', value: 'week' },
    { label: '下周', value: 'next_week' },
    { label: '不限', value: '' },
  ];

  const getDeadlineDate = (option: string): string => {
    const now = new Date();
    switch (option) {
      case 'today': return now.toISOString().split('T')[0];
      case 'tomorrow': now.setDate(now.getDate() + 1); return now.toISOString().split('T')[0];
      case 'week': now.setDate(now.getDate() + (7 - now.getDay())); return now.toISOString().split('T')[0];
      case 'next_week': now.setDate(now.getDate() + (14 - now.getDay())); return now.toISOString().split('T')[0];
      default: return '';
    }
  };

  return (
    <View style={styles.container}>
      {/* Toast */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: headerAnim }]}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greeting}>你好，旅行者 👋</Text>
              <Text style={styles.quote}>开始做，就对了。</Text>
            </View>
            <TouchableOpacity style={styles.settingsBtn} onPress={() => setShowSettings(true)} activeOpacity={0.7}>
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Travel Dashboard */}
        <TravelDashboard travel={travel} profile={profile} />

        {/* 快捷入口 */}
        <FadeSlideUp delay={200}>
          <View style={styles.shortcutRow}>
            <TouchableOpacity style={styles.shortcutBtn} onPress={() => setShowCalendar(true)} activeOpacity={0.7}>
              <View style={[styles.shortcutIconBg, { backgroundColor: '#FEF3C7' }]}>
                <Text style={styles.shortcutEmoji}>📅</Text>
              </View>
              <Text style={styles.shortcutText}>日历</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shortcutBtn} onPress={() => setShowPostcards(true)} activeOpacity={0.7}>
              <View style={[styles.shortcutIconBg, { backgroundColor: colors.accentLight }]}>
                <Text style={styles.shortcutEmoji}>📮</Text>
              </View>
              <Text style={styles.shortcutText}>明信册</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shortcutBtn} onPress={() => setShowSouvenirs(true)} activeOpacity={0.7}>
              <View style={[styles.shortcutIconBg, { backgroundColor: colors.primaryLight }]}>
                <Text style={styles.shortcutEmoji}>🎁</Text>
              </View>
              <Text style={styles.shortcutText}>纪念品</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shortcutBtn} onPress={() => setShowAchievements(true)} activeOpacity={0.7}>
              <View style={[styles.shortcutIconBg, { backgroundColor: colors.successLight }]}>
                <Text style={styles.shortcutEmoji}>🏆</Text>
              </View>
              <Text style={styles.shortcutText}>成就</Text>
            </TouchableOpacity>
          </View>
        </FadeSlideUp>

        {/* 今日进度 */}
        <FadeSlideUp delay={300}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📊 今日进度</Text>
            <View style={styles.progressCard}>
              <View style={styles.progressBar}>
                <View style={[
                  styles.progressFill,
                  { width: stats.todayTotal > 0 ? `${(stats.todayCompleted / stats.todayTotal) * 100}%` : '0%' }
                ]} />
              </View>
              <View style={styles.progressRow}>
                <Text style={styles.progressText}>
                  {stats.todayCompleted}/{stats.todayTotal} 完成
                </Text>
                {stats.overdueCount > 0 && (
                  <Text style={styles.overdueText}>{stats.overdueCount} 个已超期</Text>
                )}
              </View>
            </View>
          </View>
        </FadeSlideUp>

        {/* 每日任务 */}
        {dailyTasks.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🔄 每日任务</Text>
              <Text style={styles.sectionCount}>{dailyTasks.filter(t => t.status === 'completed').length}/{dailyTasks.length}</Text>
            </View>
            {dailyTasks.map((task, index) => (
              <StaggerCard key={task.id} index={index}>
                <TaskCard
                  task={task}
                  onComplete={handleComplete}
                  onDelete={deleteTask}
                  index={index}
                />
              </StaggerCard>
            ))}
          </View>
        )}

        {/* 待办任务 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 待办任务</Text>
          {pendingTasks.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyEmoji}>🎉</Text>
              <Text style={styles.emptyText}>没有待办任务！</Text>
              <Text style={styles.emptySub}>添加新任务开始旅行吧</Text>
            </View>
          ) : (
            pendingTasks.map((task, index) => (
              <StaggerCard key={task.id} index={index}>
                <TaskCard
                  task={task}
                  onComplete={handleComplete}
                  onDelete={deleteTask}
                  index={index}
                />
              </StaggerCard>
            ))
          )}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* FAB */}
      <Pulse style={styles.fabWrap}>
        <TouchableOpacity style={styles.fab} onPress={() => setShowAdd(true)} activeOpacity={0.8}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </Pulse>

      {/* 添加任务弹窗 */}
      <Modal visible={showAdd} transparent animationType="fade" onRequestClose={() => setShowAdd(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>✨ 添加任务</Text>

            <TextInput
              style={styles.input}
              placeholder="输入任务名称..."
              placeholderTextColor={colors.textTertiary}
              value={newTitle}
              onChangeText={setNewTitle}
              autoFocus
            />

            <Text style={styles.priorityLabel}>优先级</Text>
            <View style={styles.priorityRow}>
              {(['urgent', 'important', 'normal'] as TaskPriority[]).map(p => {
                const cfg = { urgent: { color: colors.urgent, emoji: '🔴', label: '紧急' }, important: { color: colors.important, emoji: '🟡', label: '重要' }, normal: { color: colors.normal, emoji: '🔵', label: '普通' } }[p];
                return (
                  <TouchableOpacity
                    key={p}
                    style={[styles.priorityBtn, newPriority === p && { borderColor: cfg.color, backgroundColor: cfg.color + '10' }]}
                    onPress={() => setNewPriority(p)}
                  >
                    <Text style={[styles.priorityBtnText, newPriority === p && { color: cfg.color }]}>
                      {cfg.emoji} {cfg.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.priorityLabel}>截止日期</Text>
            <View style={styles.deadlineRow}>
              {deadlineOptions.map(opt => (
                <TouchableOpacity
                  key={opt.value}
                  style={[styles.deadlineBtn, newDeadline === getDeadlineDate(opt.value) && styles.deadlineBtnActive]}
                  onPress={() => setNewDeadline(getDeadlineDate(opt.value))}
                >
                  <Text style={[styles.deadlineBtnText, newDeadline === getDeadlineDate(opt.value) && styles.deadlineBtnTextActive]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 每日任务开关 */}
            <TouchableOpacity
              style={styles.dailyToggle}
              onPress={() => setNewIsDaily(!newIsDaily)}
              activeOpacity={0.7}
            >
              <View style={[styles.dailyCheckbox, newIsDaily && styles.dailyCheckboxActive]}>
                {newIsDaily && <Text style={styles.dailyCheckMark}>✓</Text>}
              </View>
              <View style={styles.dailyTextWrap}>
                <Text style={styles.dailyLabel}>🔄 每日重复</Text>
                <Text style={styles.dailyHint}>每天自动重置，养成好习惯</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowAdd(false)}>
                <Text style={styles.cancelText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
                <Text style={styles.addBtnText}>添加任务</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* 子页面 */}
      {travel && <PostcardScreen visible={showPostcards} travel={travel} onClose={() => setShowPostcards(false)} />}
      {travel && <SouvenirScreen visible={showSouvenirs} travel={travel} onClose={() => setShowSouvenirs(false)} />}
      <AchievementScreen
        visible={showAchievements}
        onClose={() => setShowAchievements(false)}
        totalTasks={profile.totalTasksCompleted}
        totalPomodoros={profile.totalPomodoros}
        streak={profile.streak}
        citiesVisited={travel.visitedCityIds.length}
        postcards={travel.collectedPostcards.length}
        souvenirs={travel.collectedSouvenirs.length}
      />
      <CalendarScreen
        visible={showCalendar}
        tasks={tasks}
        onClose={() => setShowCalendar(false)}
        onComplete={handleComplete}
        onDelete={deleteTask}
        onAddDailyTask={(title, priority) => {
          addTask({ title, priority, estimatedMinutes: 30, tags: [], isDaily: true });
          showToast({ type: 'success', title: '每日任务已添加', message: title, emoji: '✅' });
        }}
      />
      <SettingsScreen
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        currentTheme={currentTheme}
        onThemeChange={setTheme}
        onExportData={() => {
          const data = { tasks, travel, profile };
          const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'traveltodo-backup.json';
          link.click();
          URL.revokeObjectURL(url);
          showToast({ type: 'success', title: '导出成功', message: '数据已下载', emoji: '📤' });
        }}
        onClearData={() => {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.clear();
          }
          showToast({ type: 'event', title: '数据已清除', message: '刷新页面生效', emoji: '🗑️' });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingEmoji: { fontSize: 48, marginBottom: spacing.lg },
  loadingText: { ...typography.headline, color: colors.textSecondary },
  scroll: { paddingTop: 60 },
  header: { paddingHorizontal: spacing.xl, marginBottom: spacing.xl },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { ...typography.title1, color: colors.textPrimary },
  quote: { ...typography.subhead, color: colors.textSecondary, marginTop: spacing.xs },
  settingsBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center',
    ...shadow.subtle,
  },
  settingsIcon: { fontSize: 20 },
  shortcutRow: { flexDirection: 'row', paddingHorizontal: spacing.xl, marginBottom: spacing.xl, gap: spacing.md },
  shortcutBtn: { flex: 1, alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, paddingVertical: spacing.lg, ...shadow.card },
  shortcutIconBg: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm },
  shortcutEmoji: { fontSize: 22 },
  shortcutText: { ...typography.caption1, color: colors.textPrimary, fontWeight: '600' },
  section: { paddingHorizontal: spacing.xl, marginBottom: spacing.xl },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sectionTitle: { ...typography.headline, color: colors.textPrimary },
  sectionCount: { ...typography.caption1, color: colors.primary, fontWeight: '600' },
  progressCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, ...shadow.card },
  progressBar: { height: 8, backgroundColor: colors.primaryLight, borderRadius: 4, overflow: 'hidden', marginBottom: spacing.sm },
  progressFill: { height: '100%', backgroundColor: colors.success, borderRadius: 4 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressText: { ...typography.caption1, color: colors.textSecondary },
  overdueText: { ...typography.caption1, color: colors.destructive, fontWeight: '600' },
  emptyCard: { backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.xxxxl, alignItems: 'center', ...shadow.card },
  emptyEmoji: { fontSize: 48, marginBottom: spacing.lg },
  emptyText: { ...typography.title3, color: colors.textPrimary },
  emptySub: { ...typography.subhead, color: colors.textSecondary, marginTop: spacing.xs },
  fabWrap: { position: 'absolute', bottom: 32, right: 20 },
  fab: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', ...shadow.glow },
  fabIcon: { fontSize: 30, color: '#FFF', fontWeight: '300', marginTop: -2 },
  overlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'center', paddingHorizontal: spacing.xl },
  modal: { backgroundColor: colors.surface, borderRadius: radius.xxl, padding: spacing.xxl, ...shadow.elevated },
  modalTitle: { ...typography.title3, color: colors.textPrimary, marginBottom: spacing.xl },
  input: { ...typography.body, backgroundColor: colors.background, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1.5, borderColor: colors.separator, marginBottom: spacing.xl, color: colors.textPrimary },
  priorityLabel: { ...typography.subhead, color: colors.textSecondary, marginBottom: spacing.sm },
  priorityRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
  priorityBtn: { flex: 1, paddingVertical: spacing.md, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.separator, alignItems: 'center' },
  priorityBtnText: { ...typography.caption1, fontWeight: '600', color: colors.textSecondary },
  deadlineRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.xl },
  deadlineBtn: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.separator },
  deadlineBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  deadlineBtnText: { ...typography.caption1, color: colors.textSecondary },
  deadlineBtnTextActive: { color: '#FFF', fontWeight: '600' },
  dailyToggle: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.background, borderRadius: radius.lg,
    padding: spacing.lg, marginBottom: spacing.xl,
    borderWidth: 1.5, borderColor: colors.separator,
  },
  dailyCheckbox: {
    width: 24, height: 24, borderRadius: 8,
    borderWidth: 2, borderColor: colors.separator,
    justifyContent: 'center', alignItems: 'center',
    marginRight: spacing.md,
  },
  dailyCheckboxActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dailyCheckMark: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  dailyTextWrap: { flex: 1 },
  dailyLabel: { ...typography.headline, color: colors.textPrimary },
  dailyHint: { ...typography.caption1, color: colors.textSecondary, marginTop: 2 },
  modalActions: { flexDirection: 'row', gap: spacing.md },
  cancelBtn: { flex: 1, paddingVertical: spacing.md, borderRadius: radius.md, alignItems: 'center', backgroundColor: colors.background },
  cancelText: { ...typography.headline, color: colors.textSecondary },
  addBtn: { flex: 1, paddingVertical: spacing.md, borderRadius: radius.md, alignItems: 'center', backgroundColor: colors.primary },
  addBtnText: { ...typography.headline, color: colors.textOnPrimary },
});
