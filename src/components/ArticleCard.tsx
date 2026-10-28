import { createContext, useContext, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppImage } from '@/components/ui/AppImage';
import { AppText } from '@/components/ui/AppText';
import { PressableScale } from '@/components/ui/PressableScale';
import type { Article } from '@/mocks/data';
import { colors, fonts, radius, shadows, spacing } from '@/theme';

type Variant = 'row' | 'feed';

type ArticleValue = { article: Article; isFeed: boolean };

const ArticleContext = createContext<ArticleValue | null>(null);

function useArticle() {
  const value = useContext(ArticleContext);
  if (!value) throw new Error('ArticleCard.* phải nằm trong ArticleCard');
  return value;
}

type RootProps = {
  article: Article;
  variant?: Variant;
  onPress?: () => void;
  children: ReactNode;
};

function Root({ article, variant = 'row', onPress, children }: RootProps) {
  const isFeed = variant === 'feed';
  const label = [article.title, article.excerpt, article.date].filter(Boolean).join(', ');

  return (
    <ArticleContext.Provider value={{ article, isFeed }}>
      <PressableScale
        onPress={onPress}
        accessibilityLabel={label}
        style={[styles.card, isFeed ? styles.feed : shadows.soft]}
      >
        <View style={isFeed ? styles.feedColumn : styles.row}>{children}</View>
      </PressableScale>
    </ArticleContext.Provider>
  );
}

function Thumbnail() {
  const { article, isFeed } = useArticle();
  return (
    <AppImage
      source={article.image}
      contentFit="cover"
      containerStyle={isFeed ? styles.cover : styles.thumb}
    />
  );
}

function Body({ children }: { children: ReactNode }) {
  const { isFeed } = useArticle();
  return <View style={isFeed ? styles.feedBody : styles.body}>{children}</View>;
}

function Title() {
  const { article } = useArticle();
  return (
    <AppText style={styles.title} numberOfLines={article.excerpt ? 1 : 2}>
      {article.title}
    </AppText>
  );
}

function Excerpt() {
  const { article, isFeed } = useArticle();
  if (!article.excerpt) return null;
  return (
    <AppText style={styles.excerpt} numberOfLines={isFeed ? 2 : 1}>
      {article.excerpt}
    </AppText>
  );
}

function PublishedDate() {
  const { article } = useArticle();
  return <AppText style={styles.date}>{article.date}</AppText>;
}

export const ArticleCard = Object.assign(Root, {
  Image: Thumbnail,
  Body,
  Title,
  Excerpt,
  Date: PublishedDate,
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
  },
  thumb: {
    width: 120,
    height: 84,
    borderRadius: radius.md,
  },
  body: {
    flex: 1,
    paddingRight: spacing.xs,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.text.primary,
  },
  excerpt: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 22,
    color: colors.text.primary,
  },
  date: {
    marginTop: spacing.xs,
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.brand[500],
  },
  feed: {
    padding: 0,
    overflow: 'hidden',
    borderRadius: radius.sm,
  },
  feedColumn: {
    width: '100%',
  },
  cover: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderTopLeftRadius: radius.sm,
    borderTopRightRadius: radius.sm,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  feedBody: {
    padding: spacing.md,
    gap: spacing.xs,
  },
});
