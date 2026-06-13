import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { TravelProgress, UserProfile } from '../types';
import { cities, getNextCityMiles } from '../data/cities';
import { colors, typography, spacing, radius, shadow } from '../theme';

interface TravelDashboardProps {
  travel: TravelProgress;
  profile: UserProfile;
}

export default function TravelDashboard({ travel, profile }: TravelDashboardProps) {
  const currentCity = cities.find(c => c.id === travel.currentCityId);
  const nextCityInfo = getNextCityMiles(travel.currentCityId, travel.visitedCityIds);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(progressAnim, {
        toValue: nextCityInfo ? Math.min(travel.currentMiles / nextCityInfo.miles, 1) : 1,
        duration: 800,
        useNativeDriver: false,
      }),
    ]).start();
  }, [travel.currentMiles]);

  if (!currentCity) return null;

  const progress = nextCityInfo ? travel.currentMiles / nextCityInfo.miles : 1;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* 城市头图 */}
      <View style={styles.cityHeader}>
        <View style={styles.cityLeft}>
          <Text style={styles.cityEmoji}>{currentCity.emoji}</Text>
          <View style={styles.cityInfo}>
            <Text style={styles.cityName}>{currentCity.name}</Text>
            <Text style={styles.cityDesc} numberOfLines={1}>{currentCity.description}</Text>
          </View>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Lv.{profile.level}</Text>
        </View>
      </View>

      {/* 进度条 */}
      {nextCityInfo && (
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>下一站</Text>
            <Text style={styles.progressCity}>{nextCityInfo.city.emoji} {nextCityInfo.city.name}</Text>
          </View>
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            }]} />
          </View>
          <View style={styles.progressFooter}>
            <Text style={styles.progressMiles}>{travel.currentMiles}</Text>
            <Text style={styles.progressTotal}>/{nextCityInfo.miles} 里程</Text>
          </View>
        </View>
      )}

      {/* 统计卡片 */}
      <View style={styles.statsRow}>
        <StatCard emoji="✈️" value={travel.visitedCityIds.length} label="已到城市" color={colors.accent} />
        <StatCard emoji="🗺️" value={travel.totalMiles} label="总里程" color={colors.miles} />
        <StatCard emoji="📮" value={travel.collectedPostcards.length} label="明信片" color={colors.primary} />
        <StatCard emoji="🔥" value={profile.streak} label="连续天" color={colors.success} />
      </View>
    </Animated.View>
  );
}

function StatCard({ emoji, value, label, color }: { emoji: string; value: number; label: string; color: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    ...shadow.card,
  },
  cityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  cityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cityEmoji: {
    fontSize: 40,
    marginRight: spacing.lg,
  },
  cityInfo: { flex: 1 },
  cityName: {
    ...typography.title3,
    color: colors.textPrimary,
  },
  cityDesc: {
    ...typography.caption1,
    color: colors.textSecondary,
    marginTop: 2,
  },
  levelBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  levelText: {
    ...typography.caption1,
    color: colors.primary,
    fontWeight: '700',
  },
  progressSection: {
    marginBottom: spacing.xl,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  progressLabel: {
    ...typography.caption1,
    color: colors.textSecondary,
  },
  progressCity: {
    ...typography.subhead,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  progressBar: {
    height: 10,
    backgroundColor: colors.primaryLight,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.xs,
  },
  progressMiles: {
    ...typography.caption1,
    color: colors.primary,
    fontWeight: '700',
  },
  progressTotal: {
    ...typography.caption1,
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  statEmoji: {
    fontSize: 22,
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.title3,
    fontWeight: '700',
  },
  statLabel: {
    ...typography.caption2,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
