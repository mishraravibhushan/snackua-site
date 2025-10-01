import { Platform } from 'react-native';

export const colors = {
  primary: '#8B4513',        // Earthy Brown
  secondary: '#DAA520',      // Golden Yellow
  accent: '#CD853F',         // Peru (warm brown)
  background: '#F5F1E8',     // Cream
  surface: '#FFFFFF',        // White
  black: '#000000',
  text: {
    primary: '#2C1810',      // Dark brown
    secondary: '#8B4513',    // Medium brown
    light: '#A0522D',        // Light brown
    white: '#FFFFFF',
  },
  whatsapp: '#25D366',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  // Gradient colors
  gradient: {
    primary: ['#8B4513', '#DAA520'],
    secondary: ['#F5F1E8', '#FFFFFF'],
    hero: ['rgba(139, 69, 19, 0.8)', 'rgba(218, 165, 32, 0.8)'],
  },
};

export const fonts = {
  heading: Platform.OS === 'web' ? 'Playfair Display, serif' : 'serif',
  body: Platform.OS === 'web' ? 'Poppins, sans-serif' : 'System',
  button: Platform.OS === 'web' ? 'Poppins, sans-serif' : 'System',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const typography = {
  hero: {
    fontSize: 48,
    fontWeight: 'bold' as const,
    fontFamily: fonts.heading,
    color: colors.text.primary,
    lineHeight: 56,
  },
  h1: {
    fontSize: 36,
    fontWeight: 'bold' as const,
    fontFamily: fonts.heading,
    color: colors.text.primary,
    lineHeight: 44,
  },
  h2: {
    fontSize: 28,
    fontWeight: '600' as const,
    fontFamily: fonts.heading,
    color: colors.text.primary,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600' as const,
    fontFamily: fonts.heading,
    color: colors.text.primary,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '500' as const,
    fontFamily: fonts.heading,
    color: colors.text.primary,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontFamily: fonts.body,
    color: colors.text.primary,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    fontFamily: fonts.button,
    color: colors.white,
  },
  caption: {
    fontSize: 12,
    fontFamily: fonts.body,
    color: colors.text.light,
    lineHeight: 16,
  },
  lead: {
    fontSize: 18,
    fontFamily: fonts.body,
    color: colors.text.secondary,
    lineHeight: 28,
    fontWeight: '500' as const,
  },
};
