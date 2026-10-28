import { memo } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import type { ImageContentFit, ImageSource } from 'expo-image';

import { AppImage } from '@/components/ui/AppImage';
import { PressableScale } from '@/components/ui/PressableScale';
import { radius, shadows } from '@/theme';

type Props = {
  source: ImageSource;
  label: string;
  style?: StyleProp<ViewStyle>;
  contentFit?: ImageContentFit;
  onPress?: () => void;
};

function HighlightBannerComponent({ source, label, style, contentFit = 'cover', onPress }: Props) {
  return (
    <PressableScale
      fill
      onPress={onPress}
      accessibilityLabel={label}
      style={[styles.card, shadows.soft, style]}
    >
      <AppImage source={source} contentFit={contentFit} containerStyle={styles.image} />
    </PressableScale>
  );
}

export const HighlightBanner = memo(HighlightBannerComponent);

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFill,
    borderRadius: radius.md,
  },
});
