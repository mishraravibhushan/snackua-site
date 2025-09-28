import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppBar from '../components/AppBar';
import Card from '../components/Card';
import HeroSection from '../components/HeroSection';
import nutritionContent from '../content/nutrition.json';
import { colors, spacing, typography } from '../styles/theme';

export default function NutritionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar 
        title="Nutrition" 
        showBackButton 
        onBackPress={() => router.back()} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeroSection
          title={nutritionContent.title}
          subtitle={nutritionContent.subtitle}
        />
        
        <View style={styles.content}>
          <Text style={styles.disclaimer}>{nutritionContent.disclaimer}</Text>
          
          {nutritionContent.tables.map((table, tableIndex) => (
            <Card key={tableIndex} style={styles.tableCard}>
              <Text style={styles.tableTitle}>{table.title}</Text>
              <View style={styles.nutritionTable}>
                {Object.entries(table.data).map(([key, value], index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableLabel}>{key}</Text>
                    <Text style={styles.tableValue}>{value}</Text>
                  </View>
                ))}
              </View>
            </Card>
          ))}
          
          <Card style={styles.benefitsCard}>
            <Text style={styles.benefitsTitle}>Key Benefits</Text>
            {nutritionContent.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Text style={styles.benefitBullet}>•</Text>
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
  disclaimer: {
    ...typography.bodySmall,
    fontStyle: 'italic',
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  tableCard: {
    marginBottom: spacing.lg,
  },
  tableTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  nutritionTable: {
    borderWidth: 1,
    borderColor: colors.text.light,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.text.light,
    backgroundColor: colors.white,
  },
  tableLabel: {
    ...typography.bodySmall,
    fontWeight: '500',
    flex: 1,
  },
  tableValue: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '600',
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
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  benefitBullet: {
    ...typography.body,
    color: colors.primary,
    marginRight: spacing.sm,
    marginTop: 2,
  },
  benefitText: {
    ...typography.body,
    flex: 1,
    lineHeight: 22,
  },
});
