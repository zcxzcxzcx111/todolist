import { StyleSheet } from 'react-native';
import { colors } from './index';

// 动态创建样式 - 每次调用时读取最新的 colors
export function createStyles<T extends StyleSheet.NamedStyles<T>>(
  stylesFn: () => T
): T {
  return StyleSheet.create(stylesFn());
}
