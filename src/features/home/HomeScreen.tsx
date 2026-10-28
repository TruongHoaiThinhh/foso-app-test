import { useState } from 'react';
import { RefreshControl, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  FadeInDown,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArticleCard } from '@/components/ArticleCard';
import { SectionHeader } from '@/components/SectionHeader';
import { BellButton } from '@/components/ui/BellButton';
import { SearchBar } from '@/components/ui/SearchBar';
import { ErrorState } from '@/components/ui/StateView';
import { Toast } from '@/components/ui/Toast';
import { useMockLoad } from '@/hooks/useMockLoad';
import { useStatusBarStyle } from '@/hooks/useStatusBarStyle';
import {
  articles,
  bestProducts,
  brands,
  featuredCategories,
  flashProducts,
  flashSaleEndsAt,
  forYouProducts,
  newProducts,
} from '@/mocks/data';
import { images } from '@/mocks/images';
import { colors, radius, spacing } from '@/theme';
import { BannerCarousel } from './components/BannerCarousel';
import { BrandGrid } from './components/BrandGrid';
import { FeaturedCategories } from './components/FeaturedCategories';
import { FlashSale } from './components/FlashSale';
import { HighlightBanner } from './components/HighlightBanner';
import { HomeSkeleton } from './components/HomeSkeleton';
import { ProductRow, productRowHeight } from './components/ProductRow';
import { SearchResults } from './components/SearchResults';
import { useAddedToast } from './hooks/useAddedToast';
import { useHomeSearch } from './hooks/useHomeSearch';

const openCategory = (id?: string) =>
  router.navigate(
    id ? { pathname: '/category', params: { id, at: String(Date.now()) } } : '/category',
  );
const openNews = () => router.navigate('/news');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const reduced = useReducedMotion();
  const { status, refreshing, reload, retry } = useMockLoad();
  const [query, setQuery] = useState('');
  const results = useHomeSearch(query);
  const { added, dismiss } = useAddedToast();
  useStatusBarStyle('light');
  const scrollY = useSharedValue(0);
  const contentWidth = width - spacing.md * 2;
  const column = (contentWidth - spacing.md) / 2;

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const headerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      scrollY.value,
      [0, 90],
      [colors.brand[600], colors.brand[800]],
    ),
  }));

  const enter = (delay: number) => (reduced ? undefined : FadeInDown.delay(delay).duration(420));

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.header, headerStyle, { paddingTop: insets.top + 8 }]}>
        <SearchBar value={query} onChangeText={setQuery} style={styles.search} />
        <BellButton />
      </Animated.View>
      {status === 'error' ? (
        <ErrorState message="Kiểm tra kết nối rồi thử lại." onRetry={retry} />
      ) : status === 'loading' && !refreshing ? (
        <HomeSkeleton />
      ) : results ? (
        <SearchResults
          products={results.products}
          posts={results.posts}
          columnWidth={column}
          onPressArticle={openNews}
        />
      ) : (
        <Animated.ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={reload}
              tintColor={colors.brand[600]}
            />
          }
          contentContainerStyle={styles.page}
        >
          <View style={styles.sheet}>
            <Animated.View entering={enter(0)}>
              <HighlightBanner
                source={images.coupon}
                label="Mã giảm giá NGUOIMOI, giảm 35%"
                contentFit="contain"
                style={styles.coupon}
              />
            </Animated.View>
            <Animated.View entering={enter(60)}>
              <FeaturedCategories>
                <FeaturedCategories.Title>Danh mục tiêu biểu</FeaturedCategories.Title>
                <FeaturedCategories.List>
                  {featuredCategories.map((item) => (
                    <FeaturedCategories.Chip
                      key={item.id}
                      name={item.name}
                      image={item.image}
                      onPress={() => openCategory(item.categoryId)}
                    />
                  ))}
                </FeaturedCategories.List>
                <FeaturedCategories.Slider />
              </FeaturedCategories>
            </Animated.View>
            <Animated.View entering={enter(100)}>
              <BannerCarousel />
            </Animated.View>
          </View>

          <FlashSale deadline={flashSaleEndsAt} entering={enter(140)}>
            <FlashSale.Header>
              <FlashSale.Title />
              <FlashSale.Countdown />
              <SectionHeader.SeeAll
                onPress={() => openCategory()}
                accessibilityLabel="Xem tất cả Flash Sale"
                style={styles.pushRight}
              />
            </FlashSale.Header>
            <ProductRow data={flashProducts} variant="flash" />
          </FlashSale>

          <Animated.View entering={enter(180)} style={styles.block}>
            <SectionHeader>
              <SectionHeader.Title mark="hex">Thương Hiệu Nổi Bật</SectionHeader.Title>
            </SectionHeader>
            <BrandGrid width={contentWidth}>
              {brands.map((brand) => (
                <BrandGrid.Item key={brand.id} name={brand.name} image={brand.image} />
              ))}
            </BrandGrid>
          </Animated.View>

          <Animated.View entering={enter(220)} style={styles.blockBleed}>
            <View style={styles.pad}>
              <SectionHeader tone="link">
                <SectionHeader.Title mark="thumb">Sản Phẩm Bán Chạy</SectionHeader.Title>
                <SectionHeader.SeeAll
                  onPress={() => openCategory()}
                  accessibilityLabel="Xem tất cả Sản Phẩm Bán Chạy"
                />
              </SectionHeader>
            </View>
            <ProductRow data={bestProducts} variant="best" />
          </Animated.View>

          <Animated.View entering={enter(260)} style={styles.highlights}>
            <View style={styles.highlightColumn}>
              <HighlightBanner
                source={images.highlightGift}
                label="Mua 1 tặng 1"
                style={styles.highlightSmall}
              />
              <HighlightBanner
                source={images.highlightSale}
                label="Xả kho giá sốc"
                style={styles.highlightSmall}
              />
            </View>
            <HighlightBanner
              source={images.highlightHot}
              label="Mới cực hot, đồng giá 299K"
              style={styles.highlightTall}
            />
          </Animated.View>

          <Animated.View entering={enter(300)} style={styles.blockBleed}>
            <View style={styles.pad}>
              <SectionHeader tone="link">
                <SectionHeader.Title mark="star">Dành Cho Bạn</SectionHeader.Title>
                <SectionHeader.SeeAll
                  onPress={() => openCategory()}
                  accessibilityLabel="Xem tất cả Dành Cho Bạn"
                />
              </SectionHeader>
            </View>
            <ProductRow
              data={forYouProducts}
              variant="plain"
              header={
                <HighlightBanner
                  source={images.foryouPromo}
                  label="Bộ lọc chất lượng cao"
                  style={styles.promoCard}
                />
              }
            />
          </Animated.View>

          <Animated.View entering={enter(340)} style={styles.fresh}>
            <View style={styles.pad}>
              <SectionHeader tone="onDark">
                <SectionHeader.Title mark="box">Hàng Mới Về</SectionHeader.Title>
                <SectionHeader.SeeAll
                  onPress={() => openCategory()}
                  accessibilityLabel="Xem tất cả Hàng Mới Về"
                />
              </SectionHeader>
            </View>
            <ProductRow data={newProducts} variant="plain" />
          </Animated.View>

          <Animated.View entering={enter(380)} style={styles.block}>
            <SectionHeader>
              <SectionHeader.Title mark="news">Bài Viết Nổi Bật</SectionHeader.Title>
            </SectionHeader>
            <View style={styles.articles}>
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} onPress={openNews}>
                  <ArticleCard.Image />
                  <ArticleCard.Body>
                    <ArticleCard.Title />
                    <ArticleCard.Excerpt />
                    <ArticleCard.Date />
                  </ArticleCard.Body>
                </ArticleCard>
              ))}
            </View>
          </Animated.View>
        </Animated.ScrollView>
      )}
      {added ? (
        <Toast
          key={added.at}
          message={`Đã thêm ${added.product.name}`}
          actionLabel="Xem giỏ"
          actionAccessibilityLabel="Xem giỏ hàng"
          onAction={() => {
            dismiss();
            router.navigate('/cart');
          }}
        />
      ) : null}
    </View>
  );
}

const HIGHLIGHT_SMALL_RATIO = 177 / 129;
const HIGHLIGHT_TALL_RATIO = 177 / 270;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.grey[100],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 52,
    paddingBottom: spacing.lg,
  },
  search: {
    flex: 1,
  },
  page: {
    paddingBottom: spacing.xl,
  },
  sheet: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    gap: spacing.xl,
    paddingBottom: spacing.lg,
  },
  coupon: {
    width: '100%',
    height: 65,
    borderRadius: radius.md,
  },
  pushRight: {
    marginLeft: 'auto',
  },
  block: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  blockBleed: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  pad: {
    paddingHorizontal: spacing.md,
  },
  highlights: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    marginTop: spacing.xl,
  },
  highlightColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  highlightSmall: {
    aspectRatio: HIGHLIGHT_SMALL_RATIO,
  },
  highlightTall: {
    flex: 1,
    aspectRatio: HIGHLIGHT_TALL_RATIO,
  },
  promoCard: {
    width: 156,
    height: productRowHeight.plain,
    marginRight: spacing.md,
  },
  fresh: {
    backgroundColor: colors.brand[600],
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  articles: {
    gap: spacing.lg,
  },
});
