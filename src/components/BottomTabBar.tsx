import { useEffect, type ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import type { LucideIcon } from 'lucide-react-native';
import { Home, LayoutGrid, Newspaper, ShoppingCart, UserRound } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { AppText } from '@/components/ui/AppText';
import { PressableScale } from '@/components/ui/PressableScale';
import { useCart } from '@/state/cart';
import { colors, fonts, radius, typography } from '@/theme';

const ICONS: Record<string, LucideIcon> = {
  index: Home,
  cart: ShoppingCart,
  category: LayoutGrid,
  news: Newspaper,
  account: UserRound,
};

const TAB_HEIGHT = 52;
const INDICATOR_WIDTH = 50;

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

export function BottomTabBar({ state, descriptors, navigateToTab, emitter }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const reduced = useReducedMotion();
  const { count, bump } = useCart();
  const bottom = Math.max(insets.bottom, 8);
  const index = useSharedValue(state.index);
  const barWidth = useSharedValue(0);

  useEffect(() => {
    index.value = reduced
      ? state.index
      : withTiming(state.index, { duration: 180, easing: Easing.out(Easing.cubic) });
  }, [index, reduced, state.index]);

  const indicator = useAnimatedStyle(() => {
    const count = Math.max(1, state.routes.length);
    const slot = barWidth.value / count;
    return {
      transform: [{ translateX: index.value * slot + (slot - INDICATOR_WIDTH) / 2 }],
    };
  });

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bump.value }],
  }));

  return (
    <View style={[styles.bar, { paddingBottom: bottom }]}>
      <View
        style={styles.tabs}
        onLayout={(event) => {
          barWidth.value = event.nativeEvent.layout.width;
        }}
      >
        <Animated.View pointerEvents="none" style={[styles.indicatorSlot, indicator]} />
        {state.routes.map((route, routeIndex) => {
          const focused = state.index === routeIndex;
          const tint = focused ? colors.brand[600] : colors.greyscale[400];
          const options = descriptors[route.key]?.options;
          const label = options?.title ?? route.name;
          const Icon = ICONS[route.name] ?? Home;
          return (
            <PressableScale
              key={route.key}
              onPress={() => {
                const event = emitter.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!focused && !event.defaultPrevented) navigateToTab(route.key);
              }}
              onLongPress={() => emitter.emit({ type: 'tabLongPress', target: route.key })}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={label}
              style={styles.item}
            >
              <View style={styles.itemInner}>
                <View style={styles.iconWrap}>
                  <Icon color={tint} size={22} strokeWidth={focused ? 2.25 : 1.75} />
                  {route.name === 'cart' && count > 0 ? (
                    <Animated.View style={[styles.badge, badgeStyle]}>
                      <AppText style={styles.badgeText}>{count > 99 ? '99+' : String(count)}</AppText>
                    </Animated.View>
                  ) : null}
                </View>
                <AppText style={[styles.label, { color: tint }, focused && styles.labelActive]}>{label}</AppText>
              </View>
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.grey[300],
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    overflow: 'hidden',
  },
  tabs: {
    height: TAB_HEIGHT,
    flexDirection: 'row',
  },
  indicatorSlot: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: INDICATOR_WIDTH,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.brand[600],
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInner: {
    alignItems: 'center',
    gap: 2,
  },
  iconWrap: {
    width: 28,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.small,
    color: colors.greyscale[400],
  },
  labelActive: {
    fontFamily: fonts.semibold,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 3,
    backgroundColor: colors.error.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    ...typography.tiny,
    color: colors.white,
  },
});
