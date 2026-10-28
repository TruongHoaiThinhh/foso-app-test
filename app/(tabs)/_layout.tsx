import { Tabs } from 'expo-router';

import { BottomTabBar } from '@/components/BottomTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Trang chủ' }} />
      <Tabs.Screen name="cart" options={{ title: 'Giỏ hàng' }} />
      <Tabs.Screen name="category" options={{ title: 'Danh mục' }} />
      <Tabs.Screen name="news" options={{ title: 'Tin tức' }} />
      <Tabs.Screen name="account" options={{ title: 'Tài khoản' }} />
    </Tabs>
  );
}
