import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArticleCard } from '@/components/ArticleCard';
import { AppText } from '@/components/ui/AppText';
import { SearchBar } from '@/components/ui/SearchBar';
import { StateView } from '@/components/ui/StateView';
import { useStatusBarStyle } from '@/hooks/useStatusBarStyle';
import { articles } from '@/mocks/data';
import { colors, spacing, typography } from '@/theme';

export default function NewsScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  useStatusBarStyle('dark');
  const data = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return articles;
    return articles.filter((item) =>
      `${item.title} ${item.excerpt ?? ''}`.toLowerCase().includes(needle),
    );
  }, [query]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <AppText style={styles.title} accessibilityRole="header">
        Tin tức
      </AppText>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Tìm kiếm bài viết"
        accessibilityLabel="Tìm kiếm bài viết"
        style={styles.search}
      />
      {data.length === 0 ? (
        <StateView accessibilityRole="text">
          <StateView.Title>Chưa có bài viết</StateView.Title>
          <StateView.Message>Không có bài khớp từ khóa vừa nhập.</StateView.Message>
        </StateView>
      ) : (
        <FlashList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <ArticleCard article={item} variant="feed">
                <ArticleCard.Image />
                <ArticleCard.Body>
                  <ArticleCard.Title />
                  <ArticleCard.Excerpt />
                  <ArticleCard.Date />
                </ArticleCard.Body>
              </ArticleCard>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.grey[100],
  },
  title: {
    ...typography.h3,
    color: colors.brand[800],
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  search: {
    margin: spacing.md,
  },
  item: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
});
