import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, minTouchTarget } from '../styles/theme';
import { useResponsiveValue, useTypography } from '../styles/responsive';
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
  const type = useTypography();
  // Grows with the screen instead of a fixed 500px box, so the hero never
  // swallows a short phone viewport or leaves dead space on a wide one.
  const minHeight = useResponsiveValue({ phone: 420, tablet: 500, desktop: 560 });
  const logoSize = useResponsiveValue({ phone: 96, tablet: 130, desktop: 150 });

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
          <Text style={[type.hero, styles.title]}>{title}</Text>
          <Text style={[type.h3, styles.subtitle]}>{subtitle}</Text>
          <Text style={[type.lead, styles.description]}>{description}</Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={onCTAPress}
            accessibilityRole="button"
            accessibilityLabel={ctaText}
          >
            <Ionicons name="logo-whatsapp" size={20} color={colors.white} />
            <Text style={styles.ctaText}>{ctaText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
          {logo && (
            <img
              src={logo}
              alt="Snackua Logo"
              style={{ ...styles.logo, width: logoSize, height: logoSize }}
            />
          )}
          <Text style={[type.hero, styles.title]}>{title}</Text>
          <Text style={[type.h3, styles.subtitle]}>{subtitle}</Text>
          <Text style={[type.lead, styles.description]}>{description}</Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={onCTAPress}
            accessibilityRole="button"
            accessibilityLabel={ctaText}
          >
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: spacing.xl,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay for better text contrast
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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
  logo: {
    marginBottom: spacing.md, // Reduced spacing to bring text closer
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))', // Add shadow to logo
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // Stronger shadow for better contrast
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    fontWeight: 'bold', // Make title bolder
  },
  subtitle: {
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // Stronger shadow for better contrast
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontWeight: '600', // Make subtitle bolder
  },
  description: {
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xl,
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // Stronger shadow for better contrast
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
    fontWeight: '500', // Make description bolder
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
