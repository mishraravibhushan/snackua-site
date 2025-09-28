import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import Card from '../components/Card';
import HeroSection from '../components/HeroSection';
import howWeMakeContent from '../content/how-we-make.json';
import { colors, spacing, typography } from '../styles/theme';

export default function HowWeMakeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar 
        title="How We Make" 
        showBackButton 
        onBackPress={() => router.back()} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeroSection
          title={howWeMakeContent.title}
          subtitle={howWeMakeContent.subtitle}
        />
        
        <View style={styles.content}>
          {howWeMakeContent.process.map((step, index) => (
            <Card key={index} style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.step}</Text>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
              </View>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </Card>
          ))}
          
          <Card style={styles.qualityCard}>
            <Text style={styles.qualityTitle}>Quality Assurance</Text>
            <View style={styles.qualityList}>
              {howWeMakeContent.qualityAssurance.map((item, index) => (
                <View key={index} style={styles.qualityItem}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                  <Text style={styles.qualityText}>{item}</Text>
                </View>
              ))}
            </View>
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
  stepCard: {
    marginBottom: spacing.lg,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  stepNumberText: {
    ...typography.h4,
    color: colors.white,
    fontWeight: 'bold',
  },
  stepTitle: {
    ...typography.h4,
    flex: 1,
  },
  stepDescription: {
    ...typography.body,
    lineHeight: 24,
    marginLeft: 48, // Align with text after step number
  },
  qualityCard: {
    marginBottom: spacing.lg,
  },
  qualityTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  qualityList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  qualityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: spacing.sm,
  },
  qualityText: {
    ...typography.bodySmall,
    marginLeft: spacing.sm,
    flex: 1,
  },
});
