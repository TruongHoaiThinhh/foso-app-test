import { memo, useCallback, type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/mocks/data';
import { spacing } from '@/theme';

export const productRowHeight = {
  flash: 350,
  best: 328,
  plain: 310,
} as const;

type Variant = keyof typeof productRowHeight;

type Props = {
  data: Product[];
  variant: Variant;
  header?: ReactElement | null;
};

export function ProductRow({ data, variant, header }: Props) {
  const renderItem = useCallback(
    ({ item }: { item: Product }) => <RowItem product={item} variant={variant} />,
    [variant],
  );

  return (
    <FlashList
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={header}
      contentContainerStyle={styles.content}
      style={{ height: productRowHeight[variant] }}
    />
  );
}

const RowItem = memo(function RowItem({
  product,
  variant,
}: {
  product: Product;
  variant: Variant;
}) {
  return (
    <ProductCard product={product}>
      <ProductCard.Badge />
      <ProductCard.Image />
      <ProductCard.Name />
      <ProductCard.Price />
      {variant === 'flash' ? <ProductCard.Progress /> : null}
      <ProductCard.BuyButton />
    </ProductCard>
  );
});

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
  },
  separator: {
    width: spacing.md,
  },
});
