import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StickerProps { size?: number; }

// 紫禁城贴纸
export function ForbiddenCitySticker({ size = 80 }: StickerProps) {
  const s = size;
  return (
    <View style={[styles.frame, { width: s, height: s, borderRadius: s / 2 }]}>
      <View style={[styles.bg, { borderRadius: s / 2 }]}>
        {/* 云朵 */}
        <Text style={{ position: 'absolute', top: s * 0.06, left: s * 0.06, fontSize: s * 0.13, opacity: 0.5 }}>☁️</Text>
        <Text style={{ position: 'absolute', top: s * 0.03, right: s * 0.08, fontSize: s * 0.1, opacity: 0.4 }}>☁️</Text>
        {/* 飞檐 */}
        <View style={{ position: 'absolute', top: s * 0.22, left: s * 0.1, right: s * 0.1, height: s * 0.04, backgroundColor: '#660000', borderRadius: s * 0.02 }} />
        {/* 屋顶 */}
        <View style={{ position: 'absolute', top: s * 0.26, left: s * 0.12, right: s * 0.12, height: s * 0.1, backgroundColor: '#8B0000', borderTopLeftRadius: s * 0.04, borderTopRightRadius: s * 0.04 }}>
          <View style={{ position: 'absolute', top: -s * 0.04, left: s * 0.4, width: s * 0.08, height: s * 0.05, backgroundColor: '#FFD700', borderRadius: s * 0.02 }} />
          <View style={{ position: 'absolute', top: -s * 0.06, left: s * 0.42, width: s * 0.04, height: s * 0.04, backgroundColor: '#FFD700', borderRadius: s * 0.02 }} />
        </View>
        {/* 墙体 */}
        <View style={{ position: 'absolute', top: s * 0.36, left: s * 0.15, right: s * 0.15, height: s * 0.25, backgroundColor: '#C41E3A', borderRadius: 2 }}>
          {/* 窗户 */}
          <View style={{ position: 'absolute', top: s * 0.04, left: s * 0.08, width: s * 0.08, height: s * 0.1, backgroundColor: '#FFD700', borderRadius: s * 0.02 }} />
          <View style={{ position: 'absolute', top: s * 0.04, right: s * 0.08, width: s * 0.08, height: s * 0.1, backgroundColor: '#FFD700', borderRadius: s * 0.02 }} />
          {/* 门 */}
          <View style={{ position: 'absolute', bottom: 0, left: s * 0.35, width: s * 0.12, height: s * 0.18, backgroundColor: '#FFD700', borderTopLeftRadius: s * 0.06, borderTopRightRadius: s * 0.06 }}>
            <View style={{ position: 'absolute', top: s * 0.06, right: s * 0.02, width: s * 0.02, height: s * 0.02, backgroundColor: '#B8860B', borderRadius: s * 0.01 }} />
          </View>
        </View>
        {/* 台基 */}
        <View style={{ position: 'absolute', top: s * 0.61, left: s * 0.1, right: s * 0.1, height: s * 0.08, backgroundColor: '#8B0000', borderRadius: 2 }} />
        {/* 装饰线条 */}
        <View style={{ position: 'absolute', top: s * 0.69, left: s * 0.15, right: s * 0.15, height: s * 0.02, backgroundColor: '#FFD700', borderRadius: s * 0.01 }} />
      </View>
    </View>
  );
}

// 万里长城贴纸
export function GreatWallSticker({ size = 80 }: StickerProps) {
  const s = size;
  return (
    <View style={[styles.frame, { width: s, height: s, borderRadius: s / 2 }]}>
      <View style={[styles.bg, { borderRadius: s / 2 }]}>
        {/* 远山 */}
        <View style={{ position: 'absolute', bottom: s * 0.3, left: s * 0.02, width: 0, height: 0, borderLeftWidth: s * 0.22, borderRightWidth: s * 0.22, borderBottomWidth: s * 0.28, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#228B22', opacity: 0.6 }} />
        <View style={{ position: 'absolute', bottom: s * 0.3, left: s * 0.25, width: 0, height: 0, borderLeftWidth: s * 0.2, borderRightWidth: s * 0.2, borderBottomWidth: s * 0.35, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#2E8B57', opacity: 0.8 }} />
        <View style={{ position: 'absolute', bottom: s * 0.3, right: s * 0.02, width: 0, height: 0, borderLeftWidth: s * 0.18, borderRightWidth: s * 0.18, borderBottomWidth: s * 0.22, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#228B22', opacity: 0.5 }} />
        {/* 长城墙体 */}
        <View style={{ position: 'absolute', bottom: s * 0.28, left: s * 0.08, right: s * 0.08, height: s * 0.08, backgroundColor: '#8B7355', borderRadius: 3, transform: [{ rotate: '-3deg' }] }}>
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <View key={i} style={{ position: 'absolute', top: -s * 0.04, left: i * s * 0.11 + s * 0.01, width: s * 0.06, height: s * 0.04, backgroundColor: '#A0896C', borderRadius: 1 }} />
          ))}
        </View>
        {/* 烽火台 */}
        <View style={{ position: 'absolute', bottom: s * 0.26, left: s * 0.38, width: s * 0.14, height: s * 0.22, backgroundColor: '#8B7355', borderRadius: 3 }}>
          <View style={{ position: 'absolute', top: -s * 0.03, left: -s * 0.02, width: s * 0.18, height: s * 0.04, backgroundColor: '#A0896C', borderRadius: 3 }} />
          <View style={{ position: 'absolute', top: s * 0.06, left: s * 0.04, width: s * 0.06, height: s * 0.08, backgroundColor: '#FFD700', borderRadius: s * 0.03, opacity: 0.7 }} />
        </View>
        {/* 松树 */}
        <View style={{ position: 'absolute', bottom: s * 0.35, right: s * 0.12, width: 0, height: 0, borderLeftWidth: s * 0.06, borderRightWidth: s * 0.06, borderBottomWidth: s * 0.12, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#006400' }} />
        <View style={{ position: 'absolute', bottom: s * 0.28, right: s * 0.15, width: s * 0.03, height: s * 0.08, backgroundColor: '#4A2800', borderRadius: 1 }} />
      </View>
    </View>
  );
}

// 京剧脸谱贴纸
export function OperaMaskSticker({ size = 80 }: StickerProps) {
  const s = size;
  return (
    <View style={[styles.frame, { width: s, height: s, borderRadius: s / 2 }]}>
      <View style={[styles.bg, { borderRadius: s / 2 }]}>
        {/* 脸谱主体 */}
        <View style={{ position: 'absolute', top: s * 0.1, left: s * 0.18, right: s * 0.18, height: s * 0.7, backgroundColor: '#FF4500', borderRadius: s * 0.3 }}>
          {/* 额头金色 */}
          <View style={{ position: 'absolute', top: s * 0.04, left: s * 0.12, right: s * 0.12, height: s * 0.12, backgroundColor: '#FFD700', borderRadius: s * 0.06, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: s * 0.07, color: '#E64A19', fontWeight: '700' }}>王</Text>
          </View>
          {/* 左眼 */}
          <View style={{ position: 'absolute', top: s * 0.2, left: s * 0.02, width: s * 0.15, height: s * 0.1, backgroundColor: 'white', borderRadius: s * 0.07 }}>
            <View style={{ position: 'absolute', top: s * 0.02, left: s * 0.04, width: s * 0.07, height: s * 0.07, backgroundColor: '#1A1A1A', borderRadius: s * 0.035 }} />
            <View style={{ position: 'absolute', top: s * 0.03, left: s * 0.06, width: s * 0.03, height: s * 0.03, backgroundColor: 'white', borderRadius: s * 0.015 }} />
          </View>
          {/* 右眼 */}
          <View style={{ position: 'absolute', top: s * 0.2, right: s * 0.02, width: s * 0.15, height: s * 0.1, backgroundColor: 'white', borderRadius: s * 0.07 }}>
            <View style={{ position: 'absolute', top: s * 0.02, right: s * 0.04, width: s * 0.07, height: s * 0.07, backgroundColor: '#1A1A1A', borderRadius: s * 0.035 }} />
            <View style={{ position: 'absolute', top: s * 0.03, right: s * 0.06, width: s * 0.03, height: s * 0.03, backgroundColor: 'white', borderRadius: s * 0.015 }} />
          </View>
          {/* 鼻子 */}
          <View style={{ position: 'absolute', top: s * 0.35, left: s * 0.38, width: s * 0.1, height: s * 0.08, backgroundColor: '#FFD700', borderRadius: s * 0.05 }} />
          {/* 嘴巴 */}
          <View style={{ position: 'absolute', bottom: s * 0.12, left: s * 0.15, right: s * 0.15, height: s * 0.07, backgroundColor: '#8B0000', borderRadius: s * 0.035 }} />
          {/* 左脸颊 */}
          <View style={{ position: 'absolute', top: s * 0.35, left: -s * 0.04, width: s * 0.12, height: s * 0.12, backgroundColor: '#FFD700', borderRadius: s * 0.06 }}>
            <View style={{ position: 'absolute', top: s * 0.03, left: s * 0.03, width: s * 0.06, height: s * 0.06, backgroundColor: '#FF4500', borderRadius: s * 0.03 }} />
          </View>
          {/* 右脸颊 */}
          <View style={{ position: 'absolute', top: s * 0.35, right: -s * 0.04, width: s * 0.12, height: s * 0.12, backgroundColor: '#FFD700', borderRadius: s * 0.06 }}>
            <View style={{ position: 'absolute', top: s * 0.03, right: s * 0.03, width: s * 0.06, height: s * 0.06, backgroundColor: '#FF4500', borderRadius: s * 0.03 }} />
          </View>
        </View>
      </View>
    </View>
  );
}

// 饺子贴纸
export function DumplingSticker({ size = 80 }: StickerProps) {
  const s = size;
  return (
    <View style={[styles.frame, { width: s, height: s, borderRadius: s / 2 }]}>
      <View style={[styles.bg, { borderRadius: s / 2 }]}>
        {/* 蒸汽 */}
        <Text style={{ position: 'absolute', top: s * 0.06, left: s * 0.25, fontSize: s * 0.16, opacity: 0.5 }}>♨️</Text>
        <Text style={{ position: 'absolute', top: s * 0.02, right: s * 0.22, fontSize: s * 0.12, opacity: 0.4 }}>♨️</Text>
        {/* 蒸笼盖 */}
        <View style={{ position: 'absolute', top: s * 0.22, left: s * 0.12, right: s * 0.12, height: s * 0.06, backgroundColor: '#C4A265', borderRadius: s * 0.03 }}>
          <View style={{ position: 'absolute', top: -s * 0.02, left: s * 0.35, width: s * 0.15, height: s * 0.04, backgroundColor: '#A0896C', borderRadius: s * 0.02 }} />
        </View>
        {/* 蒸笼 */}
        <View style={{ position: 'absolute', top: s * 0.28, left: s * 0.1, right: s * 0.1, height: s * 0.12, backgroundColor: '#DEB887', borderRadius: s * 0.03, borderWidth: 1, borderColor: '#C4A265' }}>
          {[0, 1, 2].map(i => (
            <View key={i} style={{ position: 'absolute', top: (i + 1) * s * 0.028, left: s * 0.05, right: s * 0.05, height: 1, backgroundColor: '#C4A265' }} />
          ))}
        </View>
        {/* 饺子1 */}
        <View style={{ position: 'absolute', top: s * 0.42, left: s * 0.12, width: s * 0.3, height: s * 0.22, backgroundColor: '#FFF5E1', borderRadius: s * 0.15, borderWidth: 1, borderColor: '#E8D5B0' }}>
          <View style={{ position: 'absolute', top: s * 0.03, left: s * 0.04, right: s * 0.04, height: s * 0.04, backgroundColor: '#E8D5B0', borderRadius: s * 0.02 }} />
          <View style={{ position: 'absolute', top: s * 0.08, left: s * 0.06, width: s * 0.05, height: s * 0.03, backgroundColor: '#E8D5B0', borderRadius: s * 0.015 }} />
          <View style={{ position: 'absolute', top: s * 0.08, left: s * 0.13, width: s * 0.05, height: s * 0.03, backgroundColor: '#E8D5B0', borderRadius: s * 0.015 }} />
          <View style={{ position: 'absolute', top: s * 0.08, left: s * 0.2, width: s * 0.05, height: s * 0.03, backgroundColor: '#E8D5B0', borderRadius: s * 0.015 }} />
        </View>
        {/* 饺子2 */}
        <View style={{ position: 'absolute', top: s * 0.42, right: s * 0.12, width: s * 0.3, height: s * 0.22, backgroundColor: '#FFF5E1', borderRadius: s * 0.15, borderWidth: 1, borderColor: '#E8D5B0' }}>
          <View style={{ position: 'absolute', top: s * 0.03, left: s * 0.04, right: s * 0.04, height: s * 0.04, backgroundColor: '#E8D5B0', borderRadius: s * 0.02 }} />
          <View style={{ position: 'absolute', top: s * 0.08, left: s * 0.06, width: s * 0.05, height: s * 0.03, backgroundColor: '#E8D5B0', borderRadius: s * 0.015 }} />
          <View style={{ position: 'absolute', top: s * 0.08, left: s * 0.13, width: s * 0.05, height: s * 0.03, backgroundColor: '#E8D5B0', borderRadius: s * 0.015 }} />
          <View style={{ position: 'absolute', top: s * 0.08, left: s * 0.2, width: s * 0.05, height: s * 0.03, backgroundColor: '#E8D5B0', borderRadius: s * 0.015 }} />
        </View>
        {/* 蒸笼底 */}
        <View style={{ position: 'absolute', top: s * 0.64, left: s * 0.1, right: s * 0.1, height: s * 0.06, backgroundColor: '#DEB887', borderRadius: s * 0.03, borderWidth: 1, borderColor: '#C4A265' }} />
      </View>
    </View>
  );
}

// 大熊猫贴纸
export function PandaSticker({ size = 80 }: StickerProps) {
  const s = size;
  return (
    <View style={[styles.frame, { width: s, height: s, borderRadius: s / 2 }]}>
      <View style={[styles.bg, { borderRadius: s / 2 }]}>
        {/* 竹子左 */}
        <View style={{ position: 'absolute', left: s * 0.08, top: s * 0.05, width: s * 0.05, height: s * 0.6, backgroundColor: '#228B22', borderRadius: s * 0.025 }}>
          {[0, 1, 2].map(i => (
            <View key={i} style={{ position: 'absolute', top: i * s * 0.18 + s * 0.05, left: -s * 0.02, width: s * 0.09, height: s * 0.03, backgroundColor: '#1B6B1B', borderRadius: s * 0.015 }} />
          ))}
        </View>
        {/* 竹子右 */}
        <View style={{ position: 'absolute', right: s * 0.1, top: s * 0.1, width: s * 0.04, height: s * 0.5, backgroundColor: '#2E8B57', borderRadius: s * 0.02 }}>
          {[0, 1].map(i => (
            <View key={i} style={{ position: 'absolute', top: i * s * 0.2 + s * 0.08, right: -s * 0.02, width: s * 0.08, height: s * 0.025, backgroundColor: '#1B6B1B', borderRadius: s * 0.01 }} />
          ))}
        </View>
        {/* 熊猫身体 */}
        <View style={{ position: 'absolute', bottom: s * 0.08, left: s * 0.22, right: s * 0.22, height: s * 0.38, backgroundColor: 'white', borderRadius: s * 0.19, borderWidth: 1, borderColor: '#E0E0E0' }}>
          {/* 左臂 */}
          <View style={{ position: 'absolute', top: s * 0.05, left: -s * 0.06, width: s * 0.12, height: s * 0.18, backgroundColor: '#333', borderRadius: s * 0.06, transform: [{ rotate: '15deg' }] }} />
          {/* 右臂 */}
          <View style={{ position: 'absolute', top: s * 0.05, right: -s * 0.06, width: s * 0.12, height: s * 0.18, backgroundColor: '#333', borderRadius: s * 0.06, transform: [{ rotate: '-15deg' }] }} />
        </View>
        {/* 熊猫头 */}
        <View style={{ position: 'absolute', top: s * 0.12, left: s * 0.2, right: s * 0.2, height: s * 0.38, backgroundColor: 'white', borderRadius: s * 0.19, borderWidth: 1, borderColor: '#E0E0E0' }}>
          {/* 左耳 */}
          <View style={{ position: 'absolute', top: -s * 0.04, left: s * 0.02, width: s * 0.12, height: s * 0.12, backgroundColor: '#333', borderRadius: s * 0.06 }} />
          {/* 右耳 */}
          <View style={{ position: 'absolute', top: -s * 0.04, right: s * 0.02, width: s * 0.12, height: s * 0.12, backgroundColor: '#333', borderRadius: s * 0.06 }} />
          {/* 左眼圈 */}
          <View style={{ position: 'absolute', top: s * 0.1, left: s * 0.06, width: s * 0.14, height: s * 0.1, backgroundColor: '#333', borderRadius: s * 0.07 }}>
            <View style={{ position: 'absolute', top: s * 0.02, left: s * 0.04, width: s * 0.06, height: s * 0.06, backgroundColor: 'white', borderRadius: s * 0.03 }} />
            <View style={{ position: 'absolute', top: s * 0.03, left: s * 0.05, width: s * 0.03, height: s * 0.03, backgroundColor: '#1A1A1A', borderRadius: s * 0.015 }} />
          </View>
          {/* 右眼圈 */}
          <View style={{ position: 'absolute', top: s * 0.1, right: s * 0.06, width: s * 0.14, height: s * 0.1, backgroundColor: '#333', borderRadius: s * 0.07 }}>
            <View style={{ position: 'absolute', top: s * 0.02, right: s * 0.04, width: s * 0.06, height: s * 0.06, backgroundColor: 'white', borderRadius: s * 0.03 }} />
            <View style={{ position: 'absolute', top: s * 0.03, right: s * 0.05, width: s * 0.03, height: s * 0.03, backgroundColor: '#1A1A1A', borderRadius: s * 0.015 }} />
          </View>
          {/* 鼻子 */}
          <View style={{ position: 'absolute', top: s * 0.22, left: s * 0.32, width: s * 0.1, height: s * 0.06, backgroundColor: '#333', borderRadius: s * 0.03 }} />
          {/* 嘴巴 */}
          <View style={{ position: 'absolute', top: s * 0.28, left: s * 0.28, width: s * 0.06, height: s * 0.03, backgroundColor: '#333', borderRadius: s * 0.015 }} />
          <View style={{ position: 'absolute', top: s * 0.28, right: s * 0.28, width: s * 0.06, height: s * 0.03, backgroundColor: '#333', borderRadius: s * 0.015 }} />
          {/* 腮红 */}
          <View style={{ position: 'absolute', top: s * 0.2, left: s * 0.01, width: s * 0.08, height: s * 0.06, backgroundColor: '#FFB6C1', borderRadius: s * 0.04, opacity: 0.5 }} />
          <View style={{ position: 'absolute', top: s * 0.2, right: s * 0.01, width: s * 0.08, height: s * 0.06, backgroundColor: '#FFB6C1', borderRadius: s * 0.04, opacity: 0.5 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bg: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },
});
