import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Modal, Dimensions,
} from 'react-native';
import { TravelProgress } from '../types';
import { cities } from '../data/cities';
import { colors, typography, spacing, radius, shadow } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SouvenirScreenProps {
  visible: boolean;
  travel: TravelProgress;
  onClose: () => void;
}

export default function SouvenirScreen({ visible, travel, onClose }: SouvenirScreenProps) {
  const [selectedSouvenir, setSelectedSouvenir] = useState<{
    cityId: string;
    name: string;
    emoji: string;
    effect: string;
    description: string;
  } | null>(null);

  const collectedCities = cities.filter(c => travel.collectedSouvenirs.includes(c.id));
  const uncollectedCities = cities.filter(c => !travel.collectedSouvenirs.includes(c.id));

  // 纪念品详细描述
  const souvenirDescriptions: Record<string, string> = {
    '京剧脸谱': '京剧脸谱是中国传统戏曲艺术的瑰宝，每种颜色代表不同的人物性格：红色代表忠诚，黑色代表刚直，白色代表奸诈。',
    '招财猫': '招财猫源自日本，举左手招财，举右手招客。这只神奇的猫咪会为你的旅途带来好运加成！',
    '法式贝雷帽': '贝雷帽是法国文化的象征，艺术家和诗人的标配。戴上它，你就是巴黎街头最优雅的旅人。',
    '红色电话亭': '伦敦的红色电话亭虽然已很少使用，但仍是英国文化的标志。收集它，解锁复古风格主题。',
    '自由女神像': '自由女神像是美国的象征，法国赠送的礼物。迷你版的她会守护你的旅程。',
    '考拉玩偶': '考拉是澳大利亚的国宝，每天睡22小时的懒萌动物。它会陪伴你度过漫长的旅途。',
    '金字塔模型': '金字塔是古埃及文明的象征，4500年不倒的奇迹。迷你金字塔会为你的旅程增添神秘感。',
    '桑巴面具': '桑巴面具来自里约狂欢节，华丽而热情。戴上它，感受巴西的活力。',
    '土耳其灯': '土耳其灯色彩斑斓，点亮后如繁星闪烁。它会照亮你前行的道路。',
    '非洲木雕': '非洲木雕粗犷而富有生命力，每一件都是独一无二的艺术品。',
    '角斗士头盔': '罗马角斗士的头盔，象征勇气和荣耀。戴上它，你就是旅途中的勇士。',
    '金色骆驼': '迪拜的金色骆驼，象征奢华和财富。它会为你的旅程带来好运。',
    '大象木雕': '泰国的大象是智慧和力量的象征。这头小象会守护你的旅途。',
    '套娃': '俄罗斯套娃大套小，象征家庭和生育。打开一个，还有更多惊喜。',
    '韩服人偶': '韩国传统服饰韩服，优雅而端庄。这个小人偶会为你的旅程增添东方韵味。',
    '印度纱丽': '印度纱丽6米长的丝绸缠绕而成，华丽而优雅。穿上它，感受印度的异域风情。',
    '花环': '夏威夷花环是Aloha精神的象征，用鲜花欢迎远方的客人。戴上它，感受热带的温暖。',
    '极光水晶': '冰岛极光的结晶，封存了北极光的神秘光芒。它会为你的旅程带来希望之光。',
    '企鹅徽章': '南极洲的企鹅徽章，象征着你到达了地球的尽头。这是环球旅行者的最高荣誉。',
  };

  const handleSouvenirPress = (city: typeof cities[0]) => {
    setSelectedSouvenir({
      cityId: city.id,
      name: city.souvenir.name,
      emoji: city.souvenir.emoji,
      effect: city.souvenir.effect || '',
      description: souvenirDescriptions[city.souvenir.name] || '一件珍贵的旅行纪念品，记录着你在这座城市的美好回忆。',
    });
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>🎁 纪念品柜</Text>
          <Text style={styles.count}>{collectedCities.length}/{cities.length}</Text>
        </View>

        {/* 纪念品详情弹窗 */}
        {selectedSouvenir && (
          <Modal visible transparent animationType="fade" onRequestClose={() => setSelectedSouvenir(null)}>
            <View style={styles.detailOverlay}>
              <View style={styles.detailCard}>
                <View style={styles.detailEmojiBg}>
                  <Text style={styles.detailEmoji}>{selectedSouvenir.emoji}</Text>
                </View>
                <Text style={styles.detailName}>{selectedSouvenir.name}</Text>
                {selectedSouvenir.effect && (
                  <View style={styles.effectBadge}>
                    <Text style={styles.effectText}>✨ {selectedSouvenir.effect}</Text>
                  </View>
                )}
                <View style={styles.detailDescBox}>
                  <Text style={styles.detailDesc}>{selectedSouvenir.description}</Text>
                </View>
                <TouchableOpacity style={styles.closeDetailBtn} onPress={() => setSelectedSouvenir(null)}>
                  <Text style={styles.closeDetailText}>收入纪念品柜</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* 已收集 */}
          {collectedCities.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>✅ 已收集 ({collectedCities.length})</Text>
              {collectedCities.map(city => (
                <TouchableOpacity
                  key={city.id}
                  style={styles.souvenirCard}
                  onPress={() => handleSouvenirPress(city)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.souvenirEmojiBg, { backgroundColor: getCityColor(city.id) + '20' }]}>
                    <Text style={styles.souvenirEmoji}>{city.souvenir.emoji}</Text>
                  </View>
                  <View style={styles.souvenirInfo}>
                    <View style={styles.souvenirNameRow}>
                      <Text style={styles.souvenirName}>{city.souvenir.name}</Text>
                      <Text style={styles.cityTag}>{city.emoji} {city.name}</Text>
                    </View>
                    {city.souvenir.effect && (
                      <Text style={styles.souvenirEffect}>✨ {city.souvenir.effect}</Text>
                    )}
                  </View>
                  <Text style={styles.arrowText}>›</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* 未收集 */}
          {uncollectedCities.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>🔒 未解锁 ({uncollectedCities.length})</Text>
              {uncollectedCities.map(city => (
                <View key={city.id} style={[styles.souvenirCard, styles.souvenirCardLocked]}>
                  <View style={[styles.souvenirEmojiBg, styles.souvenirEmojiBgLocked]}>
                    <Text style={styles.souvenirEmojiLocked}>❓</Text>
                  </View>
                  <View style={styles.souvenirInfo}>
                    <Text style={styles.souvenirNameLocked}>???</Text>
                    <Text style={styles.souvenirCityLocked}>{city.emoji} {city.name} · 未到达</Text>
                  </View>
                </View>
              ))}
            </>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

function getCityColor(cityId: string): string {
  const colorMap: Record<string, string> = {
    beijing: '#FF6B6B', tokyo: '#FFB7C5', paris: '#87CEEB', london: '#DDA0DD',
    newyork: '#FFD700', sydney: '#FF8C42', cairo: '#F4A460', rio: '#32CD32',
    istanbul: '#9B59B6', capetown: '#FF69B4', rome: '#E74C3C', dubai: '#FFD700',
    bangkok: '#FF69B4', moscow: '#3498DB', seoul: '#FF69B4', mumbai: '#FF8C42',
    hawaii: '#00CED1', reykjavik: '#87CEEB', antarctica: '#B0E0E6',
  };
  return colorMap[cityId] || '#87CEEB';
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
  scroll: { padding: spacing.xl },
  sectionTitle: {
    ...typography.headline, color: colors.textPrimary,
    marginBottom: spacing.md, marginTop: spacing.lg,
  },
  souvenirCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 0.5,
    borderColor: colors.separator,
    ...shadow.subtle,
  },
  souvenirCardLocked: { opacity: 0.5 },
  souvenirEmojiBg: {
    width: 48, height: 48, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
    marginRight: spacing.md,
  },
  souvenirEmojiBgLocked: { backgroundColor: '#E0E0E0' },
  souvenirEmoji: { fontSize: 24 },
  souvenirEmojiLocked: { fontSize: 20, color: '#AAA' },
  souvenirInfo: { flex: 1 },
  souvenirNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  souvenirName: {
    ...typography.headline, color: colors.textPrimary,
  },
  cityTag: {
    ...typography.caption2, color: colors.textSecondary,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm, paddingVertical: 2,
    borderRadius: radius.pill,
  },
  souvenirEffect: {
    ...typography.caption1, color: colors.primary,
    marginTop: 2,
  },
  souvenirNameLocked: {
    ...typography.headline, color: colors.textTertiary,
  },
  souvenirCityLocked: {
    ...typography.caption1, color: colors.textTertiary,
    marginTop: 2,
  },
  arrowText: {
    fontSize: 24, color: colors.textTertiary, fontWeight: '300',
  },
  // 详情弹窗
  detailOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center', paddingHorizontal: spacing.xxl,
  },
  detailCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    ...shadow.elevated,
  },
  detailEmojiBg: {
    width: 100, height: 100, borderRadius: 30,
    backgroundColor: colors.background,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: colors.primary + '30',
    marginBottom: spacing.lg,
    ...shadow.card,
  },
  detailEmoji: { fontSize: 56 },
  detailName: {
    ...typography.title2, color: colors.textPrimary, fontWeight: '700',
  },
  effectBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    marginTop: spacing.md,
  },
  effectText: {
    ...typography.subhead, color: colors.primary, fontWeight: '600',
  },
  detailDescBox: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.xl,
    width: '100%',
  },
  detailDesc: {
    ...typography.subhead, color: colors.textSecondary,
    lineHeight: 22, textAlign: 'center',
  },
  closeDetailBtn: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.md,
  },
  closeDetailText: { ...typography.headline, color: '#FFF' },
});
