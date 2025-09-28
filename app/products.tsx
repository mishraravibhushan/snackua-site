import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppBar from '../components/AppBar';
import Card from '../components/Card';
import HeroSection from '../components/HeroSection';
import CTAButton from '../components/CTAButton';
import productsContent from '../content/products.json';
import { colors, spacing, typography } from '../styles/theme';

export default function ProductsScreen() {
  const handleOrderPress = () => {
    // This would typically open WhatsApp or navigate to contact page
    console.log('Order button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar 
        title="Products" 
        showBackButton 
        onBackPress={() => router.back()} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeroSection
          title={productsContent.title}
          subtitle={productsContent.subtitle}
        />
        
        <View style={styles.content}>
          {productsContent.products.map((product, index) => (
            <Card key={index} style={styles.productCard}>
              <View style={styles.productHeader}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
              
              <Text style={styles.productDescription}>
                {product.description}
              </Text>
              
              <View style={styles.productDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Weight:</Text>
                  <Text style={styles.detailValue}>{product.weight}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Servings:</Text>
                  <Text style={styles.detailValue}>{product.servings}</Text>
                </View>
              </View>
              
              <View style={styles.nutritionSection}>
                <Text style={styles.sectionTitle}>Nutrition (per 100g)</Text>
                <View style={styles.nutritionGrid}>
                  {Object.entries(product.nutrition.per100g).map(([key, value]) => (
                    <View key={key} style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>{key}:</Text>
                      <Text style={styles.nutritionValue}>{value}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.allergensSection}>
                <Text style={styles.allergensTitle}>Allergens:</Text>
                <Text style={styles.allergensText}>{product.allergens}</Text>
              </View>
              
              <View style={styles.ingredientsSection}>
                <Text style={styles.ingredientsTitle}>Ingredients:</Text>
                <Text style={styles.ingredientsText}>{product.ingredients}</Text>
              </View>
              
              <CTAButton
                title="Order Now"
                onPress={handleOrderPress}
                variant="whatsapp"
                icon="logo-whatsapp"
                style={styles.orderButton}
              />
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
  productCard: {
    marginBottom: spacing.lg,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  productName: {
    ...typography.h3,
    flex: 1,
  },
  productPrice: {
    ...typography.h4,
    color: colors.primary,
  },
  productDescription: {
    ...typography.body,
    marginBottom: spacing.md,
    lineHeight: 24,
  },
  productDetails: {
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  detailLabel: {
    ...typography.bodySmall,
    fontWeight: '600',
  },
  detailValue: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  nutritionSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  nutritionLabel: {
    ...typography.bodySmall,
    fontWeight: '500',
  },
  nutritionValue: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  allergensSection: {
    marginBottom: spacing.lg,
  },
  allergensTitle: {
    ...typography.bodySmall,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  allergensText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  ingredientsSection: {
    marginBottom: spacing.lg,
  },
  ingredientsTitle: {
    ...typography.bodySmall,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  ingredientsText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  orderButton: {
    marginTop: spacing.md,
  },
});
