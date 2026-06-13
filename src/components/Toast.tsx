import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors, typography, spacing, radius, shadow } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface ToastData {
  id: string;
  type: 'success' | 'miles' | 'level' | 'city' | 'achievement' | 'event';
  title: string;
  message: string;
  emoji: string;
}

interface ToastProps {
  toast: ToastData | null;
  onDismiss: () => void;
}

export default function Toast({ toast, onDismiss }: ToastProps) {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 8, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(slideAnim, { toValue: -100, duration: 250, useNativeDriver: true }),
          Animated.timing(opacityAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
        ]).start(() => onDismiss());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  const bgColor = {
    success: colors.success,
    miles: colors.miles,
    level: '#8B5CF6',
    city: colors.accent,
    achievement: '#FFD700',
    event: colors.primary,
  }[toast.type];

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }], opacity: opacityAnim }]}>
      <View style={[styles.card, { borderLeftColor: bgColor }]}>
        <Text style={styles.emoji}>{toast.emoji}</Text>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{toast.title}</Text>
          <Text style={styles.message}>{toast.message}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

// Toast 管理器
let toastCallback: ((toast: ToastData) => void) | null = null;

export function showToast(toast: Omit<ToastData, 'id'>) {
  toastCallback?.({ ...toast, id: Date.now().toString() });
}

export function useToastListener(callback: (toast: ToastData) => void) {
  toastCallback = callback;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 9999,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderLeftWidth: 4,
    ...shadow.elevated,
  },
  emoji: { fontSize: 28, marginRight: spacing.md },
  textWrap: { flex: 1 },
  title: { ...typography.headline, color: colors.textPrimary },
  message: { ...typography.caption1, color: colors.textSecondary, marginTop: 2 },
});
