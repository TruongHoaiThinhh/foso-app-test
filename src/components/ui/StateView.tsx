import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { colors, spacing, typography } from '@/theme';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';

function Root({ style, ...rest }: ViewProps) {
  return <View style={[styles.box, style]} {...rest} />;
}

function Title({ children }: { children: ReactNode }) {
  return <AppText style={styles.title}>{children}</AppText>;
}

function Message({ children }: { children: ReactNode }) {
  return <AppText style={styles.message}>{children}</AppText>;
}

function Action({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={label} style={styles.button}>
      <AppText style={styles.buttonText}>{label}</AppText>
    </PressableScale>
  );
}

export const StateView = Object.assign(Root, { Title, Message, Action });

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <StateView>
      <StateView.Title>Không tải được dữ liệu</StateView.Title>
      <StateView.Message>{message}</StateView.Message>
      <StateView.Action label="Thử lại" onPress={onRetry} />
    </StateView>
  );
}

const styles = StyleSheet.create({
  box: {
    margin: spacing.md,
    padding: spacing.xl,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.text.primary,
    textAlign: 'center',
  },
  message: {
    ...typography.body,
    color: colors.text.muted,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.sm,
    minHeight: 44,
    minWidth: 120,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    backgroundColor: colors.brand[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...typography.body,
    fontFamily: typography.h3.fontFamily,
    color: colors.white,
  },
});
