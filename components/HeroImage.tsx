import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, fonts } from '../styles/theme';
import PlaceholderImage from './PlaceholderImage';

interface HeroImageProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  backgroundImage: string;
  onCTAPress: () => void;
}

export default function HeroImage({ 
  title, 
  subtitle, 
  description, 
  ctaText, 
  backgroundImage, 
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

  if (Platform.OS === 'web') {
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

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 500,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    borderRadius: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay for better text contrast
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
    fontSize: 48,
    fontWeight: 'bold' as const,
    fontFamily: fonts.heading,
    color: colors.white, // White text for better contrast
    textAlign: 'center',
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // Dark shadow for better contrast
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 56,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600' as const,
    fontFamily: fonts.heading,
    color: colors.white, // White text for better contrast
    textAlign: 'center',
    marginBottom: spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // Dark shadow for better contrast
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    lineHeight: 32,
  },
  description: {
    fontSize: 18,
    fontFamily: fonts.body,
    color: colors.white, // White text for better contrast
    textAlign: 'center',
    marginBottom: spacing.xl,
    textShadowColor: 'rgba(0, 0, 0, 0.7)', // Dark shadow for better contrast
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontWeight: '500',
    lineHeight: 28,
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
