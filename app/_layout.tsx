import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide the splash screen after the app is ready
    SplashScreen.hideAsync();
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
