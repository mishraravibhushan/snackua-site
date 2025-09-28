#!/usr/bin/env node

/**
 * Simple Test Runner for Snackua App
 * 
 * This script validates the app structure and content without complex Jest setup
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Snackua App - Simple Test Runner');
console.log('====================================\n');

// Test results
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function runTest(testName, testFunction) {
  totalTests++;
  try {
    testFunction();
    console.log(`✅ ${testName}`);
    passedTests++;
  } catch (error) {
    console.log(`❌ ${testName}: ${error.message}`);
    failedTests++;
  }
}

// Test 1: Check if all required files exist
runTest('Required files exist', () => {
  const requiredFiles = [
    'app/index.tsx',
    'app/our-story.tsx',
    'app/ingredients.tsx',
    'app/products.tsx',
    'app/nutrition.tsx',
    'app/why-jaggery.tsx',
    'app/how-we-make.tsx',
    'app/faqs.tsx',
    'app/contact.tsx',
    'app/policies.tsx',
    'app/_layout.tsx',
    'components/AppBar.tsx',
    'components/Card.tsx',
    'components/CTAButton.tsx',
    'components/Accordion.tsx',
    'components/HeroSection.tsx',
    'styles/theme.ts',
    'utils/analytics.ts',
    'content/home.json',
    'content/our-story.json',
    'content/ingredients.json',
    'content/products.json',
    'content/nutrition.json',
    'content/why-jaggery.json',
    'content/how-we-make.json',
    'content/faqs.json',
    'content/contact.json',
    'content/policies.json'
  ];

  requiredFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      throw new Error(`Missing file: ${file}`);
    }
  });
});

// Test 2: Check content JSON files are valid
runTest('Content JSON files are valid', () => {
  const contentFiles = [
    'content/home.json',
    'content/our-story.json',
    'content/ingredients.json',
    'content/products.json',
    'content/nutrition.json',
    'content/why-jaggery.json',
    'content/how-we-make.json',
    'content/faqs.json',
    'content/contact.json',
    'content/policies.json'
  ];

  contentFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      JSON.parse(content);
    } catch (error) {
      throw new Error(`Invalid JSON in ${file}: ${error.message}`);
    }
  });
});

// Test 3: Check home.json has required fields
runTest('home.json has required fields', () => {
  const homeContent = JSON.parse(fs.readFileSync('content/home.json', 'utf8'));
  const requiredFields = ['tagline', 'benefits', 'heroDescription', 'ctaText', 'ctaButtonText'];
  
  requiredFields.forEach(field => {
    if (!homeContent[field]) {
      throw new Error(`Missing field in home.json: ${field}`);
    }
  });
});

// Test 4: Check products.json has valid structure
runTest('products.json has valid structure', () => {
  const productsContent = JSON.parse(fs.readFileSync('content/products.json', 'utf8'));
  
  if (!productsContent.products || !Array.isArray(productsContent.products)) {
    throw new Error('products.json must have products array');
  }
  
  productsContent.products.forEach((product, index) => {
    const requiredFields = ['id', 'name', 'description', 'price', 'weight', 'servings', 'nutrition', 'allergens', 'ingredients'];
    requiredFields.forEach(field => {
      if (!product[field]) {
        throw new Error(`Product ${index} missing field: ${field}`);
      }
    });
  });
});

// Test 5: Check theme.ts exports required objects
runTest('theme.ts exports required objects', () => {
  const themeContent = fs.readFileSync('styles/theme.ts', 'utf8');
  
  const requiredExports = ['colors', 'fonts', 'spacing', 'borderRadius', 'shadows', 'typography'];
  requiredExports.forEach(exportName => {
    if (!themeContent.includes(`export const ${exportName}`)) {
      throw new Error(`Missing export in theme.ts: ${exportName}`);
    }
  });
});

// Test 6: Check analytics.ts exports required functions
runTest('analytics.ts exports required functions', () => {
  const analyticsContent = fs.readFileSync('utils/analytics.ts', 'utf8');
  
  const requiredFunctions = ['trackEvent', 'trackPageView', 'trackButtonClick', 'trackOrderIntent'];
  requiredFunctions.forEach(funcName => {
    if (!analyticsContent.includes(`export const ${funcName}`)) {
      throw new Error(`Missing function in analytics.ts: ${funcName}`);
    }
  });
});

// Test 7: Check components have proper structure
runTest('Components have proper structure', () => {
  const components = [
    'components/AppBar.tsx',
    'components/Card.tsx',
    'components/CTAButton.tsx',
    'components/Accordion.tsx',
    'components/HeroSection.tsx'
  ];

  components.forEach(component => {
    const content = fs.readFileSync(component, 'utf8');
    
    if (!content.includes('export default')) {
      throw new Error(`${component} missing default export`);
    }
    
    if (!content.includes('React')) {
      throw new Error(`${component} missing React import`);
    }
  });
});

// Test 8: Check app pages have proper structure
runTest('App pages have proper structure', () => {
  const pages = [
    'app/index.tsx',
    'app/our-story.tsx',
    'app/ingredients.tsx',
    'app/products.tsx',
    'app/nutrition.tsx',
    'app/why-jaggery.tsx',
    'app/how-we-make.tsx',
    'app/faqs.tsx',
    'app/contact.tsx',
    'app/policies.tsx'
  ];

  pages.forEach(page => {
    const content = fs.readFileSync(page, 'utf8');
    
    if (!content.includes('export default')) {
      throw new Error(`${page} missing default export`);
    }
    
    if (!content.includes('React')) {
      throw new Error(`${page} missing React import`);
    }
  });
});

// Test 9: Check package.json has required scripts
runTest('package.json has required scripts', () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['start', 'android', 'ios', 'web', 'build:web', 'test'];
  
  requiredScripts.forEach(script => {
    if (!packageJson.scripts[script]) {
      throw new Error(`Missing script in package.json: ${script}`);
    }
  });
});

// Test 10: Check app.json has required configuration
runTest('app.json has required configuration', () => {
  const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'));
  
  if (!appJson.expo) {
    throw new Error('app.json missing expo configuration');
  }
  
  if (!appJson.expo.name) {
    throw new Error('app.json missing app name');
  }
  
  if (!appJson.expo.slug) {
    throw new Error('app.json missing app slug');
  }
});

// Test Summary
console.log('\n📊 Test Summary');
console.log('================');
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (failedTests === 0) {
  console.log('\n🎉 All tests passed! The app structure is valid.');
} else {
  console.log(`\n⚠️  ${failedTests} test(s) failed. Please check the errors above.`);
  process.exit(1);
}
