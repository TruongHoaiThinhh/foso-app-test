import { ScrollView, StyleSheet, View } from 'react-native';

import { ArticleCard } from '@/components/ArticleCard';
import { ProductCard } from '@/components/ProductCard';
import { AppText } from '@/components/ui/AppText';
import { StateView } from '@/components/ui/StateView';
import type { Article, Product } from '@/mocks/data';
import { colors, spacing, typography } from '@/theme';

type Props = {
  products: Product[];
  posts: Article[];
  columnWidth: number;
  onPressArticle: () => void;
};

export function SearchResults({ products, posts, columnWidth, onPressArticle }: Props) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      contentContainerStyle={styles.content}
    >
      {products.length + posts.length === 0 ? (
        <StateView accessibilityRole="text">
          <StateView.Title>Không tìm thấy sản phẩm</StateView.Title>
          <StateView.Message>Thử từ khóa khác, ví dụ lọc gió hoặc lọc dầu.</StateView.Message>
        </StateView>
      ) : null}
      {products.length > 0 ? (
        <View style={styles.section}>
          <AppText style={styles.heading} accessibilityRole="header">
            Sản phẩm ({products.length})
          </AppText>
          <View style={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} width={columnWidth}>
                <ProductCard.Badge />
                <ProductCard.Image />
                <ProductCard.Name />
                <ProductCard.Price />
                <ProductCard.BuyButton />
              </ProductCard>
            ))}
          </View>
        </View>
      ) : null}
      {posts.length > 0 ? (
        <View style={styles.section}>
          <AppText style={styles.heading} accessibilityRole="header">
            Bài viết ({posts.length})
          </AppText>
          {posts.map((article) => (
            <ArticleCard key={article.id} article={article} onPress={onPressArticle}>
              <ArticleCard.Image />
              <ArticleCard.Body>
                <ArticleCard.Title />
                <ArticleCard.Excerpt />
                <ArticleCard.Date />
              </ArticleCard.Body>
            </ArticleCard>
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    gap: spacing.xl,
  },
  section: {
    gap: spacing.md,
  },
  heading: {
    ...typography.h3,
    color: colors.brand[800],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
});
