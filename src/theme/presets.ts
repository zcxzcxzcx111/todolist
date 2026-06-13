// 5种预设主题配色
export interface ThemePreset {
  id: string;
  name: string;
  emoji: string;
  description: string;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    accent: string;
    accentLight: string;
    success: string;
    successLight: string;
    background: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    separator: string;
    gradientPrimary: string[];
    gradientTravel: string[];
    gradientMiles: string[];
    gradientSuccess: string[];
  };
}

export const themePresets: ThemePreset[] = [
  {
    id: 'sunset',
    name: '日落橙',
    emoji: '🌅',
    description: '温暖活力，激发行动力',
    colors: {
      primary: '#FF8C42',
      primaryLight: 'rgba(255, 140, 66, 0.10)',
      primaryDark: '#E67A30',
      accent: '#FF6B6B',
      accentLight: 'rgba(255, 107, 107, 0.10)',
      success: '#34C759',
      successLight: 'rgba(52, 199, 89, 0.10)',
      background: '#F8F9FB',
      surface: '#FFFFFF',
      textPrimary: '#1A1D26',
      textSecondary: '#6B7280',
      textTertiary: '#9CA3AF',
      separator: 'rgba(0, 0, 0, 0.06)',
      gradientPrimary: ['#FF8C42', '#FF6B6B'],
      gradientTravel: ['#FF6B6B', '#FF8C42'],
      gradientMiles: ['#FFD700', '#FF8C42'],
      gradientSuccess: ['#34C759', '#10B981'],
    },
  },
  {
    id: 'ocean',
    name: '海洋蓝',
    emoji: '🌊',
    description: '深邃宁静，专注高效',
    colors: {
      primary: '#3B82F6',
      primaryLight: 'rgba(59, 130, 246, 0.10)',
      primaryDark: '#2563EB',
      accent: '#06B6D4',
      accentLight: 'rgba(6, 182, 212, 0.10)',
      success: '#10B981',
      successLight: 'rgba(16, 185, 129, 0.10)',
      background: '#F0F9FF',
      surface: '#FFFFFF',
      textPrimary: '#0F172A',
      textSecondary: '#475569',
      textTertiary: '#94A3B8',
      separator: 'rgba(0, 0, 0, 0.06)',
      gradientPrimary: ['#3B82F6', '#06B6D4'],
      gradientTravel: ['#06B6D4', '#3B82F6'],
      gradientMiles: ['#F59E0B', '#3B82F6'],
      gradientSuccess: ['#10B981', '#059669'],
    },
  },
  {
    id: 'forest',
    name: '森林绿',
    emoji: '🌲',
    description: '自然清新，持续成长',
    colors: {
      primary: '#22C55E',
      primaryLight: 'rgba(34, 197, 94, 0.10)',
      primaryDark: '#16A34A',
      accent: '#14B8A6',
      accentLight: 'rgba(20, 184, 166, 0.10)',
      success: '#84CC16',
      successLight: 'rgba(132, 204, 22, 0.10)',
      background: '#F0FDF4',
      surface: '#FFFFFF',
      textPrimary: '#14532D',
      textSecondary: '#4D7C0F',
      textTertiary: '#86EFAC',
      separator: 'rgba(0, 0, 0, 0.06)',
      gradientPrimary: ['#22C55E', '#14B8A6'],
      gradientTravel: ['#14B8A6', '#22C55E'],
      gradientMiles: ['#F59E0B', '#22C55E'],
      gradientSuccess: ['#84CC16', '#22C55E'],
    },
  },
  {
    id: 'sakura',
    name: '樱花粉',
    emoji: '🌸',
    description: '温柔浪漫，治愈心灵',
    colors: {
      primary: '#EC4899',
      primaryLight: 'rgba(236, 72, 153, 0.10)',
      primaryDark: '#DB2777',
      accent: '#F472B6',
      accentLight: 'rgba(244, 114, 182, 0.10)',
      success: '#A78BFA',
      successLight: 'rgba(167, 139, 250, 0.10)',
      background: '#FDF2F8',
      surface: '#FFFFFF',
      textPrimary: '#831843',
      textSecondary: '#9D174D',
      textTertiary: '#F9A8D4',
      separator: 'rgba(0, 0, 0, 0.06)',
      gradientPrimary: ['#EC4899', '#F472B6'],
      gradientTravel: ['#F472B6', '#EC4899'],
      gradientMiles: ['#F59E0B', '#EC4899'],
      gradientSuccess: ['#A78BFA', '#EC4899'],
    },
  },
  {
    id: 'midnight',
    name: '午夜紫',
    emoji: '🌙',
    description: '神秘深邃，夜间模式',
    colors: {
      primary: '#8B5CF6',
      primaryLight: 'rgba(139, 92, 246, 0.15)',
      primaryDark: '#7C3AED',
      accent: '#A78BFA',
      accentLight: 'rgba(167, 139, 250, 0.15)',
      success: '#34D399',
      successLight: 'rgba(52, 211, 153, 0.15)',
      background: '#0F0A1A',
      surface: '#1A1425',
      textPrimary: '#F3F0FF',
      textSecondary: '#A78BFA',
      textTertiary: '#6D28D9',
      separator: 'rgba(255, 255, 255, 0.08)',
      gradientPrimary: ['#8B5CF6', '#6D28D9'],
      gradientTravel: ['#A78BFA', '#8B5CF6'],
      gradientMiles: ['#F59E0B', '#8B5CF6'],
      gradientSuccess: ['#34D399', '#10B981'],
    },
  },
];

// 获取主题
export function getThemePreset(id: string): ThemePreset {
  return themePresets.find(t => t.id === id) || themePresets[0];
}
