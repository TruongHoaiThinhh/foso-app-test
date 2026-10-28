import type { ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type Props = Omit<PressableProps, 'style'> & {
  children: ReactNode;
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PressableScale({
  children,
  fill,
  style,
  disabled,
  onPress,
  onPressIn,
  onPressOut,
  ...rest
}: Props) {
  const reduced = useReducedMotion();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const interactive = Boolean(onPress) && !disabled;

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        accessibilityRole={onPress ? 'button' : undefined}
        disabled={disabled}
        onPress={onPress}
        style={fill ? styles.fill : undefined}
        onPressIn={(event) => {
          if (!reduced && interactive) {
            scale.value = withSpring(0.97, { damping: 18, stiffness: 380 });
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          onPressIn?.(event);
        }}
        onPressOut={(event) => {
          scale.value = withSpring(1, { damping: 18, stiffness: 380 });
          onPressOut?.(event);
        }}
        {...rest}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

const styles = {
  fill: { flex: 1 },
};
