import { createContext, useContext, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ImageSource } from 'expo-image';

import { AppImage } from '@/components/ui/AppImage';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, radius, spacing } from '@/theme';

const ItemWidthContext = createContext(0);

type RootProps = {
  width: number;
  columns?: number;
  children: ReactNode;
};

function Root({ width, columns = 5, children }: RootProps) {
  const itemWidth = (width - spacing.sm * (columns - 1)) / columns;
  return (
    <ItemWidthContext.Provider value={itemWidth}>
      <View style={styles.grid}>{children}</View>
    </ItemWidthContext.Provider>
  );
}

type ItemProps = {
  name: string;
  image: ImageSource;
  onPress?: () => void;
};

function Item({ name, image, onPress }: ItemProps) {
  const width = useContext(ItemWidthContext);
  return (
    <PressableScale onPress={onPress} accessibilityLabel={name} style={[styles.card, { width }]}>
      <AppImage source={image} contentFit="contain" containerStyle={styles.image} />
    </PressableScale>
  );
}

export const BrandGrid = Object.assign(Root, { Item });

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  card: {
    height: 56,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.grey[300],
    padding: 4,
  },
  image: {
    height: 48,
    backgroundColor: colors.white,
  },
});
