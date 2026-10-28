import { createContext, useContext, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppImage } from '@/components/ui/AppImage';
import { AppText } from '@/components/ui/AppText';
import { PressableScale } from '@/components/ui/PressableScale';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/mocks/data';
import { useCart } from '@/state/cart';
import { colors, fonts, radius, shadows, spacing, typography } from '@/theme';

const ProductContext = createContext<Product | null>(null);

function useProduct() {
  const product = useContext(ProductContext);
  if (!product) throw new Error('ProductCard.* phải nằm trong ProductCard');
  return product;
}

type RootProps = {
  product: Product;
  width?: number;
  children: ReactNode;
};

function Root({ product, width = 156, children }: RootProps) {
  return (
    <ProductContext.Provider value={product}>
      <View style={[styles.card, { width }, shadows.card]}>{children}</View>
    </ProductContext.Provider>
  );
}

function Badge() {
  const { stockBadge } = useProduct();
  if (!stockBadge) return null;
  return (
    <View style={styles.badge}>
      <View style={styles.badgeDot} />
      <AppText style={styles.badgeText} numberOfLines={1}>
        {stockBadge}
      </AppText>
    </View>
  );
}

function Thumbnail() {
  const { image } = useProduct();
  return (
    <AppImage
      source={image}
      contentFit="contain"
      containerStyle={styles.image}
      accessible={false}
    />
  );
}

function Name() {
  const { name } = useProduct();
  return (
    <AppText style={styles.name} numberOfLines={2}>
      {name}
    </AppText>
  );
}

function Price() {
  const { price, originalPrice, discountPercent } = useProduct();
  return (
    <>
      <AppText style={styles.price}>{formatPrice(price)}</AppText>
      <View style={styles.priceRow}>
        <AppText style={styles.original}>{formatPrice(originalPrice)}</AppText>
        <AppText style={styles.discount}>-{discountPercent}%</AppText>
      </View>
    </>
  );
}

function Progress() {
  const { soldLabel, progress } = useProduct();
  if (!soldLabel || progress == null) return null;
  return (
    <View style={styles.progress}>
      <ProgressBar progress={progress} label={soldLabel} />
    </View>
  );
}

function BuyButton() {
  const product = useProduct();
  const { add } = useCart();
  return (
    <PressableScale
      onPress={() => add(product)}
      accessibilityLabel={`Mua ngay ${product.name}`}
      style={styles.button}
    >
      <AppText style={styles.buttonText}>Mua ngay</AppText>
    </PressableScale>
  );
}

export const ProductCard = Object.assign(Root, {
  Badge,
  Image: Thumbnail,
  Name,
  Price,
  Progress,
  BuyButton,
});

const styles = StyleSheet.create({
  card: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    padding: spacing.sm,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    marginBottom: spacing.lg,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    backgroundColor: colors.warning.lighter,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    maxWidth: '100%',
    marginBottom: spacing.xs,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.warning.main,
  },
  badgeText: {
    ...typography.tiny,
    color: colors.error.darker,
    flexShrink: 1,
  },
  name: {
    ...typography.title,
    fontFamily: fonts.semibold,
    color: colors.text.primary,
    minHeight: 48,
    marginBottom: spacing.sm,
  },
  price: {
    ...typography.bodyBold,
    color: colors.error.dark,
    marginBottom: spacing.xxs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  progress: {
    marginBottom: spacing.md,
  },
  original: {
    ...typography.small,
    color: colors.text.disabled,
    textDecorationLine: 'line-through',
  },
  discount: {
    ...typography.caption,
    color: colors.error.dark,
  },
  button: {
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.brand[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: typography.h3.fontFamily,
    fontSize: 14,
    lineHeight: 20,
    color: colors.brand[600],
  },
});
