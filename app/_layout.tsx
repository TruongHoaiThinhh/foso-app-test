import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  Epilogue_400Regular,
  Epilogue_500Medium,
  Epilogue_600SemiBold,
  Epilogue_700Bold,
  useFonts,
} from '@expo-google-fonts/epilogue';

import { CartProvider } from '@/state/cart';

SplashScreen.preventAutoHideAsync().catch(() => undefined);
SplashScreen.setOptions({ duration: 300, fade: true });

export default function RootLayout() {
  const [loaded] = useFonts({
    Epilogue_400Regular,
    Epilogue_500Medium,
    Epilogue_600SemiBold,
    Epilogue_700Bold,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync().catch(() => undefined);
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </CartProvider>
    </GestureHandlerRootView>
  );
}
