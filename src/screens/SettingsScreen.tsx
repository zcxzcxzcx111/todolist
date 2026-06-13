import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Platform, Linking,
} from 'react-native';
import { themePresets, ThemePreset } from '../theme/presets';
import { colors, typography, spacing, radius, shadow } from '../theme';

interface SettingsScreenProps {
  visible: boolean;
  onClose: () => void;
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
  onExportData: () => void;
  onClearData: () => void;
}

export default function SettingsScreen({
  visible, onClose, currentTheme, onThemeChange, onExportData, onClearData,
}: SettingsScreenProps) {
  const [showThemePicker, setShowThemePicker] = useState(false);

  const currentPreset = themePresets.find(t => t.id === currentTheme) || themePresets[0];

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>⚙️ 设置</Text>
          <View style={{ width: 32 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* 主题选择 */}
          <Text style={styles.sectionTitle}>🎨 主题配色</Text>
          <TouchableOpacity
            style={styles.themeBtn}
            onPress={() => setShowThemePicker(!showThemePicker)}
            activeOpacity={0.7}
          >
            <View style={[styles.themePreview, { backgroundColor: currentPreset.colors.primary }]}>
              <Text style={styles.themePreviewText}>{currentPreset.emoji}</Text>
            </View>
            <View style={styles.themeInfo}>
              <Text style={styles.themeName}>{currentPreset.name}</Text>
              <Text style={styles.themeDesc}>{currentPreset.description}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {showThemePicker && (
            <View style={styles.themeGrid}>
              {themePresets.map(preset => (
                <TouchableOpacity
                  key={preset.id}
                  style={[
                    styles.themeCard,
                    currentTheme === preset.id && styles.themeCardActive,
                  ]}
                  onPress={() => {
                    onThemeChange(preset.id);
                    setShowThemePicker(false);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={[styles.themeCardBg, { backgroundColor: preset.colors.primary }]}>
                    <Text style={styles.themeCardEmoji}>{preset.emoji}</Text>
                  </View>
                  <Text style={styles.themeCardName}>{preset.name}</Text>
                  <Text style={styles.themeCardDesc}>{preset.description}</Text>
                  {currentTheme === preset.id && (
                    <View style={styles.activeBadge}>
                      <Text style={styles.activeBadgeText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* 数据管理 */}
          <Text style={styles.sectionTitle}>📊 数据管理</Text>

          <TouchableOpacity style={styles.settingBtn} onPress={onExportData} activeOpacity={0.7}>
            <Text style={styles.settingEmoji}>📤</Text>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>导出数据</Text>
              <Text style={styles.settingHint}>导出任务和旅行记录</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingBtn}
            onPress={() => {
              if (Platform.OS === 'web') {
                if (window.confirm('确定要清除所有数据吗？此操作不可撤销！')) {
                  onClearData();
                }
              } else {
                onClearData();
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.settingEmoji}>🗑️</Text>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.destructive }]}>清除所有数据</Text>
              <Text style={styles.settingHint}>删除所有任务和旅行记录</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {/* 关于 */}
          <Text style={styles.sectionTitle}>ℹ️ 关于</Text>

          <View style={styles.aboutCard}>
            <Text style={styles.aboutEmoji}>✈️</Text>
            <Text style={styles.aboutName}>别拖了</Text>
            <Text style={styles.aboutVersion}>v1.0.0</Text>
            <Text style={styles.aboutDesc}>
              一款专为拖延症用户设计的时间规划 App{'\n'}
              通过环球旅行游戏化系统，让你爱上行动
            </Text>
          </View>

          <View style={styles.featureList}>
            <Text style={styles.featureTitle}>✨ 核心功能</Text>
            <Text style={styles.featureItem}>📋 任务管理 — 快速添加、优先级、截止日期</Text>
            <Text style={styles.featureItem}>🍅 番茄钟 — 专注计时、白噪音</Text>
            <Text style={styles.featureItem}>✈️ 环球旅行 — 20个城市、里程推进</Text>
            <Text style={styles.featureItem}>📮 明信册 — 收集城市贴纸和故事</Text>
            <Text style={styles.featureItem}>🎁 纪念品柜 — 19个城市专属纪念品</Text>
            <Text style={styles.featureItem}>🏆 成就系统 — 45+成就、稀有度分级</Text>
            <Text style={styles.featureItem}>📅 日历视图 — 按日查看任务</Text>
            <Text style={styles.featureItem}>📤 iPhone集成 — 导出到提醒事项</Text>
          </View>

          {/* 技术栈 */}
          <View style={styles.techCard}>
            <Text style={styles.techTitle}>🛠️ 技术栈</Text>
            <Text style={styles.techItem}>React Native + Expo</Text>
            <Text style={styles.techItem}>TypeScript</Text>
            <Text style={styles.techItem}>LocalStorage</Text>
            <Text style={styles.techItem}>Vercel 部署</Text>
          </View>

          {/* GitHub */}
          <TouchableOpacity
            style={styles.githubBtn}
            onPress={() => Linking.openURL('https://github.com/zcxzcxzcx111/todolist')}
            activeOpacity={0.7}
          >
            <Text style={styles.githubText}>📦 GitHub 仓库</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 50, paddingBottom: spacing.lg, paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 0.5, borderBottomColor: colors.separator,
  },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center',
  },
  closeBtnText: { fontSize: 16, color: colors.textSecondary, fontWeight: '600' },
  title: { ...typography.title3, color: colors.textPrimary },
  scroll: { padding: spacing.xl },
  sectionTitle: {
    ...typography.headline, color: colors.textPrimary,
    marginTop: spacing.xl, marginBottom: spacing.md,
  },
  // 主题
  themeBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.lg, ...shadow.card,
  },
  themePreview: {
    width: 48, height: 48, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
    marginRight: spacing.md,
  },
  themePreviewText: { fontSize: 24 },
  themeInfo: { flex: 1 },
  themeName: { ...typography.headline, color: colors.textPrimary },
  themeDesc: { ...typography.caption1, color: colors.textSecondary, marginTop: 2 },
  arrow: { fontSize: 24, color: colors.textTertiary, fontWeight: '300' },
  themeGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md,
    marginTop: spacing.md,
  },
  themeCard: {
    width: '47%', backgroundColor: colors.surface,
    borderRadius: radius.lg, padding: spacing.lg,
    borderWidth: 2, borderColor: 'transparent',
    ...shadow.subtle, position: 'relative',
  },
  themeCardActive: { borderColor: colors.primary },
  themeCardBg: {
    width: 48, height: 48, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: spacing.sm,
  },
  themeCardEmoji: { fontSize: 24 },
  themeCardName: { ...typography.headline, color: colors.textPrimary },
  themeCardDesc: { ...typography.caption1, color: colors.textSecondary, marginTop: 2 },
  activeBadge: {
    position: 'absolute', top: spacing.sm, right: spacing.sm,
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center',
  },
  activeBadgeText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  // 设置项
  settingBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.lg, marginBottom: spacing.sm,
    ...shadow.subtle,
  },
  settingEmoji: { fontSize: 24, marginRight: spacing.md },
  settingInfo: { flex: 1 },
  settingLabel: { ...typography.headline, color: colors.textPrimary },
  settingHint: { ...typography.caption1, color: colors.textSecondary, marginTop: 2 },
  // 关于
  aboutCard: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.xl, alignItems: 'center', ...shadow.card,
  },
  aboutEmoji: { fontSize: 48, marginBottom: spacing.md },
  aboutName: { ...typography.title2, color: colors.textPrimary },
  aboutVersion: { ...typography.caption1, color: colors.textTertiary, marginTop: 4 },
  aboutDesc: {
    ...typography.subhead, color: colors.textSecondary,
    textAlign: 'center', lineHeight: 22, marginTop: spacing.md,
  },
  featureList: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.lg, marginTop: spacing.md, ...shadow.subtle,
  },
  featureTitle: { ...typography.headline, color: colors.textPrimary, marginBottom: spacing.sm },
  featureItem: { ...typography.subhead, color: colors.textSecondary, lineHeight: 24 },
  techCard: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.lg, marginTop: spacing.md, ...shadow.subtle,
  },
  techTitle: { ...typography.headline, color: colors.textPrimary, marginBottom: spacing.sm },
  techItem: { ...typography.subhead, color: colors.textSecondary, lineHeight: 24 },
  githubBtn: {
    backgroundColor: colors.textPrimary, borderRadius: radius.lg,
    padding: spacing.lg, alignItems: 'center', marginTop: spacing.md,
  },
  githubText: { ...typography.headline, color: '#FFF' },
});
