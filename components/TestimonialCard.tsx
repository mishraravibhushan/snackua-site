import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';
import PlaceholderImage from './PlaceholderImage';

interface TestimonialCardProps {
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

export default function TestimonialCard({ name, location, text, rating, image }: TestimonialCardProps) {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color={colors.secondary}
      />
    ));
  };

  const hasImage = image && !image.includes('placeholder');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {hasImage ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <PlaceholderImage
            width={50}
            height={50}
            icon="person-outline"
            text=""
            backgroundColor={colors.background}
          />
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.location}>{location}</Text>
          <View style={styles.rating}>{renderStars()}</View>
        </View>
      </View>
      <Text style={styles.text}>"{text}"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.md,
    marginBottom: spacing.md,
    minHeight: 180,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.h4,
    marginBottom: spacing.xs,
  },
  location: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  rating: {
    flexDirection: 'row',
  },
  text: {
    ...typography.body,
    fontStyle: 'italic',
    color: colors.text.primary,
    lineHeight: 24,
  },
});
