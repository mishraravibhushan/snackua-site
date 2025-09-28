import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Accordion from '../../components/Accordion';

describe('Accordion', () => {
  const mockItems = [
    {
      question: 'What is Snackua?',
      answer: 'Snackua is a healthy cookie brand.'
    },
    {
      question: 'Are the cookies healthy?',
      answer: 'Yes, they are made with natural ingredients.'
    },
    {
      question: 'How to order?',
      answer: 'You can order via WhatsApp.'
    }
  ];

  it('should render all items', () => {
    const { getByText } = render(<Accordion items={mockItems} />);
    
    expect(getByText('What is Snackua?')).toBeTruthy();
    expect(getByText('Are the cookies healthy?')).toBeTruthy();
    expect(getByText('How to order?')).toBeTruthy();
  });

  it('should not show answers initially', () => {
    const { queryByText } = render(<Accordion items={mockItems} />);
    
    expect(queryByText('Snackua is a healthy cookie brand.')).toBeNull();
    expect(queryByText('Yes, they are made with natural ingredients.')).toBeNull();
    expect(queryByText('You can order via WhatsApp.')).toBeNull();
  });

  it('should show answer when item is clicked', () => {
    const { getByText, queryByText } = render(<Accordion items={mockItems} />);
    
    fireEvent.press(getByText('What is Snackua?'));
    expect(getByText('Snackua is a healthy cookie brand.')).toBeTruthy();
  });

  it('should hide answer when clicked again', () => {
    const { getByText, queryByText } = render(<Accordion items={mockItems} />);
    
    // Click to expand
    fireEvent.press(getByText('What is Snackua?'));
    expect(getByText('Snackua is a healthy cookie brand.')).toBeTruthy();
    
    // Click to collapse
    fireEvent.press(getByText('What is Snackua?'));
    expect(queryByText('Snackua is a healthy cookie brand.')).toBeNull();
  });

  it('should allow multiple items to be expanded', () => {
    const { getByText } = render(<Accordion items={mockItems} />);
    
    fireEvent.press(getByText('What is Snackua?'));
    fireEvent.press(getByText('Are the cookies healthy?'));
    
    expect(getByText('Snackua is a healthy cookie brand.')).toBeTruthy();
    expect(getByText('Yes, they are made with natural ingredients.')).toBeTruthy();
  });

  it('should have correct accessibility properties', () => {
    const { getByText } = render(<Accordion items={mockItems} />);
    
    const firstItem = getByText('What is Snackua?');
    expect(firstItem).toHaveProperty('props.accessibilityRole', 'button');
    expect(firstItem).toHaveProperty('props.accessibilityLabel', 'What is Snackua?. Tap to expand');
  });

  it('should update accessibility label when expanded', () => {
    const { getByText } = render(<Accordion items={mockItems} />);
    
    const firstItem = getByText('What is Snackua?');
    fireEvent.press(firstItem);
    
    expect(firstItem).toHaveProperty('props.accessibilityLabel', 'What is Snackua?. Tap to collapse');
  });

  it('should render with empty items array', () => {
    const { container } = render(<Accordion items={[]} />);
    expect(container).toBeTruthy();
  });

  it('should render with single item', () => {
    const singleItem = [mockItems[0]];
    const { getByText } = render(<Accordion items={singleItem} />);
    
    expect(getByText('What is Snackua?')).toBeTruthy();
  });

  it('should apply custom style', () => {
    const customStyle = { marginTop: 20 };
    const { container } = render(<Accordion items={mockItems} style={customStyle} />);
    expect(container).toBeTruthy();
  });

  it('should handle long questions and answers', () => {
    const longItems = [
      {
        question: 'This is a very long question that might wrap to multiple lines and should still be handled correctly by the accordion component?',
        answer: 'This is a very long answer that contains a lot of information about the product and should be displayed properly when expanded. It might contain multiple sentences and paragraphs.'
      }
    ];
    
    const { getByText } = render(<Accordion items={longItems} />);
    
    expect(getByText(longItems[0].question)).toBeTruthy();
    
    fireEvent.press(getByText(longItems[0].question));
    expect(getByText(longItems[0].answer)).toBeTruthy();
  });
});
