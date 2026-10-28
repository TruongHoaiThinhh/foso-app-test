import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, useReducedMotion } from 'react-native-reanimated';
import { ChevronRight, ChevronsRight } from 'lucide-react-native';

import { AppText } from '@/components/ui/AppText';
import { PressableScale } from '@/components/ui/PressableScale';
import type { CatalogCategory, SubGroup } from '@/mocks/data';
import { colors, radius, spacing, typography } from '@/theme';
import { SubCategoryGrid } from './SubCategoryGrid';

type Props = {
  category?: CatalogCategory;
  groups: SubGroup[];
  gridWidth: number;
  fallback?: CatalogCategory;
  onJumpToFallback: () => void;
};

export function CategoryPanel({ category, groups, gridWidth, fallback, onJumpToFallback }: Props) {
  const reduced = useReducedMotion();

  return (
    <Animated.View entering={reduced ? undefined : FadeIn.duration(220)} style={styles.content}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        stickyHeaderIndices={groups.map((_, index) => 1 + index * 2)}
        contentContainerStyle={styles.contentList}
      >
        <View style={styles.titleBlock}>
          <View style={styles.categoryTitle}>
            <AppText style={styles.h3} accessibilityRole="header" numberOfLines={2}>
              {category?.name}
            </AppText>
            <ChevronRight color={colors.text.primary} size={18} strokeWidth={2} />
          </View>
          <View style={styles.divider} />
        </View>
        {groups.flatMap((group, index) => [
          <View key={`${group.id}-header`} style={styles.stickyHeader}>
            <View style={styles.subHeader}>
              <AppText style={styles.subTitle}>{group.title}</AppText>
              <View style={styles.seeAll}>
                <AppText style={styles.seeAllText}>Xem tất cả</AppText>
                <ChevronsRight color={colors.brand[500]} size={12} strokeWidth={2} />
              </View>
            </View>
          </View>,
          <View key={group.id} style={styles.gridWrap}>
            <SubCategoryGrid items={group.items} width={gridWidth} />
            {index < groups.length - 1 ? <View style={styles.sectionDivider} /> : null}
          </View>,
        ])}
        {groups.length === 0 ? (
          <View style={styles.empty}>
            <AppText style={styles.emptyText}>
              {fallback
                ? `Không có kết quả trong ${category?.name}.`
                : 'Không có sản phẩm phù hợp.'}
            </AppText>
            {fallback ? (
              <PressableScale
                onPress={onJumpToFallback}
                accessibilityLabel={`Xem kết quả trong ${fallback.name}`}
                style={styles.jump}
              >
                <View style={styles.jumpInner}>
                  <AppText style={styles.jumpText}>Xem trong {fallback.name}</AppText>
                </View>
              </PressableScale>
            ) : null}
          </View>
        ) : null}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentList: {
    paddingBottom: spacing.lg,
  },
  titleBlock: {
    paddingHorizontal: spacing.md,
  },
  categoryTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  h3: {
    ...typography.h3,
    flex: 1,
    color: colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.grey[300],
  },
  stickyHeader: {
    backgroundColor: colors.white,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  subTitle: {
    flex: 1,
    fontFamily: typography.h3.fontFamily,
    fontSize: 14,
    lineHeight: 20,
    color: colors.text.primary,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  seeAllText: {
    ...typography.small,
    color: colors.brand[500],
  },
  gridWrap: {
    paddingHorizontal: spacing.md,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: colors.grey[300],
    marginVertical: spacing.sm,
  },
  empty: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.muted,
    textAlign: 'center',
  },
  jump: {
    borderRadius: radius.sm,
    backgroundColor: colors.brand[50],
  },
  jumpInner: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jumpText: {
    ...typography.bodyBold,
    color: colors.brand[600],
  },
});
