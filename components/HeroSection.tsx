import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/theme';
import { useTypography } from '../styles/responsive';

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
  const type = useTypography();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[type.h1, styles.title]}>{title}</Text>
        {subtitle && <Text style={[type.h3, styles.subtitle]}>{subtitle}</Text>}
        {description && <Text style={[type.body, styles.description]}>{description}</Text>}
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
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  description: {
    textAlign: 'center',
    color: colors.text.secondary,
  },
});
