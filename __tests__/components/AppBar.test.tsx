import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppBar from '../../components/AppBar';

describe('AppBar', () => {
  const mockOnBackPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with title', () => {
    const { getByText } = render(<AppBar title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('should not show back button by default', () => {
    const { queryByLabelText } = render(<AppBar title="Test Title" />);
    expect(queryByLabelText('Go back')).toBeNull();
  });

  it('should show back button when showBackButton is true', () => {
    const { getByLabelText } = render(
      <AppBar title="Test Title" showBackButton onBackPress={mockOnBackPress} />
    );
    expect(getByLabelText('Go back')).toBeTruthy();
  });

  it('should call onBackPress when back button is pressed', () => {
    const { getByLabelText } = render(
      <AppBar title="Test Title" showBackButton onBackPress={mockOnBackPress} />
    );
    
    fireEvent.press(getByLabelText('Go back'));
    expect(mockOnBackPress).toHaveBeenCalledTimes(1);
  });

  it('should render right component when provided', () => {
    const RightComponent = () => <div>Right Content</div>;
    const { getByText } = render(
      <AppBar title="Test Title" rightComponent={<RightComponent />} />
    );
    expect(getByText('Right Content')).toBeTruthy();
  });

  it('should have correct accessibility properties', () => {
    const { getByLabelText } = render(
      <AppBar title="Test Title" showBackButton onBackPress={mockOnBackPress} />
    );
    
    const backButton = getByLabelText('Go back');
    expect(backButton).toHaveProperty('props.accessibilityRole', 'button');
  });

  it('should render with different titles', () => {
    const titles = ['Home', 'Our Story', 'Products', 'Contact'];
    
    titles.forEach(title => {
      const { getByText } = render(<AppBar title={title} />);
      expect(getByText(title)).toBeTruthy();
    });
  });
});
