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

// Visually hidden, still announced by screen readers and read by crawlers.
const srOnly: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

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
          // Sized to the full width rather than `cover`. The hero box is nearly
          // square on a phone but very wide on a desktop, and `cover` solved that
          // by cropping the sides — which cut the wheat and the jaggery off the
          // mobile view entirely. Sizing by width keeps the whole composition
          // visible at every size and letterboxes instead; the bars are painted
          // by a gradient running between the banner's own top and bottom edge
          // colours, so the seams are invisible. On desktop this is identical to
          // `cover`, since there the image is already taller than the box.
          backgroundImage:
            `url(${backgroundImage}), ` +
            'linear-gradient(rgb(225, 192, 151) 0%, rgb(225, 192, 151) 30%, ' +
            'rgb(212, 174, 123) 70%, rgb(212, 174, 123) 100%)',
          backgroundSize: '100% auto, 100% 100%',
          backgroundPosition: 'center, center',
          backgroundRepeat: 'no-repeat, no-repeat',
        }}
      />
      <View style={styles.overlay}>
        <View style={styles.content}>
          {/* The banner artwork carries the wordmark and the product shot, so no
              copy is drawn over it. The heading still exists for screen readers
              and crawlers, just not visually. */}
          <h1 style={srOnly}>{`${title} \u2014 ${subtitle}`}</h1>
          <p style={srOnly}>{description}</p>
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
    // No scrim: nothing is drawn over the photo any more, so dimming it only
    // hurt the artwork. The CTA sits low so it clears the logo and the cookie.
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: spacing.xl,
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
