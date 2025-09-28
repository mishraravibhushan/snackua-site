# 🚀 Deploying Snackua App to GoDaddy Domain

## 📋 Prerequisites
- ✅ GoDaddy domain purchased
- ✅ Web build completed (`dist/` folder ready)
- ✅ Domain DNS access

## 🎯 Deployment Options

### Option 1: GoDaddy Hosting (Easiest)
If you have GoDaddy hosting plan:

1. **Access GoDaddy File Manager**
   - Log into your GoDaddy account
   - Go to "My Products" → "Web Hosting"
   - Click "Manage" → "File Manager"

2. **Upload Files**
   - Navigate to `public_html` folder
   - Upload all contents from `dist/` folder
   - Make sure `index.html` is in the root

3. **Test Your Site**
   - Visit your domain: `https://yourdomain.com`
   - Check all pages work correctly

### Option 2: Vercel (Recommended - Free & Fast)
Better performance and easier management:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from dist folder**
   ```bash
   cd dist
   vercel --prod
   ```

3. **Connect Custom Domain**
   - Go to Vercel dashboard
   - Add your GoDaddy domain
   - Update DNS records as instructed

### Option 3: Netlify (Alternative)
Another great free option:

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**
   ```bash
   cd dist
   netlify deploy --prod --dir .
   ```

## 🔧 GoDaddy DNS Configuration

### For Vercel/Netlify Deployment:

1. **Log into GoDaddy DNS Management**
   - Go to "My Products" → "DNS"
   - Find your domain and click "Manage"

2. **Add CNAME Record**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com (or netlify equivalent)
   TTL: 1 Hour
   ```

3. **Add A Record (Root Domain)**
   ```
   Type: A
   Name: @
   Value: 76.76.19.61 (Vercel IP) or Netlify IP
   TTL: 1 Hour
   ```

## 📁 Files to Upload

Your `dist/` folder contains:
```
dist/
├── index.html          # Main HTML file
├── favicon.ico         # Website icon
├── metadata.json       # App metadata
├── assets/             # Static assets
└── _expo/              # JavaScript and CSS bundles
    ├── static/css/     # Stylesheets
    └── static/js/      # JavaScript files
```

## 🚀 Quick Deployment Steps

### Step 1: Test Locally
```bash
# Serve the built files locally
cd dist
npx serve -s . -p 3000
# Visit http://localhost:3000
```

### Step 2: Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from dist folder
cd dist
vercel --prod

# Follow prompts to connect your domain
```

### Step 3: Configure Domain
1. In Vercel dashboard, go to your project
2. Click "Domains" tab
3. Add your GoDaddy domain
4. Update DNS records as shown

## 🔍 Post-Deployment Checklist

- [ ] Website loads at your domain
- [ ] All pages navigate correctly
- [ ] WhatsApp button works
- [ ] Mobile responsive design
- [ ] Fast loading speed
- [ ] HTTPS enabled
- [ ] Favicon displays correctly

## 🛠️ Troubleshooting

### Common Issues:

**1. 404 Errors on Page Refresh**
- Add `_redirects` file in `dist/` folder:
  ```
  /*    /index.html   200
  ```

**2. CSS/JS Not Loading**
- Check file paths in `index.html`
- Ensure all files uploaded correctly

**3. Domain Not Working**
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Clear browser cache

**4. HTTPS Issues**
- Most hosting providers auto-enable HTTPS
- Check SSL certificate status

## 📱 Mobile App Deployment

For mobile apps, you'll need to:

1. **Build with EAS**
   ```bash
   npm install -g eas-cli
   eas login
   eas build:configure
   eas build --platform android
   eas build --platform ios
   ```

2. **Submit to App Stores**
   - Android: Google Play Console
   - iOS: App Store Connect

## 🎯 Next Steps

1. **Deploy web version** to your domain
2. **Test thoroughly** on different devices
3. **Set up analytics** (Google Analytics)
4. **Build mobile apps** for app stores
5. **Update content** via JSON files as needed

## 📞 Support

If you encounter issues:
- Check GoDaddy support documentation
- Vercel/Netlify have excellent support
- Review the main README.md for app details

Your Snackua app is ready to go live! 🎉
