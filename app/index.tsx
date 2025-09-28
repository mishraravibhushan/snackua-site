import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Import content data
import homeContent from '../content/home.json';
import { colors, fonts, spacing, borderRadius, shadows } from '../styles/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>Snackua</Text>
            <Text style={styles.tagline}>{homeContent.tagline}</Text>
          </View>
          
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsText}>
              {homeContent.benefits.map((benefit, index) => (
                <Text key={index} style={styles.benefitItem}>
                  {benefit}{index < homeContent.benefits.length - 1 ? ' • ' : ''}
                </Text>
              ))}
            </Text>
          </View>
        </View>

        {/* Navigation Cards */}
        <View style={styles.navigationContainer}>
          <Link href="/our-story" style={styles.navCard}>
            <View style={styles.card}>
              <Ionicons name="book-outline" size={32} color="#8B4513" />
              <Text style={styles.cardTitle}>Our Story</Text>
              <Text style={styles.cardDescription}>Heritage meets modern twist</Text>
            </View>
          </Link>

          <Link href="/ingredients" style={styles.navCard}>
            <View style={styles.card}>
              <Ionicons name="leaf-outline" size={32} color="#8B4513" />
              <Text style={styles.cardTitle}>Ingredients</Text>
              <Text style={styles.cardDescription}>100% natural goodness</Text>
            </View>
          </Link>

          <Link href="/products" style={styles.navCard}>
            <View style={styles.card}>
              <Ionicons name="cube-outline" size={32} color="#8B4513" />
              <Text style={styles.cardTitle}>Products</Text>
              <Text style={styles.cardDescription}>Our healthy cookies</Text>
            </View>
          </Link>

          <Link href="/why-jaggery" style={styles.navCard}>
            <View style={styles.card}>
              <Ionicons name="heart-outline" size={32} color="#8B4513" />
              <Text style={styles.cardTitle}>Why Jaggery</Text>
              <Text style={styles.cardDescription}>The sweet truth</Text>
            </View>
          </Link>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to taste the difference?</Text>
          <Link href="/contact" style={styles.ctaButton}>
            <View style={styles.button}>
              <Ionicons name="logo-whatsapp" size={24} color="#FFFFFF" />
              <Text style={styles.buttonText}>Order on WhatsApp</Text>
            </View>
          </Link>
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
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: fonts.heading,
    marginBottom: spacing.sm,
  },
  tagline: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
    fontFamily: fonts.body,
    fontWeight: '500',
  },
  benefitsContainer: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    ...shadows.md,
  },
  benefitsText: {
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    fontFamily: fonts.body,
    fontWeight: '600',
  },
  benefitItem: {
    color: colors.primary,
  },
  navigationContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  navCard: {
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.md,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    fontFamily: fonts.heading,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    fontFamily: fonts.body,
  },
  ctaSection: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontFamily: fonts.heading,
  },
  ctaButton: {
    textDecorationLine: 'none',
  },
  button: {
    backgroundColor: colors.whatsapp,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.lg,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
    fontFamily: fonts.button,
  },
});
