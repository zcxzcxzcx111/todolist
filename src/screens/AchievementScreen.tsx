import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Modal, Dimensions,
} from 'react-native';
import { allAchievements, getRarityColor, getRarityName, getCategoryName, Achievement } from '../data/achievements';
import { colors, typography, spacing, radius, shadow } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AchievementScreenProps {
  visible: boolean;
  onClose: () => void;
  totalTasks: number;
  totalPomodoros: number;
  streak: number;
  citiesVisited: number;
  postcards: number;
  souvenirs: number;
}

export default function AchievementScreen({
  visible, onClose, totalTasks, totalPomodoros, streak, citiesVisited, postcards, souvenirs,
}: AchievementScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const categories = [
    { id: 'all', label: '全部', emoji: '🏆' },
    { id: 'travel', label: '旅行', emoji: '✈️' },
    { id: 'task', label: '任务', emoji: '📋' },
    { id: 'pomodoro', label: '番茄钟', emoji: '🍅' },
    { id: 'streak', label: '连续', emoji: '🔥' },
    { id: 'collection', label: '收集', emoji: '📮' },
    { id: 'special', label: '特殊', emoji: '⭐' },
  ];

  const getProgress = (achievement: Achievement): number => {
    switch (achievement.condition) {
      case 'tasks_completed': return totalTasks;
      case 'pomodoros_completed': return totalPomodoros;
      case 'streak_days': return streak;
      case 'cities_visited': return citiesVisited;
      case 'postcards_collected': return postcards;
      case 'souvenirs_collected': return souvenirs;
      default: return 0;
    }
  };

  const filteredAchievements = selectedCategory === 'all'
    ? allAchievements
    : allAchievements.filter(a => a.category === selectedCategory);

  const unlockedCount = allAchievements.filter(a => getProgress(a) >= a.target).length;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>🏆 成就</Text>
          <Text style={styles.count}>{unlockedCount}/{allAchievements.length}</Text>
        </View>

        {/* 成就详情弹窗 */}
        {selectedAchievement && (
          <Modal visible transparent animationType="fade" onRequestClose={() => setSelectedAchievement(null)}>
            <View style={styles.detailOverlay}>
              <View style={styles.detailCard}>
                <Text style={styles.detailEmoji}>{selectedAchievement.emoji}</Text>
                <Text style={styles.detailName}>{selectedAchievement.name}</Text>
                <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(selectedAchievement.rarity) }]}>
                  <Text style={styles.rarityText}>{getRarityName(selectedAchievement.rarity)}</Text>
                </View>
                <Text style={styles.detailDesc}>{selectedAchievement.description}</Text>
                <View style={styles.detailProgress}>
                  <View style={styles.detailProgressBar}>
                    <View style={[styles.detailProgressFill, {
                      width: `${Math.min(getProgress(selectedAchievement) / selectedAchievement.target * 100, 100)}%`,
                      backgroundColor: getRarityColor(selectedAchievement.rarity),
                    }]} />
                  </View>
                  <Text style={styles.detailProgressText}>
                    {getProgress(selectedAchievement)}/{selectedAchievement.target}
                  </Text>
                </View>
                <Text style={styles.detailReward}>🎁 奖励：{selectedAchievement.rewardMiles} 里程</Text>
                <TouchableOpacity style={styles.closeDetailBtn} onPress={() => setSelectedAchievement(null)}>
                  <Text style={styles.closeDetailText}>关闭</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {/* 分类标签 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryBtn, selectedCategory === cat.id && styles.categoryBtnActive]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
              <Text style={[styles.categoryText, selectedCategory === cat.id && styles.categoryTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 成就列表 */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {filteredAchievements.map(achievement => {
            const progress = getProgress(achievement);
            const isUnlocked = progress >= achievement.target;
            const progressPercent = Math.min(progress / achievement.target * 100, 100);

            return (
              <TouchableOpacity
                key={achievement.id}
                style={[styles.achievementCard, isUnlocked && styles.achievementCardUnlocked]}
                onPress={() => setSelectedAchievement(achievement)}
                activeOpacity={0.7}
              >
                <View style={[styles.achievementEmojiBg, {
                  backgroundColor: isUnlocked ? getRarityColor(achievement.rarity) + '15' : '#F3F4F6',
                  borderColor: isUnlocked ? getRarityColor(achievement.rarity) + '30' : '#E5E7EB',
                }]}>
                  <Text style={[styles.achievementEmoji, !isUnlocked && styles.achievementEmojiLocked]}>
                    {achievement.emoji}
                  </Text>
                </View>
                <View style={styles.achievementInfo}>
                  <View style={styles.achievementNameRow}>
                    <Text style={[styles.achievementName, !isUnlocked && styles.achievementNameLocked]}>
                      {achievement.name}
                    </Text>
                    <View style={[styles.rarityTag, { backgroundColor: getRarityColor(achievement.rarity) + '15' }]}>
                      <Text style={[styles.rarityTagText, { color: getRarityColor(achievement.rarity) }]}>
                        {getRarityName(achievement.rarity)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.achievementDesc} numberOfLines={1}>
                    {achievement.description}
                  </Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, {
                      width: `${progressPercent}%`,
                      backgroundColor: isUnlocked ? colors.success : getRarityColor(achievement.rarity),
                    }]} />
                  </View>
                  <Text style={styles.progressText}>{progress}/{achievement.target}</Text>
                </View>
                {isUnlocked && <Text style={styles.checkMark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
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
  count: { ...typography.subhead, color: colors.primary, fontWeight: '600' },
  categoryRow: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, gap: spacing.sm },
  categoryBtn: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: radius.pill, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.separator,
  },
  categoryBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryEmoji: { fontSize: 14, marginRight: spacing.xs },
  categoryText: { ...typography.caption1, color: colors.textSecondary, fontWeight: '600' },
  categoryTextActive: { color: '#FFF' },
  scroll: { padding: spacing.xl },
  achievementCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.lg, marginBottom: spacing.md,
    borderWidth: 0.5, borderColor: colors.separator,
    ...shadow.subtle,
  },
  achievementCardUnlocked: { borderColor: colors.success + '30' },
  achievementEmojiBg: {
    width: 48, height: 48, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, marginRight: spacing.md,
  },
  achievementEmoji: { fontSize: 24 },
  achievementEmojiLocked: { opacity: 0.4 },
  achievementInfo: { flex: 1 },
  achievementNameRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 2,
  },
  achievementName: { ...typography.headline, color: colors.textPrimary },
  achievementNameLocked: { color: colors.textSecondary },
  rarityTag: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.pill },
  rarityTagText: { ...typography.caption2, fontWeight: '700' },
  achievementDesc: { ...typography.caption1, color: colors.textSecondary, marginBottom: spacing.sm },
  progressBar: {
    height: 4, backgroundColor: colors.separator, borderRadius: 2, overflow: 'hidden', marginBottom: 2,
  },
  progressFill: { height: '100%', borderRadius: 2 },
  progressText: { ...typography.caption2, color: colors.textTertiary },
  checkMark: { fontSize: 20, color: colors.success, fontWeight: '700', marginLeft: spacing.sm },
  // Detail modal
  detailOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center', paddingHorizontal: spacing.xxl,
  },
  detailCard: {
    backgroundColor: colors.surface, borderRadius: radius.xl,
    padding: spacing.xxl, alignItems: 'center', ...shadow.elevated,
  },
  detailEmoji: { fontSize: 64, marginBottom: spacing.lg },
  detailName: { ...typography.title2, color: colors.textPrimary, fontWeight: '700' },
  rarityBadge: {
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    borderRadius: radius.pill, marginTop: spacing.sm,
  },
  rarityText: { ...typography.caption1, color: '#FFF', fontWeight: '700' },
  detailDesc: {
    ...typography.subhead, color: colors.textSecondary,
    textAlign: 'center', lineHeight: 22, marginTop: spacing.lg,
  },
  detailProgress: { width: '100%', marginTop: spacing.xl },
  detailProgressBar: {
    height: 8, backgroundColor: colors.separator, borderRadius: 4, overflow: 'hidden',
  },
  detailProgressFill: { height: '100%', borderRadius: 4 },
  detailProgressText: {
    ...typography.caption1, color: colors.textSecondary,
    textAlign: 'center', marginTop: spacing.sm,
  },
  detailReward: {
    ...typography.subhead, color: colors.primary, fontWeight: '600',
    marginTop: spacing.lg,
  },
  closeDetailBtn: {
    marginTop: spacing.xl, backgroundColor: colors.primary,
    borderRadius: radius.pill, paddingHorizontal: spacing.xxxl, paddingVertical: spacing.md,
  },
  closeDetailText: { ...typography.headline, color: '#FFF' },
});
