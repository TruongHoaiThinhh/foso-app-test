import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Zap } from 'lucide-react-native';
import Animated from 'react-native-reanimated';

import { AppText } from '@/components/ui/AppText';
import { images } from '@/mocks/images';
import { colors, spacing, typography } from '@/theme';
import { CountdownTimer } from './CountdownTimer';

type FlashSaleValue = { deadline: number; end: () => void };

const FlashSaleContext = createContext<FlashSaleValue | null>(null);

function useFlashSale() {
  const value = useContext(FlashSaleContext);
  if (!value) throw new Error('FlashSale.* phải nằm trong FlashSale');
  return value;
}

type RootProps = {
  deadline: number;
  entering?: ComponentProps<typeof Animated.View>['entering'];
  children: ReactNode;
};

function Root({ deadline, entering, children }: RootProps) {
  const [live, setLive] = useState(() => Date.now() < deadline);
  const end = useCallback(() => setLive(false), []);

  if (!live) return null;

  return (
    <FlashSaleContext.Provider value={{ deadline, end }}>
      <Animated.View entering={entering} style={styles.section}>
        <Image
          source={images.flashSaleBg}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          pointerEvents="none"
        />
        {children}
      </Animated.View>
    </FlashSaleContext.Provider>
  );
}

function Header({ children }: { children: ReactNode }) {
  return <View style={styles.header}>{children}</View>;
}

function Title() {
  return (
    <View style={styles.title}>
      <Zap color={colors.warning.main} fill={colors.warning.main} size={18} strokeWidth={2} />
      <AppText style={styles.label}>FLASH SALE</AppText>
    </View>
  );
}

function Countdown() {
  const { deadline, end } = useFlashSale();
  return <CountdownTimer deadline={deadline} onEnd={end} />;
}

export const FlashSale = Object.assign(Root, { Header, Title, Countdown });

const styles = StyleSheet.create({
  section: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  label: {
    ...typography.bodyBold,
    color: colors.text.primary,
  },
});
