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

      // Upsert so a remount updates the existing tag instead of appending a
      // duplicate. The viewport tag is intentionally absent — index.html
      // already ships one, and a second would override it.
      const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
        let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute(attr, key);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };

      const description =
        'Snackua - OG Thekua Clean Cookies. Zero maida, zero refined oil. Order now on WhatsApp!';
      const title = 'OG Thekua Baked Cookie';
      const image = '/assets/og-image.jpg';

      setMeta('name', 'description', description);
      setMeta('name', 'keywords', 'healthy cookies, palm jaggery cookies, natural ingredients, zero maida, thekua, indian cookies, healthy snacking');

      // Open Graph
      setMeta('property', 'og:title', title);
      setMeta('property', 'og:description', description);
      setMeta('property', 'og:image', image);
      setMeta('property', 'og:url', 'https://snackua.in');
      setMeta('property', 'og:type', 'website');

      // Twitter Card
      setMeta('name', 'twitter:card', 'summary_large_image');
      setMeta('name', 'twitter:title', title);
      setMeta('name', 'twitter:description', description);
      setMeta('name', 'twitter:image', image);

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
