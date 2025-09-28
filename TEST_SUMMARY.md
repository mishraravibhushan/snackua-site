# 🧪 Snackua App - Comprehensive Test Suite

## Overview

This document provides a complete overview of all test cases written for the Snackua app. The test suite covers all components, pages, utilities, and content validation.

## Test Structure

```
__tests__/
├── components/          # Component tests
├── pages/              # Page tests  
├── styles/             # Theme tests
├── utils/              # Utility tests
├── content/            # Content validation tests
└── test-runner.js      # Test runner script
```

## Test Categories

### 1. Theme & Utilities Tests

#### `styles/theme.test.ts`
- **Purpose**: Tests the design system configuration
- **Coverage**: Colors, fonts, spacing, typography, shadows, borderRadius
- **Key Tests**:
  - All required color properties exist
  - Valid hex color values
  - Font configurations are correct
  - Spacing values are numeric and increasing
  - Typography variants have correct properties
  - Shadow configurations are valid

#### `utils/analytics.test.ts`
- **Purpose**: Tests analytics utility functions
- **Coverage**: Event tracking, page views, button clicks, order intents
- **Key Tests**:
  - `trackEvent()` logs events in development
  - `trackPageView()` tracks page navigation
  - `trackButtonClick()` tracks user interactions
  - `trackOrderIntent()` tracks conversion events
  - Handles missing parameters gracefully

### 2. Component Tests

#### `components/AppBar.test.tsx`
- **Purpose**: Tests the navigation header component
- **Coverage**: Title display, back button, right components, accessibility
- **Key Tests**:
  - Renders title correctly
  - Shows/hides back button based on props
  - Calls onBackPress when back button is pressed
  - Renders right component when provided
  - Has correct accessibility properties
  - Handles different title variations

#### `components/Card.test.tsx`
- **Purpose**: Tests the reusable card component
- **Coverage**: Rendering, press handling, styling, accessibility
- **Key Tests**:
  - Renders children correctly
  - Renders as View or TouchableOpacity based on onPress
  - Calls onPress when pressed
  - Applies custom styles
  - Handles disabled state
  - Has correct accessibility properties

#### `components/CTAButton.test.tsx`
- **Purpose**: Tests the call-to-action button component
- **Coverage**: Variants, sizes, icons, states, accessibility
- **Key Tests**:
  - Renders with title and calls onPress
  - Supports different variants (primary, secondary, whatsapp)
  - Supports different sizes (small, medium, large)
  - Renders with icons
  - Handles disabled state
  - Has correct accessibility properties
  - Renders WhatsApp variant correctly

#### `components/Accordion.test.tsx`
- **Purpose**: Tests the expandable accordion component
- **Coverage**: Expand/collapse, multiple items, accessibility
- **Key Tests**:
  - Renders all items
  - Shows/hides answers on click
  - Allows multiple items to be expanded
  - Has correct accessibility properties
  - Updates accessibility labels when expanded
  - Handles empty items array
  - Handles long content

#### `components/HeroSection.test.tsx`
- **Purpose**: Tests the hero section component
- **Coverage**: Title, subtitle, description, children rendering
- **Key Tests**:
  - Renders with title only
  - Renders with title and subtitle
  - Renders with all props
  - Renders children when provided
  - Handles empty title
  - Handles long text content
  - Handles special characters

### 3. Page Tests

#### `pages/index.test.tsx`
- **Purpose**: Tests the home page
- **Coverage**: Content rendering, navigation, CTA buttons
- **Key Tests**:
  - Renders main title "Snackua"
  - Renders tagline from content
  - Renders all benefits
  - Renders navigation cards
  - Renders card descriptions
  - Renders CTA section
  - Has proper accessibility labels

#### `pages/our-story.test.tsx`
- **Purpose**: Tests the our story page
- **Coverage**: Content sections, navigation
- **Key Tests**:
  - Renders main title and subtitle
  - Renders all story sections
  - Renders section content
  - Has back button
  - Handles multiple sections correctly

#### `pages/ingredients.test.tsx`
- **Purpose**: Tests the ingredients page
- **Coverage**: Ingredient display, benefits, navigation
- **Key Tests**:
  - Renders main title and subtitle
  - Renders all ingredients
  - Renders ingredient descriptions
  - Renders ingredient benefits
  - Has back button
  - Handles multiple ingredients correctly

#### `pages/faqs.test.tsx`
- **Purpose**: Tests the FAQs page
- **Coverage**: Accordion functionality, content display
- **Key Tests**:
  - Renders main title and subtitle
  - Renders all FAQ questions
  - Shows/hides answers on click
  - Allows multiple questions to be expanded
  - Has back button
  - Has proper accessibility properties

#### `pages/_layout.test.tsx`
- **Purpose**: Tests the root layout
- **Coverage**: Basic rendering, structure
- **Key Tests**:
  - Renders without crashing
  - Renders Stack component
  - Handles SafeAreaProvider
  - Renders StatusBar

### 4. Content Validation Tests

#### `content/content.test.ts`
- **Purpose**: Validates all content JSON files
- **Coverage**: Structure, data types, required fields
- **Key Tests**:
  - **home.json**: Required properties, valid data types, non-empty values
  - **our-story.json**: Sections structure, valid content
  - **ingredients.json**: Ingredients structure, benefits arrays
  - **products.json**: Product structure, nutrition data validation
  - **nutrition.json**: Tables structure, data validation
  - **faqs.json**: FAQs structure, question/answer pairs
  - **contact.json**: Contact info, social media, business hours
  - **policies.json**: Policy sections, last updated dates

## Test Commands

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch

# Run specific test category
npx jest __tests__/components/
npx jest __tests__/pages/
npx jest __tests__/styles/
npx jest __tests__/content/

# Generate test report
npm run test:report
```

## Test Coverage Goals

- **Statements**: > 80%
- **Branches**: > 70%
- **Functions**: > 80%
- **Lines**: > 80%

## Mock Data

All tests use mock data to ensure:
- Tests run independently
- No external dependencies
- Consistent test results
- Fast execution

## Accessibility Testing

All component tests include accessibility checks:
- Proper ARIA labels
- Correct roles
- Keyboard navigation support
- Screen reader compatibility

## Test Features

### 1. Component Interaction Testing
- Button press events
- Form interactions
- Navigation testing
- State changes

### 2. Content Validation
- JSON structure validation
- Required field checking
- Data type validation
- Content completeness

### 3. Responsive Design Testing
- Different screen sizes
- Platform-specific behavior
- Font loading
- Layout consistency

### 4. Error Handling
- Invalid props
- Missing data
- Network errors
- Edge cases

## Test Files Summary

| File | Tests | Purpose |
|------|-------|---------|
| `theme.test.ts` | 15+ | Design system validation |
| `analytics.test.ts` | 12+ | Analytics functionality |
| `content.test.ts` | 25+ | Content validation |
| `AppBar.test.tsx` | 8+ | Navigation header |
| `Card.test.tsx` | 8+ | Reusable card component |
| `CTAButton.test.tsx` | 12+ | Call-to-action button |
| `Accordion.test.tsx` | 10+ | Expandable accordion |
| `HeroSection.test.tsx` | 8+ | Hero section component |
| `index.test.tsx` | 10+ | Home page |
| `our-story.test.tsx` | 6+ | Our story page |
| `ingredients.test.tsx` | 8+ | Ingredients page |
| `faqs.test.tsx` | 10+ | FAQs page |
| `_layout.test.tsx` | 4+ | Root layout |

## Running Tests

### Prerequisites
- Node.js 18+
- npm or yarn
- Jest and React Native Testing Library installed

### Quick Start
```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run with coverage report
npm run test:coverage
```

### Development Workflow
```bash
# Run tests in watch mode during development
npm run test:watch

# Run specific test file
npx jest __tests__/components/AppBar.test.tsx

# Run tests for specific pattern
npx jest --testNamePattern="should render"
```

## Test Best Practices

1. **Descriptive Test Names**: Clear, specific test descriptions
2. **Arrange-Act-Assert**: Consistent test structure
3. **Mock External Dependencies**: Isolate units under test
4. **Test Edge Cases**: Handle error conditions
5. **Accessibility Testing**: Include a11y checks
6. **Content Validation**: Ensure data integrity
7. **Performance Testing**: Test with large datasets

## Continuous Integration

The test suite is designed to run in CI/CD pipelines:
- Fast execution (< 30 seconds)
- No external dependencies
- Clear pass/fail indicators
- Coverage reporting
- Parallel execution support

## Maintenance

### Adding New Tests
1. Create test file in appropriate directory
2. Follow naming convention: `*.test.tsx` or `*.test.ts`
3. Include comprehensive test cases
4. Update this documentation

### Updating Tests
1. Update test when component changes
2. Maintain test coverage goals
3. Update mock data as needed
4. Verify all tests pass

## Conclusion

This comprehensive test suite ensures the Snackua app is:
- **Reliable**: All components work as expected
- **Accessible**: Meets accessibility standards
- **Maintainable**: Easy to update and extend
- **Well-tested**: High coverage across all features
- **Production-ready**: Thoroughly validated before deployment

The test suite provides confidence in the app's functionality and helps catch issues early in the development process.
