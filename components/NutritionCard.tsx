import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';
import { useTypography } from '../styles/responsive';

interface NutritionCardProps {
  icon: string;
  title: string;
  value: string;
  description: string;
  style?: StyleProp<ViewStyle>;
}

export default function NutritionCard({ icon, title, value, description, style }: NutritionCardProps) {
  const type = useTypography();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={24} color={colors.primary} />
      </View>
      <Text style={[type.h4, styles.title]}>{title}</Text>
      <Text style={[type.h3, styles.value]}>{value}</Text>
      <Text style={[type.bodySmall, styles.description]}>{description}</Text>
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
    minHeight: 160,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  value: {
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    textAlign: 'center',
    color: colors.text.secondary,
  },
});
