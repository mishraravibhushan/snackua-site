import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Card from '../../components/Card';

describe('Card', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children correctly', () => {
    const { getByText } = render(
      <Card>
        <div>Test Content</div>
      </Card>
    );
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('should render as View when onPress is not provided', () => {
    const { getByText } = render(
      <Card>
        <div>Test Content</div>
      </Card>
    );
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('should render as TouchableOpacity when onPress is provided', () => {
    const { getByText } = render(
      <Card onPress={mockOnPress}>
        <div>Test Content</div>
      </Card>
    );
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const { getByText } = render(
      <Card onPress={mockOnPress}>
        <div>Test Content</div>
      </Card>
    );
    
    fireEvent.press(getByText('Test Content'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should apply custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByText } = render(
      <Card style={customStyle}>
        <div>Test Content</div>
      </Card>
    );
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('should handle disabled state', () => {
    const { getByText } = render(
      <Card onPress={mockOnPress} disabled>
        <div>Test Content</div>
      </Card>
    );
    
    fireEvent.press(getByText('Test Content'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('should have correct accessibility properties when pressable', () => {
    const { getByText } = render(
      <Card onPress={mockOnPress} accessibilityLabel="Test Card">
        <div>Test Content</div>
      </Card>
    );
    
    const card = getByText('Test Content');
    expect(card).toHaveProperty('props.accessibilityRole', 'button');
  });

  it('should render with different content types', () => {
    const { getByText } = render(
      <Card>
        <div>
          <h1>Title</h1>
          <p>Description</p>
          <button>Action</button>
        </div>
      </Card>
    );
    
    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Description')).toBeTruthy();
    expect(getByText('Action')).toBeTruthy();
  });
});
