import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  LinearTransition,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { AppImage } from '@/components/ui/AppImage';
import { AppText } from '@/components/ui/AppText';
import { CheckBox } from '@/components/ui/CheckBox';
import { formatPrice } from '@/lib/format';
import type { CartLine } from '@/state/cart';
import { colors, radius, spacing, typography } from '@/theme';

export type CartItemProps = {
  line: CartLine;
  index: number;
  selected: boolean;
  onToggle: (id: string) => void;
  onQty: (id: string, qty: number) => void;
  onDelete: (line: CartLine, index: number) => void;
  onRequestDelete: (line: CartLine, index: number) => void;
};

type CartItemValue = Omit<CartItemProps, 'onDelete' | 'onRequestDelete'> & {
  remove: () => void;
  requestRemove: () => void;
};

const CartItemContext = createContext<CartItemValue | null>(null);

function useCartItem() {
  const value = useContext(CartItemContext);
  if (!value) throw new Error('CartItem.* phải nằm trong CartItem');
  return value;
}

function Root({
  line,
  index,
  selected,
  onToggle,
  onQty,
  onDelete,
  onRequestDelete,
  children,
}: CartItemProps & { children: ReactNode }) {
  const tx = useSharedValue(0);
  const remove = useCallback(() => onDelete(line, index), [index, line, onDelete]);
  const requestRemove = useCallback(
    () => onRequestDelete(line, index),
    [index, line, onRequestDelete],
  );

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-16, 16])
        .failOffsetY([-12, 12])
        .onUpdate((event) => {
          tx.value = Math.min(0, Math.max(-120, event.translationX));
        })
        .onEnd((event) => {
          if (event.translationX < -72) {
            tx.value = withTiming(-480, { duration: 180 }, (finished) => {
              if (finished) runOnJS(remove)();
            });
          } else {
            tx.value = withTiming(0, { duration: 160 });
          }
        }),
    [remove, tx],
  );
  const slide = useAnimatedStyle(() => ({ transform: [{ translateX: tx.value }] }));

  const value = useMemo(
    () => ({ line, index, selected, onToggle, onQty, remove, requestRemove }),
    [index, line, onQty, onToggle, remove, requestRemove, selected],
  );

  return (
    <CartItemContext.Provider value={value}>
      <Animated.View layout={LinearTransition.duration(200)} style={styles.swipe}>
        <View style={styles.deleteBg}>
          <Trash2 color={colors.white} size={20} strokeWidth={2} />
        </View>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.row, slide]}>{children}</Animated.View>
        </GestureDetector>
      </Animated.View>
    </CartItemContext.Provider>
  );
}

function Select() {
  const { line, selected, onToggle, remove } = useCartItem();
  return (
    <Pressable
      onPress={() => onToggle(line.id)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`Chọn ${line.product.name}`}
      accessibilityActions={[{ name: 'delete', label: 'Xoá khỏi giỏ hàng' }]}
      onAccessibilityAction={(event) => {
        if (event.nativeEvent.actionName === 'delete') remove();
      }}
      hitSlop={10}
    >
      <CheckBox checked={selected} />
    </Pressable>
  );
}

function Thumbnail() {
  const { line } = useCartItem();
  return (
    <AppImage source={line.product.image} contentFit="contain" containerStyle={styles.thumb} />
  );
}

function Info({ children }: { children: ReactNode }) {
  return <View style={styles.info}>{children}</View>;
}

function Name() {
  const { line } = useCartItem();
  return (
    <AppText style={styles.name} numberOfLines={2}>
      {line.product.name}
    </AppText>
  );
}

function Price() {
  const { price, originalPrice } = useCartItem().line.product;
  return (
    <View style={styles.priceRow}>
      <AppText style={styles.price}>{formatPrice(price)}</AppText>
      {originalPrice > price ? (
        <AppText style={styles.originalPrice}>{formatPrice(originalPrice)}</AppText>
      ) : null}
    </View>
  );
}

function Actions({ children }: { children: ReactNode }) {
  return <View style={styles.actions}>{children}</View>;
}

function Stepper() {
  const { line, onQty, requestRemove } = useCartItem();
  const { product, qty } = line;

  const decrease = () => {
    if (qty <= 1) {
      requestRemove();
      return;
    }
    void Haptics.selectionAsync();
    onQty(line.id, qty - 1);
  };

  const increase = () => {
    void Haptics.selectionAsync();
    onQty(line.id, qty + 1);
  };

  return (
    <View style={styles.stepper}>
      <Pressable
        onPress={decrease}
        accessibilityRole="button"
        accessibilityLabel={qty <= 1 ? `Xoá ${product.name}` : `Giảm số lượng ${product.name}`}
        hitSlop={6}
        style={styles.step}
      >
        {qty <= 1 ? (
          <Trash2 color={colors.error.dark} size={16} strokeWidth={2} />
        ) : (
          <Minus color={colors.brand[600]} size={16} strokeWidth={2} />
        )}
      </Pressable>
      <AppText style={styles.qty} accessibilityLabel={`Số lượng ${qty}`}>
        {qty}
      </AppText>
      <Pressable
        onPress={increase}
        accessibilityRole="button"
        accessibilityLabel={`Tăng số lượng ${product.name}`}
        hitSlop={6}
        style={styles.step}
      >
        <Plus color={colors.brand[600]} size={16} strokeWidth={2} />
      </Pressable>
    </View>
  );
}

function Total() {
  const { product, qty } = useCartItem().line;
  return <AppText style={styles.lineTotal}>{formatPrice(product.price * qty)}</AppText>;
}

export const CartItem = Object.assign(Root, {
  Select,
  Image: Thumbnail,
  Info,
  Name,
  Price,
  Actions,
  Stepper,
  Total,
});

const styles = StyleSheet.create({
  swipe: {
    borderRadius: radius.sm,
    overflow: 'hidden',
    backgroundColor: colors.error.main,
  },
  deleteBg: {
    ...StyleSheet.absoluteFill,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    padding: spacing.sm,
    alignItems: 'center',
  },
  thumb: {
    width: 64,
    height: 64,
    backgroundColor: colors.white,
    borderRadius: radius.sm,
  },
  info: { flex: 1, gap: spacing.xs },
  name: { ...typography.title, color: colors.text.primary },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  price: { ...typography.bodyBold, color: colors.error.dark },
  originalPrice: {
    ...typography.caption,
    color: colors.text.disabled,
    textDecorationLine: 'line-through',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  step: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.brand[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    ...typography.bodyBold,
    color: colors.text.primary,
    minWidth: 16,
    textAlign: 'center',
  },
  lineTotal: {
    ...typography.bodyBold,
    color: colors.text.primary,
  },
});
