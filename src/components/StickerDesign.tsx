import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, shadow } from '../theme';

interface StickerProps {
  emoji: string;
  name: string;
  rarity: 'common' | 'rare' | 'legendary';
  size?: number;
  style?: ViewStyle;
}

// 精细贴纸组件 - 多层设计
export default function StickerDesign({ emoji, name, rarity, size = 80, style }: StickerProps) {
  const isRare = rarity === 'rare';
  const isLegendary = rarity === 'legendary';

  // 根据稀有度选择配色
  const borderColor = isLegendary ? '#FFD700' : isRare ? '#5B8DEF' : '#E5E7EB';
  const bgColor = isLegendary ? '#FFF8E1' : isRare ? '#EFF6FF' : '#FAFAFA';
  const glowColor = isLegendary ? 'rgba(255, 215, 0, 0.3)' : isRare ? 'rgba(91, 141, 239, 0.2)' : 'transparent';

  return (
    <View style={[styles.wrapper, { width: size, height: size + 20 }, style]}>
      {/* 外层光晕（稀有/传说） */}
      {(isRare || isLegendary) && (
        <View style={[styles.glow, {
          width: size + 16,
          height: size + 16,
          borderRadius: (size + 16) / 2,
          backgroundColor: glowColor,
          top: -8,
          left: -8,
        }]} />
      )}

      {/* 主贴纸背景 */}
      <View style={[styles.stickerBg, {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderWidth: isLegendary ? 3 : isRare ? 2.5 : 2,
      }]}>
        {/* 内层装饰圆环 */}
        <View style={[styles.innerRing, {
          width: size - 12,
          height: size - 12,
          borderRadius: (size - 12) / 2,
          borderColor: borderColor + '30',
        }]} />

        {/* 主 emoji */}
        <Text style={[styles.mainEmoji, { fontSize: size * 0.45 }]}>{emoji}</Text>

        {/* 传说贴纸星星装饰 */}
        {isLegendary && (
          <>
            <Text style={[styles.starDeco, { top: 4, right: 8, fontSize: 10 }]}>✦</Text>
            <Text style={[styles.starDeco, { bottom: 12, left: 6, fontSize: 8 }]}>✦</Text>
            <Text style={[styles.starDeco, { top: 14, left: 4, fontSize: 6 }]}>✧</Text>
          </>
        )}

        {/* 稀有贴纸闪光装饰 */}
        {isRare && (
          <>
            <Text style={[styles.sparkleDeco, { top: 6, right: 10, fontSize: 8 }]}>✦</Text>
            <Text style={[styles.sparkleDeco, { bottom: 14, left: 8, fontSize: 6 }]}>✧</Text>
          </>
        )}
      </View>

      {/* 稀有度标签 */}
      {isLegendary && (
        <View style={[styles.rarityBadge, { backgroundColor: '#FFD700' }]}>
          <Text style={styles.rarityText}>传说</Text>
        </View>
      )}
      {isRare && (
        <View style={[styles.rarityBadge, { backgroundColor: '#5B8DEF' }]}>
          <Text style={styles.rarityText}>稀有</Text>
        </View>
      )}
    </View>
  );
}

// 迷你贴纸（用于列表）
export function MiniSticker({ emoji, rarity }: { emoji: string; rarity: 'common' | 'rare' | 'legendary' }) {
  const isRare = rarity === 'rare';
  const isLegendary = rarity === 'legendary';
  const borderColor = isLegendary ? '#FFD700' : isRare ? '#5B8DEF' : '#E5E7EB';
  const bgColor = isLegendary ? '#FFF8E1' : isRare ? '#EFF6FF' : '#FAFAFA';

  return (
    <View style={[styles.miniWrapper]}>
      {(isRare || isLegendary) && (
        <View style={[styles.miniGlow, {
          backgroundColor: isLegendary ? 'rgba(255, 215, 0, 0.2)' : 'rgba(91, 141, 239, 0.15)',
        }]} />
      )}
      <View style={[styles.miniSticker, { backgroundColor: bgColor, borderColor }]}>
        <Text style={styles.miniEmoji}>{emoji}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    position: 'relative',
  },
  glow: {
    position: 'absolute',
  },
  stickerBg: {
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow.card,
    position: 'relative',
  },
  innerRing: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  mainEmoji: {},
  starDeco: {
    position: 'absolute',
    color: '#FFD700',
    fontWeight: '700',
  },
  sparkleDeco: {
    position: 'absolute',
    color: '#5B8DEF',
    fontWeight: '700',
  },
  rarityBadge: {
    position: 'absolute',
    bottom: -2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  rarityText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFF',
  },
  // Mini
  miniWrapper: {
    position: 'relative',
  },
  miniGlow: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    top: -4,
    left: -4,
  },
  miniSticker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  miniEmoji: {
    fontSize: 14,
  },
});
