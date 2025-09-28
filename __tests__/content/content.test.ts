import homeContent from '../../content/home.json';
import ourStoryContent from '../../content/our-story.json';
import ingredientsContent from '../../content/ingredients.json';
import productsContent from '../../content/products.json';
import nutritionContent from '../../content/nutrition.json';
import whyJaggeryContent from '../../content/why-jaggery.json';
import howWeMakeContent from '../../content/how-we-make.json';
import faqsContent from '../../content/faqs.json';
import contactContent from '../../content/contact.json';
import policiesContent from '../../content/policies.json';

describe('Content Validation', () => {
  describe('home.json', () => {
    it('should have required properties', () => {
      expect(homeContent).toHaveProperty('tagline');
      expect(homeContent).toHaveProperty('benefits');
      expect(homeContent).toHaveProperty('heroDescription');
      expect(homeContent).toHaveProperty('ctaText');
      expect(homeContent).toHaveProperty('ctaButtonText');
    });

    it('should have valid data types', () => {
      expect(typeof homeContent.tagline).toBe('string');
      expect(Array.isArray(homeContent.benefits)).toBe(true);
      expect(typeof homeContent.heroDescription).toBe('string');
      expect(typeof homeContent.ctaText).toBe('string');
      expect(typeof homeContent.ctaButtonText).toBe('string');
    });

    it('should have non-empty values', () => {
      expect(homeContent.tagline.length).toBeGreaterThan(0);
      expect(homeContent.benefits.length).toBeGreaterThan(0);
      expect(homeContent.heroDescription.length).toBeGreaterThan(0);
      expect(homeContent.ctaText.length).toBeGreaterThan(0);
      expect(homeContent.ctaButtonText.length).toBeGreaterThan(0);
    });
  });

  describe('our-story.json', () => {
    it('should have required properties', () => {
      expect(ourStoryContent).toHaveProperty('title');
      expect(ourStoryContent).toHaveProperty('subtitle');
      expect(ourStoryContent).toHaveProperty('sections');
    });

    it('should have valid sections structure', () => {
      expect(Array.isArray(ourStoryContent.sections)).toBe(true);
      expect(ourStoryContent.sections.length).toBeGreaterThan(0);
      
      ourStoryContent.sections.forEach((section: any) => {
        expect(section).toHaveProperty('title');
        expect(section).toHaveProperty('content');
        expect(typeof section.title).toBe('string');
        expect(typeof section.content).toBe('string');
        expect(section.title.length).toBeGreaterThan(0);
        expect(section.content.length).toBeGreaterThan(0);
      });
    });
  });

  describe('ingredients.json', () => {
    it('should have required properties', () => {
      expect(ingredientsContent).toHaveProperty('title');
      expect(ingredientsContent).toHaveProperty('subtitle');
      expect(ingredientsContent).toHaveProperty('ingredients');
    });

    it('should have valid ingredients structure', () => {
      expect(Array.isArray(ingredientsContent.ingredients)).toBe(true);
      expect(ingredientsContent.ingredients.length).toBeGreaterThan(0);
      
      ingredientsContent.ingredients.forEach((ingredient: any) => {
        expect(ingredient).toHaveProperty('name');
        expect(ingredient).toHaveProperty('description');
        expect(ingredient).toHaveProperty('benefits');
        expect(typeof ingredient.name).toBe('string');
        expect(typeof ingredient.description).toBe('string');
        expect(Array.isArray(ingredient.benefits)).toBe(true);
        expect(ingredient.benefits.length).toBeGreaterThan(0);
      });
    });
  });

  describe('products.json', () => {
    it('should have required properties', () => {
      expect(productsContent).toHaveProperty('title');
      expect(productsContent).toHaveProperty('subtitle');
      expect(productsContent).toHaveProperty('products');
    });

    it('should have valid products structure', () => {
      expect(Array.isArray(productsContent.products)).toBe(true);
      expect(productsContent.products.length).toBeGreaterThan(0);
      
      productsContent.products.forEach((product: any) => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('weight');
        expect(product).toHaveProperty('servings');
        expect(product).toHaveProperty('nutrition');
        expect(product).toHaveProperty('allergens');
        expect(product).toHaveProperty('ingredients');
      });
    });

    it('should have valid nutrition data', () => {
      productsContent.products.forEach((product: any) => {
        expect(product.nutrition).toHaveProperty('per100g');
        expect(product.nutrition).toHaveProperty('perCookie');
        
        // Check per100g nutrition
        Object.values(product.nutrition.per100g).forEach((value: any) => {
          expect(typeof value).toBe('string');
          expect(value.length).toBeGreaterThan(0);
        });
        
        // Check perCookie nutrition
        Object.values(product.nutrition.perCookie).forEach((value: any) => {
          expect(typeof value).toBe('string');
          expect(value.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('nutrition.json', () => {
    it('should have required properties', () => {
      expect(nutritionContent).toHaveProperty('title');
      expect(nutritionContent).toHaveProperty('subtitle');
      expect(nutritionContent).toHaveProperty('disclaimer');
      expect(nutritionContent).toHaveProperty('tables');
      expect(nutritionContent).toHaveProperty('benefits');
    });

    it('should have valid tables structure', () => {
      expect(Array.isArray(nutritionContent.tables)).toBe(true);
      expect(nutritionContent.tables.length).toBeGreaterThan(0);
      
      nutritionContent.tables.forEach((table: any) => {
        expect(table).toHaveProperty('title');
        expect(table).toHaveProperty('data');
        expect(typeof table.title).toBe('string');
        expect(typeof table.data).toBe('object');
        expect(Object.keys(table.data).length).toBeGreaterThan(0);
      });
    });
  });

  describe('faqs.json', () => {
    it('should have required properties', () => {
      expect(faqsContent).toHaveProperty('title');
      expect(faqsContent).toHaveProperty('subtitle');
      expect(faqsContent).toHaveProperty('faqs');
    });

    it('should have valid FAQs structure', () => {
      expect(Array.isArray(faqsContent.faqs)).toBe(true);
      expect(faqsContent.faqs.length).toBeGreaterThan(0);
      
      faqsContent.faqs.forEach((faq: any) => {
        expect(faq).toHaveProperty('question');
        expect(faq).toHaveProperty('answer');
        expect(typeof faq.question).toBe('string');
        expect(typeof faq.answer).toBe('string');
        expect(faq.question.length).toBeGreaterThan(0);
        expect(faq.answer.length).toBeGreaterThan(0);
      });
    });
  });

  describe('contact.json', () => {
    it('should have required properties', () => {
      expect(contactContent).toHaveProperty('title');
      expect(contactContent).toHaveProperty('subtitle');
      expect(contactContent).toHaveProperty('whatsapp');
      expect(contactContent).toHaveProperty('email');
      expect(contactContent).toHaveProperty('socialMedia');
      expect(contactContent).toHaveProperty('businessHours');
      expect(contactContent).toHaveProperty('deliveryInfo');
      expect(contactContent).toHaveProperty('address');
    });

    it('should have valid WhatsApp data', () => {
      expect(contactContent.whatsapp).toHaveProperty('number');
      expect(contactContent.whatsapp).toHaveProperty('message');
      expect(contactContent.whatsapp).toHaveProperty('buttonText');
      expect(typeof contactContent.whatsapp.number).toBe('string');
      expect(typeof contactContent.whatsapp.message).toBe('string');
      expect(typeof contactContent.whatsapp.buttonText).toBe('string');
    });

    it('should have valid social media data', () => {
      expect(contactContent.socialMedia).toHaveProperty('instagram');
      expect(contactContent.socialMedia).toHaveProperty('facebook');
      expect(contactContent.socialMedia).toHaveProperty('twitter');
    });
  });

  describe('policies.json', () => {
    it('should have required properties', () => {
      expect(policiesContent).toHaveProperty('title');
      expect(policiesContent).toHaveProperty('sections');
    });

    it('should have valid sections structure', () => {
      expect(Array.isArray(policiesContent.sections)).toBe(true);
      expect(policiesContent.sections.length).toBeGreaterThan(0);
      
      policiesContent.sections.forEach((section: any) => {
        expect(section).toHaveProperty('title');
        expect(section).toHaveProperty('lastUpdated');
        expect(section).toHaveProperty('content');
        expect(typeof section.title).toBe('string');
        expect(typeof section.lastUpdated).toBe('string');
        expect(typeof section.content).toBe('string');
      });
    });
  });
});
