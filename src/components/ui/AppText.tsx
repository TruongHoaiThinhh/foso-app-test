import { Text, type TextProps } from 'react-native';

export function AppText({ maxFontSizeMultiplier = 1.35, ...props }: TextProps) {
  return <Text maxFontSizeMultiplier={maxFontSizeMultiplier} {...props} />;
}
