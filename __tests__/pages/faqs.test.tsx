import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FAQsScreen from '../../app/faqs';

// Mock the content
jest.mock('../../content/faqs.json', () => ({
  title: 'Frequently Asked Questions',
  subtitle: 'Everything You Need to Know',
  faqs: [
    {
      question: 'Are your cookies really healthy?',
      answer: 'Yes! Our cookies are made with 100% natural ingredients - whole wheat flour, pure jaggery, desi ghee, and natural spices.'
    },
    {
      question: 'How long do the cookies stay fresh?',
      answer: 'Our cookies stay fresh for up to 3 months when stored in a cool, dry place.'
    },
    {
      question: 'Do you use any artificial preservatives?',
      answer: 'No, we don\'t use any artificial preservatives. Our cookies are made fresh and stay fresh naturally.'
    }
  ]
}));

describe('FAQsScreen', () => {
  it('should render the main title', () => {
    const { getByText } = render(<FAQsScreen />);
    expect(getByText('Frequently Asked Questions')).toBeTruthy();
  });

  it('should render the subtitle', () => {
    const { getByText } = render(<FAQsScreen />);
    expect(getByText('Everything You Need to Know')).toBeTruthy();
  });

  it('should render all FAQ questions', () => {
    const { getByText } = render(<FAQsScreen />);
    
    expect(getByText('Are your cookies really healthy?')).toBeTruthy();
    expect(getByText('How long do the cookies stay fresh?')).toBeTruthy();
    expect(getByText('Do you use any artificial preservatives?')).toBeTruthy();
  });

  it('should not show answers initially', () => {
    const { queryByText } = render(<FAQsScreen />);
    
    expect(queryByText('Yes! Our cookies are made with 100% natural ingredients - whole wheat flour, pure jaggery, desi ghee, and natural spices.')).toBeNull();
    expect(queryByText('Our cookies stay fresh for up to 3 months when stored in a cool, dry place.')).toBeNull();
  });

  it('should show answer when question is clicked', () => {
    const { getByText, queryByText } = render(<FAQsScreen />);
    
    fireEvent.press(getByText('Are your cookies really healthy?'));
    expect(getByText('Yes! Our cookies are made with 100% natural ingredients - whole wheat flour, pure jaggery, desi ghee, and natural spices.')).toBeTruthy();
  });

  it('should hide answer when clicked again', () => {
    const { getByText, queryByText } = render(<FAQsScreen />);
    
    // Click to expand
    fireEvent.press(getByText('Are your cookies really healthy?'));
    expect(getByText('Yes! Our cookies are made with 100% natural ingredients - whole wheat flour, pure jaggery, desi ghee, and natural spices.')).toBeTruthy();
    
    // Click to collapse
    fireEvent.press(getByText('Are your cookies really healthy?'));
    expect(queryByText('Yes! Our cookies are made with 100% natural ingredients - whole wheat flour, pure jaggery, desi ghee, and natural spices.')).toBeNull();
  });

  it('should allow multiple questions to be expanded', () => {
    const { getByText } = render(<FAQsScreen />);
    
    fireEvent.press(getByText('Are your cookies really healthy?'));
    fireEvent.press(getByText('How long do the cookies stay fresh?'));
    
    expect(getByText('Yes! Our cookies are made with 100% natural ingredients - whole wheat flour, pure jaggery, desi ghee, and natural spices.')).toBeTruthy();
    expect(getByText('Our cookies stay fresh for up to 3 months when stored in a cool, dry place.')).toBeTruthy();
  });

  it('should have back button', () => {
    const { getByLabelText } = render(<FAQsScreen />);
    expect(getByLabelText('Go back')).toBeTruthy();
  });

  it('should have proper accessibility properties', () => {
    const { getByText } = render(<FAQsScreen />);
    
    const firstQuestion = getByText('Are your cookies really healthy?');
    expect(firstQuestion).toHaveProperty('props.accessibilityRole', 'button');
  });

  it('should handle all FAQ questions', () => {
    const { getByText } = render(<FAQsScreen />);
    
    const questions = [
      'Are your cookies really healthy?',
      'How long do the cookies stay fresh?',
      'Do you use any artificial preservatives?'
    ];
    
    questions.forEach(question => {
      expect(getByText(question)).toBeTruthy();
    });
  });

  it('should expand and show correct answers', () => {
    const { getByText } = render(<FAQsScreen />);
    
    // Test first FAQ
    fireEvent.press(getByText('Are your cookies really healthy?'));
    expect(getByText('Yes! Our cookies are made with 100% natural ingredients - whole wheat flour, pure jaggery, desi ghee, and natural spices.')).toBeTruthy();
    
    // Test second FAQ
    fireEvent.press(getByText('How long do the cookies stay fresh?'));
    expect(getByText('Our cookies stay fresh for up to 3 months when stored in a cool, dry place.')).toBeTruthy();
    
    // Test third FAQ
    fireEvent.press(getByText('Do you use any artificial preservatives?'));
    expect(getByText('No, we don\'t use any artificial preservatives. Our cookies are made fresh and stay fresh naturally.')).toBeTruthy();
  });
});
