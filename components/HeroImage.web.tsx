import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';
import PlaceholderImage from './PlaceholderImage';

interface HeroImageProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  backgroundImage: string;
  logo?: string;
  onCTAPress: () => void;
}

export default function HeroImage({ 
  title, 
  subtitle, 
  description, 
  ctaText, 
  backgroundImage, 
  logo,
  onCTAPress 
}: HeroImageProps) {
  // Check if background image exists, otherwise use placeholder
  const hasImage = backgroundImage && !backgroundImage.includes('placeholder');
  
  // Debug logging
  console.log('HeroImage - backgroundImage:', backgroundImage);
  console.log('HeroImage - hasImage:', hasImage);
  
  if (!hasImage) {
    return (
      <View style={styles.placeholderContainer}>
        <PlaceholderImage
          width={400}
          height={300}
          icon="image-outline"
          text="Hero Banner Image\n(1920x1080px)"
          backgroundColor={colors.primary}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={onCTAPress}>
            <Ionicons name="logo-whatsapp" size={20} color={colors.white} />
            <Text style={styles.ctaText}>{ctaText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <div 
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <View style={styles.overlay}>
        <View style={styles.content}>
          {logo && (
            <img 
              src={logo} 
              alt="Snackua Logo" 
              style={styles.logo}
            />
          )}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={onCTAPress}>
            <Ionicons name="logo-whatsapp" size={20} color={colors.white} />
            <Text style={styles.ctaText}>{ctaText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 500,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay for better text contrast
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  placeholderContainer: {
    height: 500,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: spacing.xl,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    maxWidth: 600,
  },
  logo: {
    width: 150, // Increased logo size for better prominence
    height: 150, // Increased logo size for better prominence
    marginBottom: spacing.md, // Reduced spacing to bring text closer
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))', // Add shadow to logo
  },
  title: {
    ...typography.hero,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // Stronger shadow for better contrast
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    fontWeight: 'bold', // Make title bolder
  },
  subtitle: {
    ...typography.h3,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // Stronger shadow for better contrast
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontWeight: '600', // Make subtitle bolder
  },
  description: {
    ...typography.lead,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xl,
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // Stronger shadow for better contrast
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
    fontWeight: '500', // Make description bolder
    lineHeight: 28, // Better line height for readability
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
  ctaText: {
    ...typography.button,
    marginLeft: spacing.sm,
  },
});
