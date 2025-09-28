# Deployment Guide - Snackua App

## Quick Start Commands

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platforms
npm run web      # Opens in browser
npm run ios      # iOS Simulator
npm run android  # Android Emulator
```

### Production Builds

#### Web Deployment (Vercel)
```bash
# Build web version
npm run build:web

# Deploy to Vercel (after installing Vercel CLI)
vercel --prod
```

#### Mobile App Builds (EAS)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS (first time only)
eas build:configure

# Build for specific platforms
npm run build:android  # Android AAB
npm run build:ios      # iOS IPA
npm run build:all      # Both platforms
```

## Step-by-Step Deployment

### 1. Web Deployment (Vercel)

1. **Build the web version:**
   ```bash
   npm run build:web
   ```

2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

3. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

4. **Configure custom domain:**
   - Go to Vercel dashboard
   - Add custom domain: `snackua.in`
   - Update DNS records as instructed

### 2. Android App (Google Play Store)

1. **Build signed AAB:**
   ```bash
   eas build --platform android --profile production
   ```

2. **Download the AAB file** from EAS dashboard

3. **Create Google Play Console account** (if not exists)

4. **Create new app:**
   - App name: "Snackua"
   - Package name: `com.snackua.app`
   - Category: Food & Drink

5. **Upload AAB file** to Play Console

6. **Create store listing:**
   - App description
   - Screenshots (use Expo's screenshot tool)
   - App icon (512x512 PNG)
   - Privacy policy URL: `https://snackua.in/policies`

7. **Configure app details:**
   - Content rating: Everyone
   - Target audience: All ages
   - Data safety: No data collected

8. **Submit for review**

### 3. iOS App (App Store)

1. **Build IPA:**
   ```bash
   eas build --platform ios --profile production
   ```

2. **Download the IPA file** from EAS dashboard

3. **Create App Store Connect account** (if not exists)

4. **Create new app:**
   - App name: "Snackua"
   - Bundle ID: `com.snackua.app`
   - SKU: `snackua-ios`

5. **Upload IPA file** using Transporter app or Xcode

6. **Create app store listing:**
   - App description
   - Screenshots for all device sizes
   - App icon (1024x1024 PNG)
   - Privacy policy URL: `https://snackua.in/policies`

7. **Configure app privacy:**
   - Data collection: No data collected
   - Third-party analytics: None

8. **Submit for review**

## Pre-Deployment Checklist

### Content Updates
- [ ] Update all content in `/content/*.json` files
- [ ] Verify WhatsApp number in `contact.json`
- [ ] Check all links and contact information
- [ ] Update privacy policy dates

### App Configuration
- [ ] Update app version in `app.json`
- [ ] Verify bundle identifiers
- [ ] Check app icons and splash screens
- [ ] Test all navigation flows

### Web Specific
- [ ] Verify SEO meta tags in `_layout.web.tsx`
- [ ] Test responsive design on different screen sizes
- [ ] Check all external links work
- [ ] Verify WhatsApp Web integration

### Mobile Specific
- [ ] Test on physical devices
- [ ] Verify deep linking works
- [ ] Check app permissions
- [ ] Test offline functionality

## Post-Deployment

### Web
- [ ] Test website at `https://snackua.in`
- [ ] Verify Google Analytics tracking
- [ ] Check page load speeds
- [ ] Test WhatsApp ordering flow

### Mobile
- [ ] Test app installation
- [ ] Verify all features work
- [ ] Check app store listings
- [ ] Monitor crash reports

## Monitoring & Analytics

### Web Analytics (GA4)
1. Set up Google Analytics 4
2. Add tracking code to web layout
3. Configure conversion goals for WhatsApp orders
4. Monitor page views and user behavior

### Mobile Analytics (Firebase)
1. Set up Firebase project
2. Configure crash reporting
3. Track user engagement
4. Monitor app performance

### App Store Optimization (ASO)
- Use relevant keywords in app descriptions
- Create compelling screenshots
- Encourage user reviews
- Regular app updates

## Troubleshooting

### Common Issues

**Build Failures:**
- Check EAS CLI version: `eas --version`
- Clear cache: `eas build --clear-cache`
- Check bundle identifier conflicts

**Web Deployment Issues:**
- Verify all imports are correct
- Check for TypeScript errors
- Test locally before deploying

**App Store Rejections:**
- Review Apple/Google guidelines
- Check privacy policy compliance
- Verify app functionality

### Support
- Email: hello@snackua.in
- WhatsApp: +91-9876543210
- Check Expo documentation for technical issues
