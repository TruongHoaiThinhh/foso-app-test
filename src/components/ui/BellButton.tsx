import { StyleSheet, View } from 'react-native';
import { Bell } from 'lucide-react-native';

import { colors } from '@/theme';
import { PressableScale } from './PressableScale';

type Props = {
  onPress?: () => void;
};

export function BellButton({ onPress }: Props) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel="Thông báo" style={styles.button}>
      <View style={styles.glyph}>
        <Bell color={colors.white} size={28} strokeWidth={2} />
        <View style={styles.dot} />
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    width: 28,
    height: 28,
  },
  dot: {
    position: 'absolute',
    top: -1,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: colors.error.main,
    borderWidth: 1.5,
    borderColor: colors.brand[600],
  },
});
