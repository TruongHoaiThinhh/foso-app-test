import { StyleSheet, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';
import { Camera, Search } from 'lucide-react-native';

import { colors, radius, spacing, typography } from '@/theme';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  accessibilityLabel?: string;
};

export function SearchBar({
  value,
  onChangeText,
  style,
  placeholder = 'Tìm kiếm sản phẩm',
  accessibilityLabel = 'Tìm kiếm sản phẩm',
}: Props) {
  return (
    <View style={[styles.bar, style]}>
      <Search color={colors.text.disabled} size={18} strokeWidth={2} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.disabled}
        style={styles.input}
        accessibilityLabel={accessibilityLabel}
        returnKeyType="search"
        maxFontSizeMultiplier={1.3}
        clearButtonMode="while-editing"
      />
      <Camera color={colors.text.disabled} size={18} strokeWidth={2} />
    </View>
  );
}

const BAR_HEIGHT = 36;

const styles = StyleSheet.create({
  bar: {
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    height: BAR_HEIGHT,
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    letterSpacing: typography.body.letterSpacing,
    color: colors.text.primary,
    padding: 0,
    margin: 0,
    textAlignVertical: 'center',
  },
});
