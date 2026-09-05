const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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


// Image filenames are stable (hero-banner.jpg never changes name), so browsers
// and the Pages CDN happily serve a stale copy for max-age=600 after the file
// behind it has been replaced — a redesigned banner appeared not to deploy.
// Stamp every reference with a hash of the file's own bytes, so replacing an
// image changes its URL and clients fetch it immediately. Runs after the export,
// rewriting the built output, because the bundle is already compiled by then.
function fingerprintImageUrls(distDir) {
  const imagesDir = path.join(distDir, 'images');
  if (!fs.existsSync(imagesDir)) return;

  const hashes = [];
  (function collect(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) { collect(full); continue; }
      const url = '/images/' + path.relative(imagesDir, full).split(path.sep).join('/');
      const hash = crypto.createHash('md5').update(fs.readFileSync(full)).digest('hex').slice(0, 8);
      hashes.push([url, hash]);
    }
  })(imagesDir);
  // Longest first, so a shorter path can never partially match a longer one.
  hashes.sort((a, b) => b[0].length - a[0].length);

  const targets = [];
  (function collect(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) { if (entry.name !== 'images') collect(full); continue; }
      if (/\.(js|html|json|css)$/.test(entry.name)) targets.push(full);
    }
  })(distDir);

  let files = 0;
  let refs = 0;
  for (const file of targets) {
    let src = fs.readFileSync(file, 'utf8');
    let touched = false;
    for (const [url, hash] of hashes) {
      // Skip any reference that already carries a version.
      const re = new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\?v=)', 'g');
      const found = src.match(re);
      if (found) { src = src.replace(re, `${url}?v=${hash}`); refs += found.length; touched = true; }
    }
    if (touched) { fs.writeFileSync(file, src); files++; }
  }
  console.log(`🔖 Cache-busted ${refs} image reference(s) across ${files} built file(s)`);
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

fingerprintImageUrls(distDir);

console.log('🎉 Asset copying completed!');
