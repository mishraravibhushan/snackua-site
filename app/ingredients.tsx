import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import Card from '../components/Card';
import HeroSection from '../components/HeroSection';
import ingredientsContent from '../content/ingredients.json';
import { colors, spacing, typography } from '../styles/theme';

export default function IngredientsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar 
        title="Ingredients" 
        showBackButton 
        onBackPress={() => router.back()} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeroSection
          title={ingredientsContent.title}
          subtitle={ingredientsContent.subtitle}
        />
        
        <View style={styles.content}>
          {ingredientsContent.ingredients.map((ingredient, index) => (
            <Card key={index} style={styles.ingredientCard}>
              <View style={styles.ingredientHeader}>
                <Ionicons name="leaf" size={24} color={colors.primary} />
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
              </View>
              
              <Text style={styles.ingredientDescription}>
                {ingredient.description}
              </Text>
              
              <View style={styles.benefitsContainer}>
                <Text style={styles.benefitsTitle}>Benefits:</Text>
                {ingredient.benefits.map((benefit, benefitIndex) => (
                  <View key={benefitIndex} style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
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
  ingredientCard: {
    marginBottom: spacing.lg,
  },
  ingredientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ingredientName: {
    ...typography.h4,
    marginLeft: spacing.sm,
  },
  ingredientDescription: {
    ...typography.body,
    marginBottom: spacing.md,
    lineHeight: 24,
  },
  benefitsContainer: {
    marginTop: spacing.sm,
  },
  benefitsTitle: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  benefitText: {
    ...typography.bodySmall,
    marginLeft: spacing.xs,
    flex: 1,
  },
});
