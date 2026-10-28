import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useReducedMotion } from 'react-native-reanimated';

import { AppImage } from '@/components/ui/AppImage';
import { AppText } from '@/components/ui/AppText';
import { bannerSlides } from '@/mocks/data';
import { colors, radius, spacing, typography } from '@/theme';

type Slide = (typeof bannerSlides)[number];

const BANNER_RATIO = 369 / 176;

export function BannerCarousel() {
  const listRef = useRef<FlatList<Slide>>(null);
  const reduced = useReducedMotion();
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(true);
  const [dragging, setDragging] = useState(false);
  const indexRef = useRef(0);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, []),
  );

  useEffect(() => {
    if (width <= 0 || reduced || !focused || dragging) return;
    const timer = setInterval(() => {
      const next = (indexRef.current + 1) % bannerSlides.length;
      indexRef.current = next;
      setIndex(next);
      listRef.current?.scrollToOffset({ offset: next * width, animated: true });
    }, 4000);
    return () => clearInterval(timer);
  }, [dragging, focused, reduced, width]);

  const onEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setDragging(false);
    if (width <= 0) return;
    const next = Math.round(event.nativeEvent.contentOffset.x / width);
    const clamped = Math.min(bannerSlides.length - 1, Math.max(0, next));
    indexRef.current = clamped;
    setIndex(clamped);
  };

  return (
    <View onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
      {width > 0 ? (
        <FlatList
          ref={listRef}
          data={bannerSlides}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          snapToInterval={width}
          snapToAlignment="start"
          decelerationRate="fast"
          disableIntervalMomentum
          showsHorizontalScrollIndicator={false}
          getItemLayout={(_, itemIndex) => ({ length: width, offset: width * itemIndex, index: itemIndex })}
          onScrollBeginDrag={() => setDragging(true)}
          onMomentumScrollEnd={onEnd}
          accessibilityLabel="Banner khuyến mãi"
          renderItem={({ item }) => (
            <View style={{ width, height: width / BANNER_RATIO }}>
              {item.kind === 'image' ? (
                <AppImage source={item.image} contentFit="cover" containerStyle={styles.image} />
              ) : (
                <LinearGradient colors={item.colors} style={styles.promo}>
                  <View style={styles.promoCopy}>
                    <AppText style={styles.eyebrow}>{item.eyebrow}</AppText>
                    <AppText style={styles.promoTitle}>{item.title}</AppText>
                    <AppText style={styles.note}>{item.note}</AppText>
                  </View>
                  <AppImage source={item.image} contentFit="contain" containerStyle={styles.promoImage} />
                </LinearGradient>
              )}
            </View>
          )}
        />
      ) : (
        <View style={styles.placeholder} />
      )}
      <View style={styles.dots}>
        {bannerSlides.map((slide, dotIndex) => (
          <View key={slide.id} style={[styles.dot, dotIndex === index && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    aspectRatio: BANNER_RATIO,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: radius.sm,
  },
  promo: {
    height: '100%',
    borderRadius: radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    overflow: 'hidden',
  },
  promoCopy: {
    flex: 1,
    gap: spacing.xxs,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.white,
  },
  promoTitle: {
    fontFamily: typography.h3.fontFamily,
    fontSize: 28,
    lineHeight: 32,
    color: colors.white,
  },
  note: {
    ...typography.small,
    color: colors.white,
  },
  promoImage: {
    width: 120,
    height: 120,
    backgroundColor: 'transparent',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  dot: {
    width: 10,
    height: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.grey[400],
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.brand[600],
  },
});
