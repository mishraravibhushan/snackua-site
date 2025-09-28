import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import Card from '../components/Card';
import HeroSection from '../components/HeroSection';
import whyJaggeryContent from '../content/why-jaggery.json';
import { colors, spacing, typography } from '../styles/theme';

export default function WhyJaggeryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar 
        title="Why Jaggery" 
        showBackButton 
        onBackPress={() => router.back()} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeroSection
          title={whyJaggeryContent.title}
          subtitle={whyJaggeryContent.subtitle}
        />
        
        <View style={styles.content}>
          {whyJaggeryContent.sections.map((section, index) => (
            <Card key={index} style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </Card>
          ))}
          
          <Card style={styles.benefitsCard}>
            <Text style={styles.benefitsTitle}>Health Benefits of Jaggery</Text>
            {whyJaggeryContent.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </Card>
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
  benefitsCard: {
    marginBottom: spacing.lg,
  },
  benefitsTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  benefitText: {
    ...typography.body,
    marginLeft: spacing.sm,
    flex: 1,
    lineHeight: 22,
  },
});
