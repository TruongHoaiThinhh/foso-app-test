import { StyleSheet, View } from 'react-native';
import { Check } from 'lucide-react-native';

import { colors, radius } from '@/theme';

export function CheckBox({ checked }: { checked: boolean }) {
  return (
    <View style={[styles.box, checked && styles.boxOn]}>
      {checked ? <Check color={colors.white} size={14} strokeWidth={3} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 22,
    height: 22,
    borderRadius: radius.xs,
    borderWidth: 1.5,
    borderColor: colors.grey[400],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  boxOn: {
    backgroundColor: colors.brand[600],
    borderColor: colors.brand[600],
  },
});
