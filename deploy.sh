#!/bin/bash

echo "🚀 Snackua App Deployment Script"
echo "================================"

# Build the web version
echo "📦 Building web version..."
npm run build:web

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Add redirects file for SPA routing
echo "📝 Adding redirects file..."
echo "/*    /index.html   200" > dist/_redirects

echo ""
echo "🎯 Deployment Options:"
echo "1. Upload 'dist/' folder contents to your GoDaddy hosting"
echo "2. Deploy to Vercel: cd dist && vercel --prod"
echo "3. Deploy to Netlify: cd dist && netlify deploy --prod --dir ."
echo ""
echo "📁 Files ready in 'dist/' folder:"
ls -la dist/

echo ""
echo "🌐 Test locally: cd dist && npx serve -s . -p 3000"
echo "📖 See GODADDY_DEPLOYMENT.md for detailed instructions"
