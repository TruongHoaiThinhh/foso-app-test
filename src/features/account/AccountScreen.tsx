import { Pressable, StyleSheet, View } from 'react-native';
import { ChevronRight, MapPin, Package, Settings, Ticket } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/AppText';
import { useStatusBarStyle } from '@/hooks/useStatusBarStyle';
import { colors, radius, spacing, typography } from '@/theme';

const ROWS: { label: string; icon: LucideIcon }[] = [
  { label: 'Đơn hàng của tôi', icon: Package },
  { label: 'Địa chỉ nhận hàng', icon: MapPin },
  { label: 'Voucher', icon: Ticket },
  { label: 'Cài đặt', icon: Settings },
];

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  useStatusBarStyle('dark');

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <AppText style={styles.avatarText}>F</AppText>
        </View>
        <View>
          <AppText style={styles.name}>Khách FOSO</AppText>
          <AppText style={styles.phone}>0900 000 000</AppText>
        </View>
      </View>
      <View style={styles.card}>
        {ROWS.map((row, index) => {
          const Icon = row.icon;
          return (
            <Pressable
              key={row.label}
              accessibilityRole="button"
              accessibilityLabel={row.label}
              style={({ pressed }) => [styles.row, index < ROWS.length - 1 && styles.divider, pressed && styles.pressed]}
            >
              <Icon color={colors.brand[600]} size={22} strokeWidth={2} />
              <AppText style={styles.rowText}>{row.label}</AppText>
              <ChevronRight color={colors.text.disabled} size={18} strokeWidth={2} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.grey[100],
    paddingHorizontal: spacing.md,
    gap: spacing.lg,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.lg,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.brand[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.h3,
    color: colors.white,
  },
  name: {
    ...typography.title,
    color: colors.text.primary,
  },
  phone: {
    ...typography.caption,
    color: colors.text.muted,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  row: {
    height: 56,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey[300],
  },
  pressed: {
    backgroundColor: colors.grey[100],
  },
  rowText: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
});
