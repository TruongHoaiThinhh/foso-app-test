import { memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/AppText';
import { StateView } from '@/components/ui/StateView';
import { Toast } from '@/components/ui/Toast';
import { useStatusBarStyle } from '@/hooks/useStatusBarStyle';
import { useCart } from '@/state/cart';
import { colors, spacing, typography } from '@/theme';
import { CartFooter } from './components/CartFooter';
import { CartItem, type CartItemProps } from './components/CartItem';
import { useCartSummary } from './hooks/useCartSummary';
import { useRemoveWithUndo } from './hooks/useRemoveWithUndo';

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const { lines, deselected, setQty, toggleSelected, setAllSelected } = useCart();
  const { summary, allSelected } = useCartSummary(lines, deselected);
  const { removed, remove, confirmRemove, undo } = useRemoveWithUndo();
  useStatusBarStyle('dark');

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <AppText style={styles.title} accessibilityRole="header">
        Giỏ hàng
      </AppText>
      <View style={styles.body}>
        {lines.length === 0 ? (
          <StateView accessibilityRole="text">
            <StateView.Title>Giỏ hàng trống</StateView.Title>
            <StateView.Message>
              Bấm Mua ngay ở trang chủ để thêm lọc gió, lọc dầu.
            </StateView.Message>
          </StateView>
        ) : (
          <ScrollView contentContainerStyle={styles.list}>
            {lines.map((line, index) => (
              <CartRow
                key={line.id}
                line={line}
                index={index}
                selected={!deselected[line.id]}
                onToggle={toggleSelected}
                onQty={setQty}
                onDelete={remove}
                onRequestDelete={confirmRemove}
              />
            ))}
          </ScrollView>
        )}
        {removed ? (
          <Toast
            message={`Đã xoá ${removed.line.product.name}`}
            actionLabel="Hoàn tác"
            actionAccessibilityLabel="Hoàn tác xoá"
            onAction={undo}
          />
        ) : null}
      </View>
      {lines.length > 0 ? (
        <CartFooter
          allSelected={allSelected}
          onToggleAll={() => setAllSelected(!allSelected)}
          summary={summary}
        />
      ) : null}
    </View>
  );
}

const CartRow = memo(function CartRow(props: CartItemProps) {
  return (
    <CartItem {...props}>
      <CartItem.Select />
      <CartItem.Image />
      <CartItem.Info>
        <CartItem.Name />
        <CartItem.Price />
        <CartItem.Actions>
          <CartItem.Stepper />
          <CartItem.Total />
        </CartItem.Actions>
      </CartItem.Info>
    </CartItem>
  );
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.grey[100],
  },
  title: {
    ...typography.h3,
    color: colors.brand[800],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  body: { flex: 1 },
  list: {
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
});
