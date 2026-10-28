import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ImageSource } from 'expo-image';

import { AppImage } from '@/components/ui/AppImage';
import { AppText } from '@/components/ui/AppText';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, radius, spacing, typography } from '@/theme';

export type GridItem = {
  id: string;
  name: string;
  image: ImageSource;
};

type Props = {
  items: GridItem[];
  width: number;
  onPressItem?: (item: GridItem) => void;
};

const COLUMNS = 3;

function SubCategoryGridComponent({ items, width, onPressItem }: Props) {
  const cell = (width - spacing.sm * (COLUMNS - 1)) / COLUMNS;

  return (
    <View style={styles.grid}>
      {items.map((item) => {
        const content = (
          <>
            <AppImage source={item.image} contentFit="contain" containerStyle={styles.image} />
            <AppText style={styles.name} numberOfLines={2}>
              {item.name}
            </AppText>
          </>
        );
        return onPressItem ? (
          <PressableScale
            key={item.id}
            onPress={() => onPressItem(item)}
            accessibilityLabel={item.name}
            style={[styles.cell, { width: cell }]}
          >
            {content}
          </PressableScale>
        ) : (
          <View key={item.id} style={[styles.cell, { width: cell }]}>
            {content}
          </View>
        );
      })}
    </View>
  );
}

export const SubCategoryGrid = memo(SubCategoryGridComponent);

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  cell: {
    alignItems: 'center',
    minHeight: 110,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
  },
  name: {
    ...typography.caption,
    color: colors.text.primary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
