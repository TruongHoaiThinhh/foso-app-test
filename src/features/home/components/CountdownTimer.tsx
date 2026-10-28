import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { AppText } from '@/components/ui/AppText';
import { colors, gradients, radius, typography } from '@/theme';

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function remaining(deadline: number) {
  const diff = Math.max(0, deadline - Date.now());
  const total = Math.floor(diff / 1000);
  return {
    done: diff === 0,
    hours: pad(Math.floor(total / 3600)),
    minutes: pad(Math.floor((total % 3600) / 60)),
    seconds: pad(total % 60),
  };
}

function FlipCell({ value }: { value: string }) {
  const reduced = useReducedMotion();
  const shift = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: shift.value }],
  }));

  useEffect(() => {
    if (reduced) {
      shift.value = 0;
      return;
    }
    shift.value = 8;
    shift.value = withTiming(0, { duration: 220 });
  }, [reduced, shift, value]);

  return (
    <LinearGradient colors={gradients.timer} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={styles.cell}>
      <Animated.View style={style}>
        <AppText style={styles.digit}>{value}</AppText>
      </Animated.View>
    </LinearGradient>
  );
}

type Props = {
  deadline: number;
  onEnd?: () => void;
};

export function CountdownTimer({ deadline, onEnd }: Props) {
  const [time, setTime] = useState(() => remaining(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      const next = remaining(deadline);
      setTime(next);
      if (next.done) {
        clearInterval(timer);
        onEnd?.();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline, onEnd]);

  return (
    <View style={styles.row} accessibilityLabel={`Còn ${time.hours} giờ ${time.minutes} phút ${time.seconds} giây`}>
      <FlipCell value={time.hours} />
      <AppText style={styles.colon}>:</AppText>
      <FlipCell value={time.minutes} />
      <AppText style={styles.colon}>:</AppText>
      <FlipCell value={time.seconds} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  cell: {
    minWidth: 28,
    height: 24,
    borderRadius: radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 4,
  },
  digit: {
    ...typography.bodyBold,
    color: colors.white,
    fontVariant: ['tabular-nums'],
  },
  colon: {
    ...typography.bodyBold,
    color: colors.error.dark,
    marginHorizontal: 1,
  },
});
