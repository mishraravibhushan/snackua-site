import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors, fonts, spacing, minTouchTarget } from '../styles/theme';

interface AppBarProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
}

export default function AppBar({ 
  title, 
  showBackButton = false, 
  onBackPress,
  rightComponent 
}: AppBarProps) {
  // Every screen in this app is reached from the home screen - index.tsx holds
  // the only navigation links - so "back" always means "home" here.
  //
  // We navigate home explicitly rather than calling router.back(). back() was
  // verified to be a no-op in this web build even with browser history present,
  // and it is a no-op by definition when the app boots straight onto a route,
  // which is the normal case on GitHub Pages: deep links, refreshes and shared
  // links all arrive through the 404.html SPA fallback with an empty stack.
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleBack}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.centerSection}>
          <Text style={styles.title}>{title}</Text>
        </View>
        
        <View style={styles.rightSection}>
          {rightComponent}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.text.light,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 56,
  },
  leftSection: {
    width: minTouchTarget,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: minTouchTarget,
    alignItems: 'flex-end',
  },
  backButton: {
    width: minTouchTarget,
    height: minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: fonts.heading,
    color: colors.text.primary,
    textAlign: 'center',
  },
});
