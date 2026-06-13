import { useTheme } from './ThemeContext';
import { colors } from './index';

// 使用此 hook 的组件会在主题变化时重新渲染
export function useColors() {
  // 订阅主题变化
  useTheme();
  // 返回最新的 colors
  return colors;
}
