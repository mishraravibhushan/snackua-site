import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CTAButton from '../../components/CTAButton';

describe('CTAButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with title', () => {
    const { getByText } = render(
      <CTAButton title="Test Button" onPress={mockOnPress} />
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const { getByText } = render(
      <CTAButton title="Test Button" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should render with different variants', () => {
    const variants = ['primary', 'secondary', 'whatsapp'] as const;
    
    variants.forEach(variant => {
      const { getByText } = render(
        <CTAButton title={`${variant} Button`} onPress={mockOnPress} variant={variant} />
      );
      expect(getByText(`${variant} Button`)).toBeTruthy();
    });
  });

  it('should render with different sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    
    sizes.forEach(size => {
      const { getByText } = render(
        <CTAButton title={`${size} Button`} onPress={mockOnPress} size={size} />
      );
      expect(getByText(`${size} Button`)).toBeTruthy();
    });
  });

  it('should render with icon', () => {
    const { getByText } = render(
      <CTAButton title="Button with Icon" onPress={mockOnPress} icon="heart" />
    );
    expect(getByText('Button with Icon')).toBeTruthy();
  });

  it('should handle disabled state', () => {
    const { getByText } = render(
      <CTAButton title="Disabled Button" onPress={mockOnPress} disabled />
    );
    
    fireEvent.press(getByText('Disabled Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('should apply custom style', () => {
    const customStyle = { marginTop: 20 };
    const { getByText } = render(
      <CTAButton title="Styled Button" onPress={mockOnPress} style={customStyle} />
    );
    expect(getByText('Styled Button')).toBeTruthy();
  });

  it('should have correct accessibility properties', () => {
    const { getByText } = render(
      <CTAButton title="Accessible Button" onPress={mockOnPress} />
    );
    
    const button = getByText('Accessible Button');
    expect(button).toHaveProperty('props.accessibilityRole', 'button');
  });

  it('should use custom accessibility label when provided', () => {
    const { getByText } = render(
      <CTAButton 
        title="Test Button" 
        onPress={mockOnPress} 
        accessibilityLabel="Custom Label" 
      />
    );
    
    const button = getByText('Test Button');
    expect(button).toHaveProperty('props.accessibilityLabel', 'Custom Label');
  });

  it('should render WhatsApp variant correctly', () => {
    const { getByText } = render(
      <CTAButton 
        title="Order on WhatsApp" 
        onPress={mockOnPress} 
        variant="whatsapp"
        icon="logo-whatsapp"
      />
    );
    expect(getByText('Order on WhatsApp')).toBeTruthy();
  });

  it('should render secondary variant correctly', () => {
    const { getByText } = render(
      <CTAButton 
        title="Secondary Button" 
        onPress={mockOnPress} 
        variant="secondary"
      />
    );
    expect(getByText('Secondary Button')).toBeTruthy();
  });
});
