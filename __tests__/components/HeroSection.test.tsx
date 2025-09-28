import React from 'react';
import { render } from '@testing-library/react-native';
import HeroSection from '../../components/HeroSection';

describe('HeroSection', () => {
  it('should render with title only', () => {
    const { getByText } = render(<HeroSection title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('should render with title and subtitle', () => {
    const { getByText } = render(
      <HeroSection title="Test Title" subtitle="Test Subtitle" />
    );
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Subtitle')).toBeTruthy();
  });

  it('should render with title, subtitle and description', () => {
    const { getByText } = render(
      <HeroSection 
        title="Test Title" 
        subtitle="Test Subtitle" 
        description="Test Description" 
      />
    );
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Subtitle')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
  });

  it('should render children when provided', () => {
    const { getByText } = render(
      <HeroSection title="Test Title">
        <div>Child Content</div>
      </HeroSection>
    );
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Child Content')).toBeTruthy();
  });

  it('should render with all props and children', () => {
    const { getByText } = render(
      <HeroSection 
        title="Main Title" 
        subtitle="Main Subtitle" 
        description="Main Description"
      >
        <div>Additional Content</div>
      </HeroSection>
    );
    
    expect(getByText('Main Title')).toBeTruthy();
    expect(getByText('Main Subtitle')).toBeTruthy();
    expect(getByText('Main Description')).toBeTruthy();
    expect(getByText('Additional Content')).toBeTruthy();
  });

  it('should handle empty title', () => {
    const { container } = render(<HeroSection title="" />);
    expect(container).toBeTruthy();
  });

  it('should handle very long text content', () => {
    const longTitle = 'This is a very long title that might wrap to multiple lines and should still be displayed correctly';
    const longSubtitle = 'This is a very long subtitle that contains a lot of information and should be handled properly';
    const longDescription = 'This is a very long description that contains multiple sentences and paragraphs and should be displayed correctly in the hero section';
    
    const { getByText } = render(
      <HeroSection 
        title={longTitle}
        subtitle={longSubtitle}
        description={longDescription}
      />
    );
    
    expect(getByText(longTitle)).toBeTruthy();
    expect(getByText(longSubtitle)).toBeTruthy();
    expect(getByText(longDescription)).toBeTruthy();
  });

  it('should render with different title variations', () => {
    const titles = [
      'Snackua',
      'Our Story',
      'Ingredients & Benefits',
      'Products',
      'Nutrition',
      'Why Jaggery',
      'How We Make',
      'FAQs',
      'Contact & Order',
      'Policies'
    ];
    
    titles.forEach(title => {
      const { getByText } = render(<HeroSection title={title} />);
      expect(getByText(title)).toBeTruthy();
    });
  });

  it('should handle special characters in text', () => {
    const specialTitle = 'Snackua™ - Healthy Jaggery Cookies®';
    const specialSubtitle = 'Zero Maida • Zero Refined Sugar • 100% Natural Ingredients';
    const specialDescription = 'Experience the perfect blend of traditional taste & modern health consciousness!';
    
    const { getByText } = render(
      <HeroSection 
        title={specialTitle}
        subtitle={specialSubtitle}
        description={specialDescription}
      />
    );
    
    expect(getByText(specialTitle)).toBeTruthy();
    expect(getByText(specialSubtitle)).toBeTruthy();
    expect(getByText(specialDescription)).toBeTruthy();
  });
});
