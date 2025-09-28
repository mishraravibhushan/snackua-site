import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppBar from '../components/AppBar';
import HeroSection from '../components/HeroSection';
import Accordion from '../components/Accordion';
import faqsContent from '../content/faqs.json';
import { colors, spacing } from '../styles/theme';

export default function FAQsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar 
        title="FAQs" 
        showBackButton 
        onBackPress={() => router.back()} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeroSection
          title={faqsContent.title}
          subtitle={faqsContent.subtitle}
        />
        
        <View style={styles.content}>
          <Accordion items={faqsContent.faqs} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
});
