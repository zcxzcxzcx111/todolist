import React, { createContext, useContext, useState, useEffect } from 'react';
import { themePresets, ThemePreset, getThemePreset } from './presets';
import { typography, spacing, radius, shadow } from './index';

const THEME_STORAGE_KEY = 'traveltodo_theme';

interface ThemeContextType {
  currentTheme: string;
  colors: ThemePreset['colors'];
  setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'sunset',
  colors: themePresets[0].colors,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState('sunset');

  // 加载保存的主题
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && themePresets.find(t => t.id === saved)) {
        setCurrentTheme(saved);
      }
    }
  }, []);

  const setTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeId);
    }
  };

  const colors = getThemePreset(currentTheme).colors;

  return (
    <ThemeContext.Provider value={{ currentTheme, colors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export { typography, spacing, radius, shadow };
