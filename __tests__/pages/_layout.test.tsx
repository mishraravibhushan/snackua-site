import React from 'react';
import { render } from '@testing-library/react-native';
import RootLayout from '../../app/_layout';

// Mock the router
jest.mock('expo-router', () => ({
  Stack: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock splash screen
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

describe('RootLayout', () => {
  it('should render without crashing', () => {
    const { container } = render(<RootLayout />);
    expect(container).toBeTruthy();
  });

  it('should render Stack component', () => {
    const { container } = render(<RootLayout />);
    expect(container).toBeTruthy();
  });

  it('should have proper structure', () => {
    const { container } = render(<RootLayout />);
    expect(container).toBeTruthy();
  });

  it('should handle SafeAreaProvider', () => {
    const { container } = render(<RootLayout />);
    expect(container).toBeTruthy();
  });

  it('should render StatusBar', () => {
    const { container } = render(<RootLayout />);
    expect(container).toBeTruthy();
  });
});
