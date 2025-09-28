import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../../app/index';

// Mock the content
jest.mock('../../content/home.json', () => ({
  tagline: 'Healthy Jaggery Cookies for Modern Living',
  benefits: [
    'Zero Maida',
    'Zero Refined Sugar', 
    '100% Natural Ingredients'
  ],
  heroDescription: 'Experience the perfect blend of traditional taste and modern health consciousness.',
  ctaText: 'Ready to taste the difference?',
  ctaButtonText: 'Order on WhatsApp'
}));

describe('HomeScreen', () => {
  it('should render the main title', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Snackua')).toBeTruthy();
  });

  it('should render the tagline', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Healthy Jaggery Cookies for Modern Living')).toBeTruthy();
  });

  it('should render all benefits', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Zero Maida')).toBeTruthy();
    expect(getByText('Zero Refined Sugar')).toBeTruthy();
    expect(getByText('100% Natural Ingredients')).toBeTruthy();
  });

  it('should render navigation cards', () => {
    const { getByText } = render(<HomeScreen />);
    
    expect(getByText('Our Story')).toBeTruthy();
    expect(getByText('Ingredients')).toBeTruthy();
    expect(getByText('Products')).toBeTruthy();
    expect(getByText('Why Jaggery')).toBeTruthy();
  });

  it('should render card descriptions', () => {
    const { getByText } = render(<HomeScreen />);
    
    expect(getByText('Heritage meets modern twist')).toBeTruthy();
    expect(getByText('100% natural goodness')).toBeTruthy();
    expect(getByText('Our healthy cookies')).toBeTruthy();
    expect(getByText('The sweet truth')).toBeTruthy();
  });

  it('should render CTA section', () => {
    const { getByText } = render(<HomeScreen />);
    
    expect(getByText('Ready to taste the difference?')).toBeTruthy();
    expect(getByText('Order on WhatsApp')).toBeTruthy();
  });

  it('should have proper accessibility labels', () => {
    const { getByText } = render(<HomeScreen />);
    
    const whatsappButton = getByText('Order on WhatsApp');
    expect(whatsappButton).toHaveProperty('props.accessibilityRole', 'button');
  });

  it('should render all navigation links', () => {
    const { getByText } = render(<HomeScreen />);
    
    // Check that all navigation cards are present
    const navigationCards = [
      'Our Story',
      'Ingredients', 
      'Products',
      'Why Jaggery'
    ];
    
    navigationCards.forEach(cardTitle => {
      expect(getByText(cardTitle)).toBeTruthy();
    });
  });

  it('should have proper styling structure', () => {
    const { getByText } = render(<HomeScreen />);
    
    // Check that main elements are rendered
    expect(getByText('Snackua')).toBeTruthy();
    expect(getByText('Healthy Jaggery Cookies for Modern Living')).toBeTruthy();
    expect(getByText('Ready to taste the difference?')).toBeTruthy();
  });

  it('should render benefits in correct format', () => {
    const { getByText } = render(<HomeScreen />);
    
    // Check that benefits are displayed with bullet separators
    const benefitsText = getByText('Zero Maida • Zero Refined Sugar • 100% Natural Ingredients');
    expect(benefitsText).toBeTruthy();
  });
});
