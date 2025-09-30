import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import Card from '../components/Card';
import HeroSection from '../components/HeroSection';
import CTAButton from '../components/CTAButton';
import contactContent from '../content/contact.json';
import { colors, spacing, typography } from '../styles/theme';

export default function ContactScreen() {
  const handleWhatsAppPress = () => {
    const message = encodeURIComponent(contactContent.whatsapp.message);
    // Clean the phone number for WhatsApp (remove + and dashes)
    const cleanPhoneNumber = contactContent.whatsapp.number.replace(/[+\-\s]/g, '');
    
    // For Indian numbers, ensure proper formatting
    let formattedNumber = cleanPhoneNumber;
    if (cleanPhoneNumber.startsWith('91')) {
      // Already has country code
      formattedNumber = cleanPhoneNumber;
    } else if (cleanPhoneNumber.length === 10) {
      // Indian mobile number without country code
      formattedNumber = `91${cleanPhoneNumber}`;
    }
    
    const url = `whatsapp://send?phone=${formattedNumber}&text=${message}`;
    
    if (Platform.OS === 'web') {
      // For web, use the standard wa.me format
      const webUrl = `https://wa.me/${formattedNumber}?text=${message}`;
      Linking.openURL(webUrl);
    } else {
      // For mobile apps
      Linking.openURL(url);
    }
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${contactContent.email}`);
  };

  const handleSocialPress = (platform: string, handle: string) => {
    let url = '';
    switch (platform) {
      case 'instagram':
        url = `https://instagram.com/${handle}`;
        break;
      case 'facebook':
        url = `https://facebook.com/${handle}`;
        break;
    }
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar 
        title="Contact" 
        showBackButton 
        onBackPress={() => router.back()} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HeroSection
          title={contactContent.title}
          subtitle={contactContent.subtitle}
        />
        
        <View style={styles.content}>
          {/* WhatsApp CTA */}
          <Card style={styles.ctaCard}>
            <View style={styles.ctaHeader}>
              <Ionicons name="logo-whatsapp" size={32} color={colors.whatsapp} />
              <Text style={styles.ctaTitle}>Order on WhatsApp</Text>
            </View>
            <Text style={styles.ctaDescription}>
              Get in touch with us directly for orders, inquiries, or any questions.
            </Text>
            <CTAButton
              title={contactContent.whatsapp.buttonText}
              onPress={handleWhatsAppPress}
              variant="whatsapp"
              icon="logo-whatsapp"
              size="large"
              style={styles.whatsappButton}
            />
          </Card>

          {/* Contact Information */}
          <Card style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            
            <View style={styles.contactItem}>
              <Ionicons name="mail" size={20} color={colors.primary} />
              <Text 
                style={styles.contactText}
                onPress={handleEmailPress}
              >
                {contactContent.email}
              </Text>
            </View>
            
            <View style={styles.contactItem}>
              <Ionicons name="call" size={20} color={colors.primary} />
              <Text style={styles.contactText}>
                {contactContent.whatsapp.number}
              </Text>
            </View>
          </Card>

          {/* Social Media */}
          <Card style={styles.socialCard}>
            <Text style={styles.sectionTitle}>Follow Us</Text>
            <View style={styles.socialLinks}>
              <View 
                style={styles.socialItem}
                onTouchEnd={() => handleSocialPress('instagram', contactContent.socialMedia.instagram)}
              >
                <Ionicons name="logo-instagram" size={24} color="#E4405F" />
                <Text style={styles.socialText}>{contactContent.socialMedia.instagram}</Text>
              </View>
              
              <View 
                style={styles.socialItem}
                onTouchEnd={() => handleSocialPress('facebook', contactContent.socialMedia.facebook)}
              >
                <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                <Text style={styles.socialText}>{contactContent.socialMedia.facebook}</Text>
              </View>
            </View>
          </Card>

          {/* Business Hours */}
          <Card style={styles.hoursCard}>
            <Text style={styles.sectionTitle}>Business Hours</Text>
            <View style={styles.hoursItem}>
              <Text style={styles.hoursLabel}>Weekdays:</Text>
              <Text style={styles.hoursValue}>{contactContent.businessHours.weekdays}</Text>
            </View>
            <View style={styles.hoursItem}>
              <Text style={styles.hoursLabel}>Weekends:</Text>
              <Text style={styles.hoursValue}>{contactContent.businessHours.weekends}</Text>
            </View>
            <Text style={styles.timezoneText}>
              All times in {contactContent.businessHours.timezone}
            </Text>
          </Card>

          {/* Delivery Info */}
          <Card style={styles.deliveryCard}>
            <Text style={styles.sectionTitle}>Delivery Information</Text>
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryLabel}>Areas:</Text>
              <Text style={styles.deliveryValue}>{contactContent.deliveryInfo.areas}</Text>
            </View>
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryLabel}>Timeline:</Text>
              <Text style={styles.deliveryValue}>{contactContent.deliveryInfo.timeline}</Text>
            </View>
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryLabel}>Charges:</Text>
              <Text style={styles.deliveryValue}>{contactContent.deliveryInfo.charges}</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  ctaCard: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  ctaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ctaTitle: {
    ...typography.h3,
    marginLeft: spacing.sm,
  },
  ctaDescription: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  whatsappButton: {
    width: '100%',
  },
  infoCard: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  contactText: {
    ...typography.body,
    marginLeft: spacing.sm,
    color: colors.primary,
  },
  socialCard: {
    marginBottom: spacing.lg,
  },
  socialLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  socialItem: {
    alignItems: 'center',
    marginBottom: spacing.md,
    minWidth: '30%',
  },
  socialText: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  hoursCard: {
    marginBottom: spacing.lg,
  },
  hoursItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  hoursLabel: {
    ...typography.body,
    fontWeight: '500',
  },
  hoursValue: {
    ...typography.body,
    color: colors.text.secondary,
  },
  timezoneText: {
    ...typography.bodySmall,
    color: colors.text.light,
    fontStyle: 'italic',
    marginTop: spacing.sm,
  },
  deliveryCard: {
    marginBottom: spacing.lg,
  },
  deliveryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  deliveryLabel: {
    ...typography.body,
    fontWeight: '500',
  },
  deliveryValue: {
    ...typography.body,
    color: colors.text.secondary,
    flex: 1,
    textAlign: 'right',
  },
});
