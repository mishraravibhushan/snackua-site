import { Platform } from 'react-native';

// Simple analytics implementation
// In production, you would integrate with Firebase Analytics and GA4

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (__DEV__) {
    console.log('Analytics Event:', eventName, parameters);
    return;
  }

  // Web Analytics (GA4)
  if (Platform.OS === 'web' && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }

  // Mobile Analytics (Firebase)
  // This would be implemented with @react-native-firebase/analytics
  // Example:
  // import analytics from '@react-native-firebase/analytics';
  // analytics().logEvent(eventName, parameters);
};

export const trackPageView = (pageName: string) => {
  trackEvent('page_view', { page_name: pageName });
};

export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', { 
    button_name: buttonName, 
    location: location || 'unknown' 
  });
};

export const trackOrderIntent = (productName: string, source: string) => {
  trackEvent('order_intent', { 
    product_name: productName, 
    source: source 
  });
};
