#!/usr/bin/env node

/**
 * Test Runner for Snackua App
 * 
 * This script runs all tests and provides a comprehensive test report
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Snackua App Test Runner');
console.log('==========================\n');

// Test categories
const testCategories = [
  {
    name: 'Theme & Utilities',
    pattern: '__tests__/styles/**/*.test.ts',
    description: 'Testing theme configuration and utility functions'
  },
  {
    name: 'Components',
    pattern: '__tests__/components/**/*.test.tsx',
    description: 'Testing reusable UI components'
  },
  {
    name: 'Pages',
    pattern: '__tests__/pages/**/*.test.tsx',
    description: 'Testing app pages and screens'
  },
  {
    name: 'Content',
    pattern: '__tests__/content/**/*.test.ts',
    description: 'Testing content validation and structure'
  }
];

// Run tests for each category
async function runTests() {
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  for (const category of testCategories) {
    console.log(`📋 ${category.name}`);
    console.log(`   ${category.description}`);
    
    try {
      const result = execSync(`npx jest ${category.pattern} --verbose --passWithNoTests`, {
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      console.log('   ✅ All tests passed\n');
      passedTests++;
    } catch (error) {
      console.log('   ❌ Some tests failed');
      console.log(`   ${error.stdout || error.message}\n`);
      failedTests++;
    }
    
    totalTests++;
  }

  // Run all tests together
  console.log('🚀 Running All Tests');
  console.log('===================');
  
  try {
    const result = execSync('npx jest --coverage --verbose', {
      encoding: 'utf8',
      stdio: 'inherit'
    });
    
    console.log('\n✅ All tests completed successfully!');
  } catch (error) {
    console.log('\n❌ Some tests failed. Check the output above for details.');
    process.exit(1);
  }
}

// Generate test report
function generateTestReport() {
  const reportPath = path.join(__dirname, '..', 'test-report.md');
  
  const report = `# Snackua App Test Report

Generated on: ${new Date().toISOString()}

## Test Coverage

This report shows the test coverage for the Snackua app.

### Test Categories

${testCategories.map(cat => `- **${cat.name}**: ${cat.description}`).join('\n')}

### Running Tests

\`\`\`bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test category
npx jest __tests__/components/
npx jest __tests__/pages/
npx jest __tests__/styles/
npx jest __tests__/content/
\`\`\`

### Test Files

#### Components
- AppBar.test.tsx - Tests for navigation header component
- Card.test.tsx - Tests for reusable card component
- CTAButton.test.tsx - Tests for call-to-action button component
- Accordion.test.tsx - Tests for expandable accordion component
- HeroSection.test.tsx - Tests for hero section component

#### Pages
- index.test.tsx - Tests for home page
- our-story.test.tsx - Tests for our story page
- ingredients.test.tsx - Tests for ingredients page
- faqs.test.tsx - Tests for FAQs page
- _layout.test.tsx - Tests for root layout

#### Utilities & Styles
- theme.test.ts - Tests for theme configuration
- analytics.test.ts - Tests for analytics utilities

#### Content
- content.test.ts - Tests for content validation

### Test Commands

\`\`\`bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run in watch mode for development
npm run test:watch

# Run tests for CI/CD
npm run test:ci
\`\`\`

### Coverage Goals

- **Statements**: > 80%
- **Branches**: > 70%
- **Functions**: > 80%
- **Lines**: > 80%

### Notes

- All tests use React Native Testing Library
- Tests are configured with Jest
- Mock data is used for content testing
- Accessibility testing is included
- Component interaction testing is comprehensive
`;

  fs.writeFileSync(reportPath, report);
  console.log(`📊 Test report generated: ${reportPath}`);
}

// Main execution
async function main() {
  try {
    await runTests();
    generateTestReport();
  } catch (error) {
    console.error('❌ Test runner failed:', error.message);
    process.exit(1);
  }
}

main();
