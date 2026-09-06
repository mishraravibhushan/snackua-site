import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';
import { initMetaPixel, trackPixelPageView } from '../utils/metaPixel';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const pathname = usePathname();

  useEffect(() => {
    // Hide the splash screen after the app is ready
    SplashScreen.hideAsync();
    
    // Add web-specific meta tags
    if (Platform.OS === 'web') {
      // Add Google Fonts
      if (!document.querySelector('link[data-snackua-fonts]')) {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        link.setAttribute('data-snackua-fonts', '');
        document.head.appendChild(link);
      }

      // Title, description, Open Graph and Twitter tags used to be injected
      // here. They now live in app/+html.tsx instead, because link crawlers
      // do not run JavaScript and never saw them — every shared snackua.com
      // link previewed as a bare URL. Injecting them again from here would
      // only overwrite the static ones in real browsers.

      initMetaPixel();
    }
  }, []);

  // A separate effect keyed on the route: expo-router swaps screens without a
  // page load, so the pixel would otherwise only ever see the landing page.
  // Declared after the effect above so the base code is installed first.
  useEffect(() => {
    trackPixelPageView();
  }, [pathname]);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="our-story" />
        <Stack.Screen name="ingredients" />
        <Stack.Screen name="products" />
        <Stack.Screen name="nutrition" />
        <Stack.Screen name="why-jaggery" />
        <Stack.Screen name="how-we-make" />
        <Stack.Screen name="faqs" />
        <Stack.Screen name="contact" />
        <Stack.Screen name="policies" />
      </Stack>
    </SafeAreaProvider>
  );
}
