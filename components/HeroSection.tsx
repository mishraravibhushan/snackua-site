import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors, fonts, spacing, typography } from '../styles/theme';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function HeroSection({ 
  title, 
  subtitle, 
  description, 
  children 
}: HeroSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    maxWidth: 600,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.h3,
    textAlign: 'center',
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    color: colors.text.secondary,
    lineHeight: 24,
  },
});
