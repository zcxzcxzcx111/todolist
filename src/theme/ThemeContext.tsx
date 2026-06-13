import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { themePresets, getThemePreset } from './presets';
import { colors, updateColors, shadow } from './index';

const THEME_STORAGE_KEY = 'traveltodo_theme';

interface ThemeContextType {
  currentTheme: string;
  setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'sunset',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState('sunset');

  // 加载保存的主题
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && themePresets.find(t => t.id === saved)) {
        applyTheme(saved);
      }
    }
  }, []);

  const applyTheme = (themeId: string) => {
    const preset = getThemePreset(themeId);
    // 更新全局 colors 对象
    updateColors({
      primary: preset.colors.primary,
      primaryLight: preset.colors.primaryLight,
      primaryDark: preset.colors.primaryDark,
      accent: preset.colors.accent,
      accentLight: preset.colors.accentLight,
      success: preset.colors.success,
      successLight: preset.colors.successLight,
      background: preset.colors.background,
      surface: preset.colors.surface,
      textPrimary: preset.colors.textPrimary,
      textSecondary: preset.colors.textSecondary,
      textTertiary: preset.colors.textTertiary,
      separator: preset.colors.separator,
      gradientPrimary: preset.colors.gradientPrimary,
      gradientTravel: preset.colors.gradientTravel,
      gradientMiles: preset.colors.gradientMiles,
      gradientSuccess: preset.colors.gradientSuccess,
    });
    // 更新 shadow
    shadow.glow.shadowColor = preset.colors.primary;
    setCurrentTheme(themeId);
  };

  const setTheme = useCallback((themeId: string) => {
    applyTheme(themeId);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeId);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
