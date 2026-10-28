import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Flame } from 'lucide-react-native';

import { colors, radius, spacing, typography } from '@/theme';
import { AppText } from './AppText';

type Props = {
  progress: number;
  label: string;
};

export function ProgressBar({ progress, label }: Props) {
  const reduced = useReducedMotion();
  const width = useSharedValue(reduced ? progress : 0);
  const trackWidth = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(progress, { duration: reduced ? 0 : 700 });
  }, [progress, reduced, width]);

  const fillStyle = useAnimatedStyle(() => ({ width: trackWidth.value * Math.min(1, Math.max(0, width.value)) }));
  const flameStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: trackWidth.value * Math.min(1, Math.max(0, width.value)) - 8 }],
  }));

  return (
    <View accessibilityLabel={label}>
      <View
        style={styles.track}
        onLayout={(event) => {
          trackWidth.value = event.nativeEvent.layout.width;
        }}
      >
        <Animated.View style={[styles.fill, fillStyle]}>
          <LinearGradient
            colors={['#FF7A45', '#E04832'] as const}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
        <Animated.View style={[styles.flame, flameStyle]}>
          <Flame color="#FF7A33" fill="#FF7A33" size={16} strokeWidth={2} />
        </Animated.View>
      </View>
      <AppText style={styles.label}>{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: '#F6D9D4',
    overflow: 'visible',
    justifyContent: 'center',
  },
  fill: {
    height: 6,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  flame: {
    position: 'absolute',
    left: 0,
    top: -5,
  },
  label: {
    ...typography.small,
    color: colors.grey[700],
    marginTop: spacing.xs,
  },
});
