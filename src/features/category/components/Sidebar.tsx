import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ScrollViewInstance } from 'react-native';
import type { ImageSource } from 'expo-image';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { AppImage } from '@/components/ui/AppImage';
import { AppText } from '@/components/ui/AppText';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, fonts, radius, spacing, typography } from '@/theme';

export const SIDEBAR_WIDTH = 90;
export const SIDEBAR_ITEM_HEIGHT = 104;

type SidebarValue = { active: number; onSelect: (index: number) => void };

const SidebarContext = createContext<SidebarValue | null>(null);

function useSidebar() {
  const value = useContext(SidebarContext);
  if (!value) throw new Error('Sidebar.* phải nằm trong Sidebar');
  return value;
}

type RootProps = SidebarValue & {
  reveal: { index: number } | null;
  children: ReactNode;
};

function Root({ active, onSelect, reveal, children }: RootProps) {
  const reduced = useReducedMotion();
  const ref = useRef<ScrollViewInstance>(null);

  useEffect(() => {
    if (!reveal) return;
    ref.current?.scrollTo({
      y: Math.max(0, (reveal.index - 1) * SIDEBAR_ITEM_HEIGHT),
      animated: !reduced,
    });
  }, [reduced, reveal]);

  return (
    <SidebarContext.Provider value={{ active, onSelect }}>
      <ScrollView
        ref={ref}
        style={styles.sidebar}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        accessibilityRole="tablist"
      >
        {children}
      </ScrollView>
    </SidebarContext.Provider>
  );
}

function Indicator() {
  const { active } = useSidebar();
  const reduced = useReducedMotion();
  const position = useSharedValue(active);

  useEffect(() => {
    position.value = reduced
      ? active
      : withTiming(active, { duration: 220, easing: Easing.out(Easing.cubic) });
  }, [active, position, reduced]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value * SIDEBAR_ITEM_HEIGHT }],
  }));

  return (
    <Animated.View pointerEvents="none" style={[styles.indicator, style]}>
      <View style={[styles.corner, styles.cornerTop]}>
        <View style={styles.cornerTopFill} />
      </View>
      <View style={[styles.corner, styles.cornerBottom]}>
        <View style={styles.cornerBottomFill} />
      </View>
    </Animated.View>
  );
}

type ItemProps = {
  index: number;
  name: string;
  image: ImageSource;
  dimmed?: boolean;
};

function Item({ index, name, image, dimmed }: ItemProps) {
  const { active, onSelect } = useSidebar();
  const selected = index === active;
  return (
    <PressableScale
      onPress={() => onSelect(index)}
      accessibilityRole="tab"
      accessibilityLabel={name}
      accessibilityState={{ selected }}
      style={styles.item}
    >
      <View style={[styles.body, dimmed && styles.dimmed]}>
        <AppImage
          source={image}
          contentFit="contain"
          contentPosition="center"
          containerStyle={styles.image}
        />
        <AppText style={[styles.label, selected && styles.labelActive]} numberOfLines={2}>
          {name}
        </AppText>
      </View>
    </PressableScale>
  );
}

export const Sidebar = Object.assign(Root, { Indicator, Item });

const styles = StyleSheet.create({
  sidebar: {
    width: SIDEBAR_WIDTH,
    flexGrow: 0,
    backgroundColor: colors.brand[50],
    borderTopLeftRadius: radius.lg,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SIDEBAR_WIDTH,
    height: SIDEBAR_ITEM_HEIGHT,
    backgroundColor: colors.white,
  },
  corner: {
    position: 'absolute',
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: colors.white,
  },
  cornerTop: {
    top: -20,
  },
  cornerBottom: {
    bottom: -20,
  },
  cornerTopFill: {
    flex: 1,
    backgroundColor: colors.brand[50],
    borderBottomRightRadius: radius.lg,
  },
  cornerBottomFill: {
    flex: 1,
    backgroundColor: colors.brand[50],
    borderTopRightRadius: radius.lg,
  },
  item: {
    height: SIDEBAR_ITEM_HEIGHT,
    width: SIDEBAR_WIDTH,
  },
  body: {
    height: SIDEBAR_ITEM_HEIGHT,
    width: SIDEBAR_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
    gap: spacing.xs,
  },
  dimmed: {
    opacity: 0.4,
  },
  image: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
  },
  label: {
    ...typography.caption,
    alignSelf: 'stretch',
    color: colors.brand[700],
    textAlign: 'center',
  },
  labelActive: {
    fontFamily: fonts.semibold,
  },
});
