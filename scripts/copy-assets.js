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


// Link crawlers — Facebook, WhatsApp, Instagram, Google — do not run JavaScript,
// so anything added to <head> after React mounts is invisible to them and a
// shared snackua.com link previews as a bare URL with no title, description or
// image. Since every order starts life as a shared WhatsApp link, these tags
// have to be in the HTML as served.
//
// They are stamped in here rather than in app/+html.tsx because that file is
// only honoured under static rendering (web.output: "static"), and this app
// exports as a single-page bundle. Runs before fingerprintImageUrls so the
// og:image URL picks up a content hash like every other image reference.
function injectMetaTags(distDir) {
  const htmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(htmlPath)) return;

  const siteUrl = 'https://snackua.com';
  const title = 'Snackua | Baked Thekua Cookies, Made in Bengaluru';
  const description =
    'The thekua you grew up on, baked instead of fried. Made with ghee, palm jaggery and whole wheat atta — no maida, no refined oil. Box of 8, delivered across Bengaluru.';
  const ogImage = `${siteUrl}/images/hero-banner.jpg`;

  // Proves ownership of snackua.com to Meta, which gates Aggregated Event
  // Measurement (the iOS conversion setup). Public by design — it is meant to
  // be readable in page source, so it is not a secret in this public repo.
  // Meta re-checks periodically, so it has to stay here permanently.
  const facebookDomainVerification = 'z0phod6ajt7f2vmkfqfmt3orj8185k';

  const tags = [
    `<meta name="facebook-domain-verification" content="${facebookDomainVerification}" />`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${siteUrl}/" />`,
    `<meta property="og:site_name" content="Snackua" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1920" />`,
    `<meta property="og:image:height" content="1080" />`,
    `<meta property="og:image:alt" content="A box of Snackua baked thekua cookies" />`,
    `<meta property="og:url" content="${siteUrl}/" />`,
    `<meta property="og:type" content="website" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
  ].join('\n    ');

  let html = fs.readFileSync(htmlPath, 'utf8');

  if (html.includes('property="og:title"')) {
    console.log('🔖 Meta tags already present, skipping');
    return;
  }

  // Expo emits a bare <title>Snackua</title>; replace it rather than adding a
  // second one, which crawlers resolve inconsistently.
  html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
  html = html.replace('</head>', `  ${tags}\n  </head>`);

  fs.writeFileSync(htmlPath, html);
  console.log('🔖 Injected SEO and Open Graph tags into index.html');
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

injectMetaTags(distDir);

fingerprintImageUrls(distDir);

console.log('🎉 Asset copying completed!');
