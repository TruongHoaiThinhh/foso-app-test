import { StyleSheet, View } from 'react-native';

import { Skeleton } from '@/components/ui/Skeleton';
import { radius } from '@/theme';

export function HomeSkeleton() {
  return (
    <View style={styles.page} accessibilityLabel="Đang tải trang chủ">
      <Skeleton style={styles.banner} />
      <Skeleton style={styles.title} />
      <View style={styles.row}>
        <Skeleton style={styles.chip} />
        <Skeleton style={styles.chip} />
        <Skeleton style={styles.chip} />
        <Skeleton style={styles.chip} />
      </View>
      <Skeleton style={styles.carousel} />
      <Skeleton style={styles.block} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 12,
    gap: 16,
  },
  banner: { aspectRatio: 369 / 66, borderRadius: radius.md },
  title: { width: 180, height: 24 },
  row: { flexDirection: 'row', gap: 8 },
  chip: { width: 79, height: 98 },
  carousel: { aspectRatio: 369 / 176 },
  block: { height: 220 },
});
