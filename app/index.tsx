import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Import content data
import homeContent from '../content/home.json';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';

// Import components
import HeroImage from '../components/HeroImage';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import ProcessStep from '../components/ProcessStep';
import NutritionCard from '../components/NutritionCard';

export default function HomeScreen() {
  const handleWhatsAppPress = () => {
    Linking.openURL(homeContent.cta.whatsappLink);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <HeroImage
          title={homeContent.hero.title}
          subtitle={homeContent.hero.subtitle}
          description={homeContent.hero.description}
          ctaText={homeContent.hero.cta}
          backgroundImage={homeContent.hero.backgroundImage}
          onCTAPress={handleWhatsAppPress}
        />

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Snackua?</Text>
          <View style={styles.featuresGrid}>
            {homeContent.features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </View>
        </View>

        {/* Process Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How We Make Our Cookies</Text>
          <View style={styles.processContainer}>
            {homeContent.process.map((step, index) => (
              <ProcessStep
                key={index}
                step={step.step}
                title={step.title}
                description={step.description}
                image={step.image}
                isLast={index === homeContent.process.length - 1}
              />
            ))}
          </View>
        </View>

        {/* Nutrition Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{homeContent.nutrition.title}</Text>
          <View style={styles.nutritionGrid}>
            {homeContent.nutrition.highlights.map((highlight, index) => (
              <NutritionCard
                key={index}
                icon={highlight.icon}
                title={highlight.title}
                value={highlight.value}
                description={highlight.description}
              />
            ))}
          </View>
        </View>

        {/* Testimonials Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Our Customers Say</Text>
          <View style={styles.testimonialsContainer}>
            {homeContent.testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                location={testimonial.location}
                text={testimonial.text}
                rating={testimonial.rating}
                image={testimonial.image}
              />
            ))}
          </View>
        </View>

        {/* Navigation Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore More</Text>
          <View style={styles.navigationContainer}>
            <Link href="/our-story" style={styles.navCard}>
              <View style={styles.card}>
                <Ionicons name="book-outline" size={32} color={colors.primary} />
                <Text style={styles.cardTitle}>Our Story</Text>
                <Text style={styles.cardDescription}>Heritage meets modern twist</Text>
              </View>
            </Link>

            <Link href="/ingredients" style={styles.navCard}>
              <View style={styles.card}>
                <Ionicons name="leaf-outline" size={32} color={colors.primary} />
                <Text style={styles.cardTitle}>Ingredients</Text>
                <Text style={styles.cardDescription}>100% natural goodness</Text>
              </View>
            </Link>

            <Link href="/products" style={styles.navCard}>
              <View style={styles.card}>
                <Ionicons name="cube-outline" size={32} color={colors.primary} />
                <Text style={styles.cardTitle}>Products</Text>
                <Text style={styles.cardDescription}>Our healthy cookies</Text>
              </View>
            </Link>

            <Link href="/why-jaggery" style={styles.navCard}>
              <View style={styles.card}>
                <Ionicons name="heart-outline" size={32} color={colors.primary} />
                <Text style={styles.cardTitle}>Why Jaggery</Text>
                <Text style={styles.cardDescription}>The sweet truth</Text>
              </View>
            </Link>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>{homeContent.cta.title}</Text>
          <Text style={styles.ctaDescription}>{homeContent.cta.description}</Text>
          <View style={styles.ctaButton} onTouchEnd={handleWhatsAppPress}>
            <Ionicons name="logo-whatsapp" size={24} color={colors.white} />
            <Text style={styles.buttonText}>{homeContent.cta.buttonText}</Text>
          </View>
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
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  sectionTitle: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  processContainer: {
    paddingHorizontal: spacing.md,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  testimonialsContainer: {
    paddingHorizontal: spacing.sm,
  },
  navigationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  navCard: {
    width: '48%',
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.md,
    minHeight: 140,
    justifyContent: 'center',
  },
  cardTitle: {
    ...typography.h4,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  cardDescription: {
    ...typography.bodySmall,
    textAlign: 'center',
  },
  ctaSection: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
    backgroundColor: colors.surface,
    marginTop: spacing.xl,
  },
  ctaTitle: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  ctaDescription: {
    ...typography.lead,
    textAlign: 'center',
    marginBottom: spacing.xl,
    maxWidth: 500,
  },
  ctaButton: {
    backgroundColor: colors.whatsapp,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.lg,
  },
  buttonText: {
    ...typography.button,
    marginLeft: spacing.sm,
  },
});
