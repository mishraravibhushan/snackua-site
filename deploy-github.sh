#!/bin/bash

echo "🚀 Deploying Snackua to GitHub Pages"
echo "===================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Run 'git init' first."
    exit 1
fi

# Get GitHub username
echo "Enter your GitHub username:"
read GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username is required"
    exit 1
fi

# Build the web version
echo "📦 Building web version..."
npm run build:web

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Add .nojekyll file
echo "📝 Adding .nojekyll file..."
echo "" > dist/.nojekyll

# Copy dist contents to root
echo "📋 Copying dist contents to root..."
cp -r dist/* . 2>/dev/null || true
cp dist/.nojekyll . 2>/dev/null || true

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy: Update website content"

# Add remote if not exists
echo "🔗 Setting up remote..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/$GITHUB_USERNAME/snackua-site.git

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo "========================="
    echo "Your site will be available at:"
    echo "https://$GITHUB_USERNAME.github.io/snackua-site"
    echo ""
    echo "Next steps:"
    echo "1. Go to: https://github.com/$GITHUB_USERNAME/snackua-site/settings/pages"
    echo "2. Set source to 'GitHub Actions'"
    echo "3. Add custom domain: snackua.com"
    echo "4. Configure DNS in GoDaddy with the provided records"
    echo ""
    echo "DNS Records for GoDaddy:"
    echo "Type: CNAME, Name: www, Value: $GITHUB_USERNAME.github.io"
    echo "Type: A, Name: @, Value: 185.199.108.153"
    echo "Type: A, Name: @, Value: 185.199.109.153"
    echo "Type: A, Name: @, Value: 185.199.110.153"
    echo "Type: A, Name: @, Value: 185.199.111.153"
else
    echo "❌ Push failed. Please check your GitHub repository setup."
    exit 1
fi
