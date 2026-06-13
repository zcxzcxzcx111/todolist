import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import DashboardScreen from './src/screens/DashboardScreen';

// 主题包装器，用 key 强制重新渲染
function ThemedApp() {
  const { currentTheme } = useTheme();

  return (
    <>
      <StatusBar style="dark" />
      <DashboardScreen key={currentTheme} />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}
