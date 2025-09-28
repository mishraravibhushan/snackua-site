import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppBar from '../components/AppBar';
import Card from '../components/Card';
import HeroSection from '../components/HeroSection';
import ourStoryContent from '../content/our-story.json';
import { colors, spacing, typography } from '../styles/theme';

export default function OurStoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar 
        title="Our Story" 
        showBackButton 
        onBackPress={() => router.back()} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeroSection
          title={ourStoryContent.title}
          subtitle={ourStoryContent.subtitle}
        />
        
        <View style={styles.content}>
          {ourStoryContent.sections.map((section, index) => (
            <Card key={index} style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </Card>
          ))}
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
  sectionCard: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  sectionContent: {
    ...typography.body,
    lineHeight: 24,
  },
});
