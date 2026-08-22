import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';
import { useTypography } from '../styles/responsive';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  style?: StyleProp<ViewStyle>;
}

export default function FeatureCard({ icon, title, description, style }: FeatureCardProps) {
  const type = useTypography();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={32} color={colors.primary} />
      </View>
      <Text style={[type.h4, styles.title]}>{title}</Text>
      <Text style={[type.body, styles.description]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.md,
    marginBottom: spacing.md,
    minHeight: 200,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    textAlign: 'center',
    color: colors.text.secondary,
  },
});
