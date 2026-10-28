import { useEffect } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { colors, radius } from '@/theme';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export function Skeleton({ style }: Props) {
  const reduced = useReducedMotion();
  const travel = useSharedValue(-1);
  const shimmer = useAnimatedStyle(() => ({
    transform: [{ translateX: travel.value * 180 }],
  }));

  useEffect(() => {
    if (reduced) return;
    travel.value = withRepeat(withTiming(1, { duration: 900 }), -1, false);
  }, [reduced, travel]);

  return (
    <View style={[styles.bone, style]}>
      {reduced ? null : <Animated.View style={[styles.shimmer, shimmer]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  bone: {
    backgroundColor: colors.grey[300],
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  shimmer: {
    width: 80,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
});
