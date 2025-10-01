const fs = require('fs');
const path = require('path');

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy assets to dist folder
const assetsDir = path.join(__dirname, '../assets');
const distDir = path.join(__dirname, '../dist');

console.log('📁 Copying assets to dist folder...');

// Copy images
if (fs.existsSync(path.join(assetsDir, 'images'))) {
  copyDir(path.join(assetsDir, 'images'), path.join(distDir, 'images'));
  console.log('✅ Images copied successfully');
} else {
  console.log('⚠️  No images folder found in assets');
}

// Copy other assets if they exist
if (fs.existsSync(path.join(assetsDir, 'fonts'))) {
  copyDir(path.join(assetsDir, 'fonts'), path.join(distDir, 'fonts'));
  console.log('✅ Fonts copied successfully');
}

console.log('🎉 Asset copying completed!');
