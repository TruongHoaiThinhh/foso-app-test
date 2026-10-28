import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { CheckBox } from '@/components/ui/CheckBox';
import { PressableScale } from '@/components/ui/PressableScale';
import { formatPrice } from '@/lib/format';
import { colors, radius, spacing, typography } from '@/theme';
import type { CartSummary } from '../hooks/useCartSummary';

type Props = {
  allSelected: boolean;
  onToggleAll: () => void;
  summary: CartSummary;
};

export function CartFooter({ allSelected, onToggleAll, summary }: Props) {
  const canCheckout = summary.qty > 0;

  return (
    <View style={styles.footer}>
      <Pressable
        onPress={onToggleAll}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: allSelected }}
        accessibilityLabel="Chọn tất cả"
        style={styles.selectAll}
        hitSlop={8}
      >
        <CheckBox checked={allSelected} />
        <AppText style={styles.selectLabel}>Tất cả</AppText>
      </Pressable>
      <View style={styles.summary}>
        <AppText style={styles.totalLabel}>
          Tổng cộng <AppText style={styles.total}>{formatPrice(summary.total)}</AppText>
        </AppText>
        {summary.saving > 0 ? (
          <AppText style={styles.saving}>Tiết kiệm {formatPrice(summary.saving)}</AppText>
        ) : null}
      </View>
      <PressableScale
        disabled={!canCheckout}
        accessibilityLabel={`Thanh toán ${summary.qty} sản phẩm`}
        accessibilityState={{ disabled: !canCheckout }}
        style={[styles.checkout, !canCheckout && styles.checkoutDisabled]}
      >
        <View style={styles.checkoutInner}>
          <AppText style={styles.checkoutText}>Thanh toán ({summary.qty})</AppText>
        </View>
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.grey[300],
  },
  selectAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 44,
  },
  selectLabel: {
    ...typography.caption,
    color: colors.text.primary,
  },
  summary: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  totalLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  total: {
    ...typography.bodyBold,
    color: colors.error.dark,
  },
  saving: {
    ...typography.small,
    color: colors.text.muted,
  },
  checkout: {
    borderRadius: radius.sm,
    backgroundColor: colors.brand[600],
  },
  checkoutDisabled: {
    backgroundColor: colors.grey[400],
  },
  checkoutInner: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    fontFamily: typography.h3.fontFamily,
    fontSize: 14,
    color: colors.white,
  },
});
