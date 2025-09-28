import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide the splash screen after the app is ready
    SplashScreen.hideAsync();
    
    // Add web-specific meta tags
    if (Platform.OS === 'web') {
      // Add Google Fonts
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      
      // Add meta tags
      const metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = 'Snackua - Healthy jaggery cookies made with 100% natural ingredients. Zero maida, zero refined sugar. Order now on WhatsApp!';
      document.head.appendChild(metaDescription);
      
      const metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = 'healthy cookies, jaggery cookies, natural ingredients, zero maida, thekua, indian cookies, healthy snacking';
      document.head.appendChild(metaKeywords);
      
      const metaViewport = document.createElement('meta');
      metaViewport.name = 'viewport';
      metaViewport.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(metaViewport);
      
      // Add Open Graph tags
      const ogTitle = document.createElement('meta');
      ogTitle.property = 'og:title';
      ogTitle.content = 'Snackua - Healthy Jaggery Cookies';
      document.head.appendChild(ogTitle);
      
      const ogDescription = document.createElement('meta');
      ogDescription.property = 'og:description';
      ogDescription.content = 'Healthy jaggery cookies made with 100% natural ingredients. Zero maida, zero refined sugar. Order now on WhatsApp!';
      document.head.appendChild(ogDescription);
      
      const ogImage = document.createElement('meta');
      ogImage.property = 'og:image';
      ogImage.content = '/assets/og-image.jpg';
      document.head.appendChild(ogImage);
      
      const ogUrl = document.createElement('meta');
      ogUrl.property = 'og:url';
      ogUrl.content = 'https://snackua.in';
      document.head.appendChild(ogUrl);
      
      const ogType = document.createElement('meta');
      ogType.property = 'og:type';
      ogType.content = 'website';
      document.head.appendChild(ogType);
      
      // Add Twitter Card tags
      const twitterCard = document.createElement('meta');
      twitterCard.name = 'twitter:card';
      twitterCard.content = 'summary_large_image';
      document.head.appendChild(twitterCard);
      
      const twitterTitle = document.createElement('meta');
      twitterTitle.name = 'twitter:title';
      twitterTitle.content = 'Snackua - Healthy Jaggery Cookies';
      document.head.appendChild(twitterTitle);
      
      const twitterDescription = document.createElement('meta');
      twitterDescription.name = 'twitter:description';
      twitterDescription.content = 'Healthy jaggery cookies made with 100% natural ingredients. Zero maida, zero refined sugar. Order now on WhatsApp!';
      document.head.appendChild(twitterDescription);
      
      const twitterImage = document.createElement('meta');
      twitterImage.name = 'twitter:image';
      twitterImage.content = '/assets/og-image.jpg';
      document.head.appendChild(twitterImage);
    }
  }, []);

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
