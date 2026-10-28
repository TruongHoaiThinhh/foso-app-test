import { useEffect } from 'react';
import { AccessibilityInfo, Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import { colors, radius, spacing, typography } from '@/theme';
import { AppText } from './AppText';

type Props = {
  message: string;
  actionLabel: string;
  actionAccessibilityLabel?: string;
  onAction: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Toast({ message, actionLabel, actionAccessibilityLabel, onAction, style }: Props) {
  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(message);
  }, [message]);

  return (
    <Animated.View
      entering={FadeInDown.duration(180)}
      exiting={FadeOutDown.duration(160)}
      style={[styles.toast, style]}
      accessibilityLiveRegion="polite"
    >
      <AppText style={styles.message} numberOfLines={1}>
        {message}
      </AppText>
      <Pressable
        onPress={onAction}
        accessibilityRole="button"
        accessibilityLabel={actionAccessibilityLabel ?? actionLabel}
        hitSlop={10}
      >
        <AppText style={styles.action}>{actionLabel}</AppText>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.grey[800],
  },
  message: {
    ...typography.body,
    color: colors.white,
    flex: 1,
  },
  action: {
    ...typography.bodyBold,
    color: colors.brand[50],
  },
});
