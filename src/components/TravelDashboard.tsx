import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { TravelProgress, UserProfile } from '../types';
import { cities, getNextCityMiles } from '../data/cities';
import { useColors } from '../theme/useColors';
import { typography, spacing, radius, shadow } from '../theme';

interface TravelDashboardProps {
  travel: TravelProgress;
  profile: UserProfile;
}

export default function TravelDashboard({ travel, profile }: TravelDashboardProps) {
  const colors = useColors();
  const currentCity = cities.find(c => c.id === travel.currentCityId);
  const nextCityInfo = getNextCityMiles(travel.currentCityId, travel.visitedCityIds);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(progressAnim, {
        toValue: nextCityInfo ? Math.min(travel.currentMiles / nextCityInfo.miles, 1) : 1,
        duration: 800, useNativeDriver: false,
      }),
    ]).start();
  }, [travel.currentMiles]);

  if (!currentCity) return null;

  return (
    <Animated.View style={[s.container, { opacity: fadeAnim, backgroundColor: colors.surface }]}>
      <View style={s.cityHeader}>
        <View style={s.cityLeft}>
          <Text style={s.cityEmoji}>{currentCity.emoji}</Text>
          <View style={s.cityInfo}>
            <Text style={[s.cityName, { color: colors.textPrimary }]}>{currentCity.name}</Text>
            <Text style={[s.cityDesc, { color: colors.textSecondary }]} numberOfLines={1}>{currentCity.description}</Text>
          </View>
        </View>
        <View style={[s.levelBadge, { backgroundColor: colors.primaryLight }]}>
          <Text style={[s.levelText, { color: colors.primary }]}>Lv.{profile.level}</Text>
        </View>
      </View>

      {nextCityInfo && (
        <View style={s.progressSection}>
          <View style={s.progressHeader}>
            <Text style={[s.progressLabel, { color: colors.textSecondary }]}>下一站</Text>
            <Text style={[s.progressCity, { color: colors.textPrimary }]}>{nextCityInfo.city.emoji} {nextCityInfo.city.name}</Text>
          </View>
          <View style={[s.progressBar, { backgroundColor: colors.primaryLight }]}>
            <Animated.View style={[s.progressFill, { backgroundColor: colors.primary, width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
          </View>
          <View style={s.progressFooter}>
            <Text style={[s.progressMiles, { color: colors.primary }]}>{travel.currentMiles}</Text>
            <Text style={[s.progressTotal, { color: colors.textSecondary }]}>/{nextCityInfo.miles} 里程</Text>
          </View>
        </View>
      )}

      <View style={s.statsRow}>
        <StatCard emoji="✈️" value={travel.visitedCityIds.length} label="已到城市" color={colors.accent} bgColor={colors.accentLight} />
        <StatCard emoji="🗺️" value={travel.totalMiles} label="总里程" color={colors.miles} bgColor={colors.milesLight} />
        <StatCard emoji="📮" value={travel.collectedPostcards.length} label="明信片" color={colors.primary} bgColor={colors.primaryLight} />
        <StatCard emoji="🔥" value={profile.streak} label="连续天" color={colors.success} bgColor={colors.successLight} />
      </View>
    </Animated.View>
  );
}

function StatCard({ emoji, value, label, color, bgColor }: { emoji: string; value: number; label: string; color: string; bgColor: string }) {
  return (
    <View style={[s.statCard, { backgroundColor: bgColor }]}>
      <Text style={s.statEmoji}>{emoji}</Text>
      <Text style={[s.statValue, { color }]}>{value}</Text>
      <Text style={[s.statLabel, { color }]}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { borderRadius: 22, padding: 20, marginHorizontal: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },
  cityHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  cityLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  cityEmoji: { fontSize: 40, marginRight: 16 },
  cityInfo: { flex: 1 },
  cityName: { fontSize: 20, fontWeight: '600' },
  cityDesc: { fontSize: 12, marginTop: 2 },
  levelBadge: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 100 },
  levelText: { fontSize: 12, fontWeight: '700' },
  progressSection: { marginBottom: 20 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 12 },
  progressCity: { fontSize: 15, fontWeight: '600' },
  progressBar: { height: 10, borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5 },
  progressFooter: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 4 },
  progressMiles: { fontSize: 12, fontWeight: '700' },
  progressTotal: { fontSize: 12 },
  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: { flex: 1, alignItems: 'center', borderRadius: 18, paddingVertical: 16 },
  statEmoji: { fontSize: 22, marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: '700' },
  statLabel: { fontSize: 11, marginTop: 2 },
});
