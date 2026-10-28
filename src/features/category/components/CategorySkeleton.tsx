import { StyleSheet, View } from 'react-native';

import { Skeleton } from '@/components/ui/Skeleton';
import { colors } from '@/theme';
import { SIDEBAR_WIDTH } from './Sidebar';

export function CategorySkeleton() {
  return (
    <View style={styles.page} accessibilityLabel="Đang tải danh mục">
      <View style={styles.sidebar}>
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} style={styles.sidebarItem} />
        ))}
      </View>
      <View style={styles.content}>
        <Skeleton style={styles.title} />
        <View style={styles.grid}>
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} style={styles.cell} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, flexDirection: 'row' },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: colors.brand[50],
    alignItems: 'center',
    paddingTop: 16,
    gap: 40,
  },
  sidebarItem: { width: 56, height: 64 },
  content: { flex: 1, padding: 12, gap: 16 },
  title: { width: 180, height: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  cell: { width: '31%', aspectRatio: 0.8 },
});
