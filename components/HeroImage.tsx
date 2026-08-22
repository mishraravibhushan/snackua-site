import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, fonts, minTouchTarget } from '../styles/theme';
import { useResponsiveValue } from '../styles/responsive';
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
  // Grows with the screen instead of a fixed 500px box.
  const minHeight = useResponsiveValue({ phone: 420, tablet: 500, desktop: 560 });
  const heroType = useResponsiveValue({
    phone: { title: 32, titleLine: 40, subtitle: 20, subtitleLine: 28, description: 16, descriptionLine: 24 },
    tablet: { title: 40, titleLine: 48, subtitle: 22, subtitleLine: 30, description: 17, descriptionLine: 26 },
    desktop: { title: 48, titleLine: 56, subtitle: 24, subtitleLine: 32, description: 18, descriptionLine: 28 },
  });

  const titleStyle = [styles.title, { fontSize: heroType.title, lineHeight: heroType.titleLine }];
  const subtitleStyle = [styles.subtitle, { fontSize: heroType.subtitle, lineHeight: heroType.subtitleLine }];
  const descriptionStyle = [
    styles.description,
    { fontSize: heroType.description, lineHeight: heroType.descriptionLine },
  ];

  if (!hasImage) {
    return (
      <View style={[styles.placeholderContainer, { minHeight }]}>
        <PlaceholderImage
          width={400}
          height={300}
          icon="image-outline"
          text="Hero Banner Image\n(1920x1080px)"
          backgroundColor={colors.primary}
        />
        <View style={styles.content}>
          <Text style={titleStyle}>{title}</Text>
          <Text style={subtitleStyle}>{subtitle}</Text>
          <Text style={descriptionStyle}>{description}</Text>
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
      <View style={[styles.background, { minHeight }]}>
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
            <Text style={titleStyle}>{title}</Text>
            <Text style={subtitleStyle}>{subtitle}</Text>
            <Text style={descriptionStyle}>{description}</Text>
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
      style={[styles.background, { minHeight }]}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={titleStyle}>{title}</Text>
          <Text style={subtitleStyle}>{subtitle}</Text>
          <Text style={descriptionStyle}>{description}</Text>
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: spacing.xl,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    maxWidth: 600,
    width: '100%',
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
    minHeight: minTouchTarget,
    borderRadius: borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  ctaText: {
    ...typography.button,
    marginLeft: spacing.sm,
  },
});
