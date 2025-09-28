import { colors, fonts, spacing, borderRadius, shadows, typography } from '../../styles/theme';

describe('Theme', () => {
  describe('colors', () => {
    it('should have all required color properties', () => {
      expect(colors).toHaveProperty('primary');
      expect(colors).toHaveProperty('secondary');
      expect(colors).toHaveProperty('accent');
      expect(colors).toHaveProperty('background');
      expect(colors).toHaveProperty('white');
      expect(colors).toHaveProperty('black');
      expect(colors).toHaveProperty('whatsapp');
      expect(colors).toHaveProperty('success');
      expect(colors).toHaveProperty('warning');
      expect(colors).toHaveProperty('error');
    });

    it('should have text color variants', () => {
      expect(colors.text).toHaveProperty('primary');
      expect(colors.text).toHaveProperty('secondary');
      expect(colors.text).toHaveProperty('light');
      expect(colors.text).toHaveProperty('white');
    });

    it('should have valid color values', () => {
      expect(colors.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(colors.secondary).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(colors.accent).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(colors.background).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(colors.white).toBe('#FFFFFF');
      expect(colors.black).toBe('#000000');
    });
  });

  describe('fonts', () => {
    it('should have all required font properties', () => {
      expect(fonts).toHaveProperty('heading');
      expect(fonts).toHaveProperty('body');
      expect(fonts).toHaveProperty('button');
    });

    it('should have valid font values', () => {
      expect(typeof fonts.heading).toBe('string');
      expect(typeof fonts.body).toBe('string');
      expect(typeof fonts.button).toBe('string');
    });
  });

  describe('spacing', () => {
    it('should have all required spacing values', () => {
      expect(spacing).toHaveProperty('xs');
      expect(spacing).toHaveProperty('sm');
      expect(spacing).toHaveProperty('md');
      expect(spacing).toHaveProperty('lg');
      expect(spacing).toHaveProperty('xl');
      expect(spacing).toHaveProperty('xxl');
    });

    it('should have numeric spacing values', () => {
      expect(typeof spacing.xs).toBe('number');
      expect(typeof spacing.sm).toBe('number');
      expect(typeof spacing.md).toBe('number');
      expect(typeof spacing.lg).toBe('number');
      expect(typeof spacing.xl).toBe('number');
      expect(typeof spacing.xxl).toBe('number');
    });

    it('should have increasing spacing values', () => {
      expect(spacing.xs).toBeLessThan(spacing.sm);
      expect(spacing.sm).toBeLessThan(spacing.md);
      expect(spacing.md).toBeLessThan(spacing.lg);
      expect(spacing.lg).toBeLessThan(spacing.xl);
      expect(spacing.xl).toBeLessThan(spacing.xxl);
    });
  });

  describe('borderRadius', () => {
    it('should have all required borderRadius values', () => {
      expect(borderRadius).toHaveProperty('sm');
      expect(borderRadius).toHaveProperty('md');
      expect(borderRadius).toHaveProperty('lg');
      expect(borderRadius).toHaveProperty('xl');
      expect(borderRadius).toHaveProperty('full');
    });

    it('should have numeric borderRadius values', () => {
      expect(typeof borderRadius.sm).toBe('number');
      expect(typeof borderRadius.md).toBe('number');
      expect(typeof borderRadius.lg).toBe('number');
      expect(typeof borderRadius.xl).toBe('number');
      expect(typeof borderRadius.full).toBe('number');
    });
  });

  describe('shadows', () => {
    it('should have all required shadow variants', () => {
      expect(shadows).toHaveProperty('sm');
      expect(shadows).toHaveProperty('md');
      expect(shadows).toHaveProperty('lg');
    });

    it('should have valid shadow properties', () => {
      expect(shadows.sm).toHaveProperty('shadowColor');
      expect(shadows.sm).toHaveProperty('shadowOffset');
      expect(shadows.sm).toHaveProperty('shadowOpacity');
      expect(shadows.sm).toHaveProperty('shadowRadius');
      expect(shadows.sm).toHaveProperty('elevation');
    });
  });

  describe('typography', () => {
    it('should have all required typography variants', () => {
      expect(typography).toHaveProperty('h1');
      expect(typography).toHaveProperty('h2');
      expect(typography).toHaveProperty('h3');
      expect(typography).toHaveProperty('h4');
      expect(typography).toHaveProperty('body');
      expect(typography).toHaveProperty('bodySmall');
      expect(typography).toHaveProperty('button');
      expect(typography).toHaveProperty('caption');
    });

    it('should have valid typography properties', () => {
      expect(typography.h1).toHaveProperty('fontSize');
      expect(typography.h1).toHaveProperty('fontWeight');
      expect(typography.h1).toHaveProperty('fontFamily');
      expect(typography.h1).toHaveProperty('color');
    });

    it('should have decreasing font sizes for headings', () => {
      expect(typography.h1.fontSize).toBeGreaterThan(typography.h2.fontSize);
      expect(typography.h2.fontSize).toBeGreaterThan(typography.h3.fontSize);
      expect(typography.h3.fontSize).toBeGreaterThan(typography.h4.fontSize);
    });
  });
});
