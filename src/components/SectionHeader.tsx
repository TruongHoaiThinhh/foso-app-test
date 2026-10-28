import { createContext, useContext, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { ChevronRight } from 'lucide-react-native';

import { AppText } from '@/components/ui/AppText';
import { PressableScale } from '@/components/ui/PressableScale';
import { colors, spacing, typography } from '@/theme';

type Tone = 'default' | 'onDark' | 'link' | 'danger';

const linkColors: Record<Tone, string> = {
  default: colors.text.muted,
  onDark: colors.white,
  link: colors.brand[500],
  danger: colors.error.dark,
};
type Mark = keyof typeof marks;

const marks = {
  hex: require('../../assets/icons/icon_thuonghieu.png'),
  thumb: require('../../assets/icons/icon_banchay.png'),
  star: require('../../assets/icons/icon_choban.png'),
  box: require('../../assets/icons/icon_hangmoive.png'),
  news: require('../../assets/icons/icon_baiviet.png'),
} as const;

const ToneContext = createContext<Tone>('default');

function Root({ tone = 'default', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <ToneContext.Provider value={tone}>
      <View style={styles.row}>{children}</View>
    </ToneContext.Provider>
  );
}

function Title({ mark, children }: { mark?: Mark; children: string }) {
  const tone = useContext(ToneContext);
  return (
    <View style={styles.titleWrap}>
      {mark ? <Image source={marks[mark]} style={styles.mark} contentFit="contain" /> : null}
      <AppText
        style={[styles.title, { color: tone === 'onDark' ? colors.white : colors.brand[800] }]}
        accessibilityRole="header"
      >
        {children}
      </AppText>
    </View>
  );
}

type SeeAllProps = {
  onPress: () => void;
  accessibilityLabel: string;
  label?: string;
  tone?: Tone;
  style?: StyleProp<ViewStyle>;
};

function SeeAll({ onPress, accessibilityLabel, label = 'Xem tất cả', tone, style }: SeeAllProps) {
  const contextTone = useContext(ToneContext);
  const color = linkColors[tone ?? contextTone];
  return (
    <PressableScale
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      hitSlop={12}
      style={style}
    >
      <View style={styles.link}>
        <AppText style={[styles.linkText, { color }]}>{label}</AppText>
        <ChevronRight color={color} size={14} strokeWidth={2} />
      </View>
    </PressableScale>
  );
}

export const SectionHeader = Object.assign(Root, { Title, SeeAll });

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    minHeight: 28,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  title: {
    ...typography.h3,
    flexShrink: 1,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  linkText: {
    ...typography.small,
  },
  mark: {
    width: 24,
    height: 24,
  },
});
