// 主题色系统 - 支持动态切换
export const colors = {
  // 主色
  primary: '#FF8C42',
  primaryLight: 'rgba(255, 140, 66, 0.10)',
  primaryMedium: 'rgba(255, 140, 66, 0.20)',
  primaryDark: '#E67A30',

  // 辅色
  accent: '#FF6B6B',
  accentLight: 'rgba(255, 107, 107, 0.10)',
  success: '#34C759',
  successLight: 'rgba(52, 199, 89, 0.10)',

  // 背景
  background: '#F8F9FB',
  surface: '#FFFFFF',
  card: '#FFFFFF',

  // 文字
  textPrimary: '#1A1D26',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textOnPrimary: '#FFFFFF',

  // 优先级
  urgent: '#EF4444',
  important: '#F59E0B',
  normal: '#3B82F6',

  // 旅行
  miles: '#F59E0B',
  milesLight: 'rgba(245, 158, 11, 0.10)',

  // 系统
  separator: 'rgba(0, 0, 0, 0.06)',
  destructive: '#EF4444',
  warning: '#F59E0B',

  // 渐变色
  gradientPrimary: ['#FF8C42', '#FF6B6B'],
  gradientTravel: ['#FF6B6B', '#FF8C42'],
  gradientMiles: ['#FFD700', '#FF8C42'],
  gradientSuccess: ['#34C759', '#10B981'],

  // 覆盖层
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

// 动态更新颜色（主题切换时调用）
export function updateColors(newColors: Record<string, any>) {
  Object.assign(colors, newColors);
}

export const typography = {
  largeTitle: { fontSize: 34, fontWeight: '700' as const, letterSpacing: -0.5 },
  title1: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.3 },
  title2: { fontSize: 22, fontWeight: '700' as const, letterSpacing: -0.2 },
  title3: { fontSize: 20, fontWeight: '600' as const, letterSpacing: -0.1 },
  headline: { fontSize: 17, fontWeight: '600' as const },
  body: { fontSize: 17, fontWeight: '400' as const },
  callout: { fontSize: 16, fontWeight: '400' as const },
  subhead: { fontSize: 15, fontWeight: '400' as const },
  footnote: { fontSize: 13, fontWeight: '400' as const },
  caption1: { fontSize: 12, fontWeight: '400' as const },
  caption2: { fontSize: 11, fontWeight: '400' as const },
};

export const spacing = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32, xxxxl: 40,
};

export const radius = {
  sm: 10, md: 14, lg: 18, xl: 22, xxl: 28, pill: 100,
};

export const shadow = {
  subtle: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
  card: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },
  elevated: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 24, elevation: 6 },
  glow: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 4 },
};
