import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

import { BellButton } from '@/components/ui/BellButton';
import { PressableScale } from '@/components/ui/PressableScale';
import { SearchBar } from '@/components/ui/SearchBar';
import { ErrorState } from '@/components/ui/StateView';
import { useMockLoad } from '@/hooks/useMockLoad';
import { useStatusBarStyle } from '@/hooks/useStatusBarStyle';
import { catalog } from '@/mocks/data';
import { colors, radius, spacing } from '@/theme';
import { CategoryPanel } from './components/CategoryPanel';
import { CategorySkeleton } from './components/CategorySkeleton';
import { Sidebar, SIDEBAR_WIDTH } from './components/Sidebar';
import { useCategorySearch } from './hooks/useCategorySearch';

const DEFAULT_CATEGORY = 1;

function indexOfCategory(id?: string) {
  const index = catalog.findIndex((item) => item.id === id);
  return index >= 0 ? index : undefined;
}

export default function CategoryScreen() {
  const insets = useSafeAreaInsets();
  const { id, at } = useLocalSearchParams<{ id?: string; at?: string }>();
  const { width } = useWindowDimensions();
  const { status, retry } = useMockLoad();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(() => indexOfCategory(id) ?? DEFAULT_CATEGORY);
  const [appliedAt, setAppliedAt] = useState(at);
  const [reveal, setReveal] = useState<{ index: number } | null>(null);
  const { groups, fallbackIndex, isDimmed } = useCategorySearch(query, active);
  useStatusBarStyle('light');

  const jumpTo = (index: number) => {
    setActive(index);
    setReveal({ index });
  };

  if (at !== appliedAt) {
    setAppliedAt(at);
    const index = indexOfCategory(id);
    if (index !== undefined) jumpTo(index);
  }

  const category = catalog[active] ?? catalog[0];

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <PressableScale
          onPress={() => router.navigate('/')}
          accessibilityLabel="Quay lại trang chủ"
          hitSlop={6}
          style={styles.back}
        >
          <ChevronLeft color={colors.white} size={24} strokeWidth={2} />
        </PressableScale>
        <SearchBar value={query} onChangeText={setQuery} style={styles.search} />
        <BellButton />
      </View>
      <View style={styles.sheet}>
        {status === 'error' ? (
          <ErrorState message="Không tải được danh mục." onRetry={retry} />
        ) : status === 'loading' ? (
          <CategorySkeleton />
        ) : (
          <View style={styles.body}>
            <Sidebar active={active} onSelect={setActive} reveal={reveal}>
              <Sidebar.Indicator />
              {catalog.map((item, index) => (
                <Sidebar.Item
                  key={item.id}
                  index={index}
                  name={item.name}
                  image={item.image}
                  dimmed={isDimmed(index)}
                />
              ))}
            </Sidebar>
            <CategoryPanel
              key={category?.id}
              category={category}
              groups={groups}
              gridWidth={width - SIDEBAR_WIDTH - spacing.md * 2}
              fallback={catalog[fallbackIndex]}
              onJumpToFallback={() => jumpTo(fallbackIndex)}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.brand[600],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  back: {
    width: 32,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    flex: 1,
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    overflow: 'hidden',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
});
