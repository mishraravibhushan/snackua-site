import React from 'react';
import { render } from '@testing-library/react-native';
import IngredientsScreen from '../../app/ingredients';

// Mock the content
jest.mock('../../content/ingredients.json', () => ({
  title: 'Ingredients & Benefits',
  subtitle: '100% Natural, 100% Delicious',
  ingredients: [
    {
      name: 'Whole Wheat Flour',
      description: 'Rich in fiber, vitamins, and minerals. Provides sustained energy and supports digestive health.',
      benefits: ['High in fiber', 'Rich in B vitamins', 'Supports heart health', 'Aids digestion']
    },
    {
      name: 'Pure Jaggery',
      description: 'Unrefined sweetener that retains natural minerals and antioxidants.',
      benefits: ['Rich in iron', 'Natural antioxidants', 'Boosts immunity', 'Regulates blood sugar']
    },
    {
      name: 'Desi Ghee',
      description: 'Traditional clarified butter that adds richness and flavor.',
      benefits: ['Healthy fats', 'Vitamin A & E', 'Supports brain health', 'Anti-inflammatory']
    }
  ]
}));

describe('IngredientsScreen', () => {
  it('should render the main title', () => {
    const { getByText } = render(<IngredientsScreen />);
    expect(getByText('Ingredients & Benefits')).toBeTruthy();
  });

  it('should render the subtitle', () => {
    const { getByText } = render(<IngredientsScreen />);
    expect(getByText('100% Natural, 100% Delicious')).toBeTruthy();
  });

  it('should render all ingredients', () => {
    const { getByText } = render(<IngredientsScreen />);
    
    expect(getByText('Whole Wheat Flour')).toBeTruthy();
    expect(getByText('Pure Jaggery')).toBeTruthy();
    expect(getByText('Desi Ghee')).toBeTruthy();
  });

  it('should render ingredient descriptions', () => {
    const { getByText } = render(<IngredientsScreen />);
    
    expect(getByText('Rich in fiber, vitamins, and minerals. Provides sustained energy and supports digestive health.')).toBeTruthy();
    expect(getByText('Unrefined sweetener that retains natural minerals and antioxidants.')).toBeTruthy();
    expect(getByText('Traditional clarified butter that adds richness and flavor.')).toBeTruthy();
  });

  it('should render ingredient benefits', () => {
    const { getByText } = render(<IngredientsScreen />);
    
    // Check for some key benefits
    expect(getByText('High in fiber')).toBeTruthy();
    expect(getByText('Rich in iron')).toBeTruthy();
    expect(getByText('Healthy fats')).toBeTruthy();
  });

  it('should have back button', () => {
    const { getByLabelText } = render(<IngredientsScreen />);
    expect(getByLabelText('Go back')).toBeTruthy();
  });

  it('should render benefits section title', () => {
    const { getByText } = render(<IngredientsScreen />);
    expect(getByText('Benefits:')).toBeTruthy();
  });

  it('should handle multiple ingredients correctly', () => {
    const { getByText } = render(<IngredientsScreen />);
    
    // Verify all three ingredients are rendered
    const ingredientNames = ['Whole Wheat Flour', 'Pure Jaggery', 'Desi Ghee'];
    ingredientNames.forEach(name => {
      expect(getByText(name)).toBeTruthy();
    });
  });

  it('should render all benefits for each ingredient', () => {
    const { getByText } = render(<IngredientsScreen />);
    
    // Check benefits for Whole Wheat Flour
    expect(getByText('High in fiber')).toBeTruthy();
    expect(getByText('Rich in B vitamins')).toBeTruthy();
    expect(getByText('Supports heart health')).toBeTruthy();
    expect(getByText('Aids digestion')).toBeTruthy();
    
    // Check benefits for Pure Jaggery
    expect(getByText('Rich in iron')).toBeTruthy();
    expect(getByText('Natural antioxidants')).toBeTruthy();
    expect(getByText('Boosts immunity')).toBeTruthy();
    expect(getByText('Regulates blood sugar')).toBeTruthy();
  });
});
