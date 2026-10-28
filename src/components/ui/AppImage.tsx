import { Image, type ImageProps, type ImageSource } from 'expo-image';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius } from '@/theme';

const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

type Props = Omit<ImageProps, 'source'> & {
  source: ImageSource;
  containerStyle?: StyleProp<ViewStyle>;
};

export function AppImage({ source, style, containerStyle, contentFit = 'cover', ...rest }: Props) {
  return (
    <View style={[styles.frame, containerStyle]}>
      <Image
        source={source}
        style={[StyleSheet.absoluteFill, style]}
        contentFit={contentFit}
        placeholder={{ blurhash: BLURHASH }}
        transition={200}
        recyclingKey={typeof source === 'number' ? String(source) : undefined}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    overflow: 'hidden',
    backgroundColor: colors.grey[100],
    borderRadius: radius.sm,
  },
});
