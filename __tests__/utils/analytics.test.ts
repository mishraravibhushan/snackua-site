import { trackEvent, trackPageView, trackButtonClick, trackOrderIntent } from '../../utils/analytics';

// Mock console.log to avoid noise in tests
const originalConsoleLog = console.log;
beforeEach(() => {
  console.log = jest.fn();
});

afterEach(() => {
  console.log = originalConsoleLog;
});

describe('Analytics', () => {
  describe('trackEvent', () => {
    it('should log event in development mode', () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      trackEvent('test_event', { key: 'value' });
      
      expect(console.log).toHaveBeenCalledWith('Analytics Event:', 'test_event', { key: 'value' });
      
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('should handle events without parameters', () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      trackEvent('simple_event');
      
      expect(console.log).toHaveBeenCalledWith('Analytics Event:', 'simple_event', undefined);
      
      process.env.NODE_ENV = originalNodeEnv;
    });
  });

  describe('trackPageView', () => {
    it('should track page view with correct parameters', () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      trackPageView('home');
      
      expect(console.log).toHaveBeenCalledWith('Analytics Event:', 'page_view', { page_name: 'home' });
      
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('should handle different page names', () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      trackPageView('products');
      trackPageView('contact');
      
      expect(console.log).toHaveBeenCalledWith('Analytics Event:', 'page_view', { page_name: 'products' });
      expect(console.log).toHaveBeenCalledWith('Analytics Event:', 'page_view', { page_name: 'contact' });
      
      process.env.NODE_ENV = originalNodeEnv;
    });
  });

  describe('trackButtonClick', () => {
    it('should track button click with name and location', () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      trackButtonClick('order_button', 'home_page');
      
      expect(console.log).toHaveBeenCalledWith('Analytics Event:', 'button_click', { 
        button_name: 'order_button', 
        location: 'home_page' 
      });
      
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('should use default location when not provided', () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      trackButtonClick('whatsapp_button');
      
      expect(console.log).toHaveBeenCalledWith('Analytics Event:', 'button_click', { 
        button_name: 'whatsapp_button', 
        location: 'unknown' 
      });
      
      process.env.NODE_ENV = originalNodeEnv;
    });
  });

  describe('trackOrderIntent', () => {
    it('should track order intent with product and source', () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      trackOrderIntent('jaggery_cookies', 'home_page');
      
      expect(console.log).toHaveBeenCalledWith('Analytics Event:', 'order_intent', { 
        product_name: 'jaggery_cookies', 
        source: 'home_page' 
      });
      
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('should handle different products and sources', () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      trackOrderIntent('classic_cookies', 'products_page');
      trackOrderIntent('bulk_order', 'contact_page');
      
      expect(console.log).toHaveBeenCalledWith('Analytics Event:', 'order_intent', { 
        product_name: 'classic_cookies', 
        source: 'products_page' 
      });
      expect(console.log).toHaveBeenCalledWith('Analytics Event:', 'order_intent', { 
        product_name: 'bulk_order', 
        source: 'contact_page' 
      });
      
      process.env.NODE_ENV = originalNodeEnv;
    });
  });
});
