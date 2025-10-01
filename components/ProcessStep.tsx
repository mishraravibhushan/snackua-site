import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';
import PlaceholderImage from './PlaceholderImage';

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  image: string;
  isLast?: boolean;
}

export default function ProcessStep({ step, title, description, image, isLast = false }: ProcessStepProps) {
  const hasImage = image && !image.includes('placeholder');

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepText}>{step}</Text>
        </View>
        {!isLast && <View style={styles.connector} />}
      </View>
      <View style={styles.content}>
        {hasImage ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <PlaceholderImage
            width={250}
            height={250}
            icon="camera-outline"
            text={`Process ${step}\n(600x400px)`}
            backgroundColor={colors.background}
          />
        )}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  stepContainer: {
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  stepText: {
    ...typography.h4,
    color: colors.white,
    fontWeight: 'bold',
  },
  connector: {
    width: 2,
    height: 100,
    backgroundColor: colors.accent,
    marginTop: spacing.sm,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h4,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    color: colors.text.secondary,
  },
});
