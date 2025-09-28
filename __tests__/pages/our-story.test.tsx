import React from 'react';
import { render } from '@testing-library/react-native';
import OurStoryScreen from '../../app/our-story';

// Mock the content
jest.mock('../../content/our-story.json', () => ({
  title: 'Our Story',
  subtitle: 'Where Heritage Meets Modern Twist',
  sections: [
    {
      title: 'A Family Tradition',
      content: 'Snackua was born from a simple desire to bring back the authentic taste of traditional Indian cookies while making them healthier for today\'s lifestyle.'
    },
    {
      title: 'The Modern Twist',
      content: 'We\'ve taken our grandmother\'s time-tested recipe and given it a contemporary makeover.'
    },
    {
      title: 'Our Mission',
      content: 'To make healthy snacking accessible and enjoyable for everyone.'
    }
  ]
}));

describe('OurStoryScreen', () => {
  it('should render the main title', () => {
    const { getByText } = render(<OurStoryScreen />);
    expect(getByText('Our Story')).toBeTruthy();
  });

  it('should render the subtitle', () => {
    const { getByText } = render(<OurStoryScreen />);
    expect(getByText('Where Heritage Meets Modern Twist')).toBeTruthy();
  });

  it('should render all sections', () => {
    const { getByText } = render(<OurStoryScreen />);
    
    expect(getByText('A Family Tradition')).toBeTruthy();
    expect(getByText('The Modern Twist')).toBeTruthy();
    expect(getByText('Our Mission')).toBeTruthy();
  });

  it('should render section content', () => {
    const { getByText } = render(<OurStoryScreen />);
    
    expect(getByText('Snackua was born from a simple desire to bring back the authentic taste of traditional Indian cookies while making them healthier for today\'s lifestyle.')).toBeTruthy();
    expect(getByText('We\'ve taken our grandmother\'s time-tested recipe and given it a contemporary makeover.')).toBeTruthy();
    expect(getByText('To make healthy snacking accessible and enjoyable for everyone.')).toBeTruthy();
  });

  it('should have back button', () => {
    const { getByLabelText } = render(<OurStoryScreen />);
    expect(getByLabelText('Go back')).toBeTruthy();
  });

  it('should render with proper structure', () => {
    const { getByText } = render(<OurStoryScreen />);
    
    // Check that all main elements are present
    expect(getByText('Our Story')).toBeTruthy();
    expect(getByText('Where Heritage Meets Modern Twist')).toBeTruthy();
    expect(getByText('A Family Tradition')).toBeTruthy();
  });

  it('should handle multiple sections correctly', () => {
    const { getByText } = render(<OurStoryScreen />);
    
    // Verify all three sections are rendered
    const sectionTitles = ['A Family Tradition', 'The Modern Twist', 'Our Mission'];
    sectionTitles.forEach(title => {
      expect(getByText(title)).toBeTruthy();
    });
  });
});
