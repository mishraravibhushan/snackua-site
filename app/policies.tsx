import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppBar from '../components/AppBar';
import Card from '../components/Card';
import HeroSection from '../components/HeroSection';
import policiesContent from '../content/policies.json';
import { colors, spacing, typography } from '../styles/theme';

export default function PoliciesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar 
        title="Policies" 
        showBackButton 
        onBackPress={() => router.back()} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeroSection
          title={policiesContent.title}
        />
        
        <View style={styles.content}>
          {policiesContent.sections.map((section, index) => (
            <Card key={index} style={styles.policyCard}>
              <View style={styles.policyHeader}>
                <Text style={styles.policyTitle}>{section.title}</Text>
                <Text style={styles.lastUpdated}>
                  Last updated: {section.lastUpdated}
                </Text>
              </View>
              <Text style={styles.policyContent}>{section.content}</Text>
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
  policyCard: {
    marginBottom: spacing.lg,
  },
  policyHeader: {
    marginBottom: spacing.md,
  },
  policyTitle: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  lastUpdated: {
    ...typography.bodySmall,
    color: colors.text.light,
    fontStyle: 'italic',
  },
  policyContent: {
    ...typography.body,
    lineHeight: 24,
  },
});
