import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius } from '../theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width = '100%', height = 20, borderRadius = radius.sm, style }: SkeletonProps) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, { toValue: 1, duration: 1200, useNativeDriver: false }),
        Animated.timing(shimmerAnim, { toValue: 0, duration: 1200, useNativeDriver: false }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E8E8EC', '#F5F5F7'],
  });

  return (
    <Animated.View style={[{ width, height, borderRadius, backgroundColor }, style]} />
  );
}

export function TaskCardSkeleton() {
  return (
    <View style={skeletonStyles.card}>
      <Skeleton width={28} height={28} borderRadius={14} />
      <View style={skeletonStyles.content}>
        <Skeleton width="70%" height={16} />
        <View style={skeletonStyles.row}>
          <Skeleton width={60} height={20} borderRadius={10} />
          <Skeleton width={80} height={14} />
        </View>
      </View>
    </View>
  );
}

export function DashboardSkeleton() {
  return (
    <View>
      <Skeleton width="60%" height={28} style={{ marginBottom: 8 }} />
      <Skeleton width="40%" height={16} style={{ marginBottom: 24 }} />
      <Skeleton width="100%" height={160} borderRadius={18} style={{ marginBottom: 16 }} />
      <View style={skeletonStyles.row}>
        <Skeleton width="30%" height={80} borderRadius={14} />
        <Skeleton width="30%" height={80} borderRadius={14} />
        <Skeleton width="30%" height={80} borderRadius={14} />
      </View>
    </View>
  );
}

const skeletonStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 16,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: colors.separator,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
});
