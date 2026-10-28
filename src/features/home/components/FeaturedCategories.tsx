import { createContext, useContext, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ImageSource } from 'expo-image';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';

import { AppImage } from '@/components/ui/AppImage';
import { AppText } from '@/components/ui/AppText';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, radius, spacing, typography } from '@/theme';

const THUMB_TRAVEL = 36;

const ProgressContext = createContext<SharedValue<number> | null>(null);

function useProgress() {
  const progress = useContext(ProgressContext);
  if (!progress) throw new Error('FeaturedCategories.* phải nằm trong FeaturedCategories');
  return progress;
}

function Root({ children }: { children: ReactNode }) {
  const progress = useSharedValue(0);
  return (
    <ProgressContext.Provider value={progress}>
      <View style={styles.root}>{children}</View>
    </ProgressContext.Provider>
  );
}

function Title({ children }: { children: string }) {
  return (
    <AppText style={styles.title} accessibilityRole="header">
      {children}
    </AppText>
  );
}

function List({ children }: { children: ReactNode }) {
  const progress = useProgress();
  const onScroll = useAnimatedScrollHandler((event) => {
    const max = event.contentSize.width - event.layoutMeasurement.width;
    progress.value = max <= 0 ? 0 : event.contentOffset.x / max;
  });

  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
      contentContainerStyle={styles.list}
    >
      {children}
    </Animated.ScrollView>
  );
}

type ChipProps = {
  name: string;
  image: ImageSource;
  onPress?: () => void;
};

function Chip({ name, image, onPress }: ChipProps) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={name} style={styles.chip}>
      <View style={styles.chipBody}>
        <AppImage
          source={image}
          contentFit="contain"
          contentPosition="center"
          containerStyle={styles.chipImage}
        />
        <AppText style={styles.chipName} numberOfLines={2}>
          {name}
        </AppText>
      </View>
    </PressableScale>
  );
}

function Slider() {
  const progress = useProgress();
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: Math.min(1, Math.max(0, progress.value)) * THUMB_TRAVEL }],
  }));

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={styles.track}
    >
      <Animated.View style={[styles.thumb, thumbStyle]} />
    </Animated.View>
  );
}

export const FeaturedCategories = Object.assign(Root, { Title, List, Chip, Slider });

const styles = StyleSheet.create({
  root: {
    gap: spacing.md,
  },
  title: {
    ...typography.h3,
    color: colors.brand[800],
  },
  list: {
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  chip: {
    width: 79,
    height: 98,
    backgroundColor: colors.white,
    borderRadius: radius.sm,
  },
  chipBody: {
    width: 79,
    height: 98,
    alignItems: 'center',
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.xxs,
  },
  chipImage: {
    width: 52,
    height: 52,
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  chipName: {
    ...typography.caption,
    color: colors.text.primary,
    textAlign: 'center',
    width: '100%',
    marginTop: spacing.xs,
    height: typography.caption.lineHeight * 2,
  },
  track: {
    width: 60,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.grey[300],
    alignSelf: 'center',
    justifyContent: 'center',
  },
  thumb: {
    width: 24,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.brand[600],
  },
});
