// Generates public/og-image.png (1200x630) for social sharing.
// Run: node scripts/gen-og.mjs   (needs `sharp`, installed only to build the image)
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const W = 1200;
const H = 630;

const bg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1B130E"/>
      <stop offset="1" stop-color="#2A2019"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.12" r="0.7">
      <stop offset="0" stop-color="#F59E0B" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#F59E0B" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="#F59E0B" fill-opacity="0.10"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="720" y="0" width="480" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- lockup wordmark next to the composited AURMAK logo -->
  <rect x="452" y="86" width="2" height="48" fill="#FFFFFF" fill-opacity="0.28"/>
  <text x="476" y="122" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="6" fill="#FFFFFF">AUTOMATIONS</text>

  <!-- headline -->
  <text x="80" y="322" font-family="Helvetica, Arial, sans-serif" font-size="74" font-weight="800" fill="#FFFFFF">Automation that runs</text>
  <text x="80" y="408" font-family="Helvetica, Arial, sans-serif" font-size="74" font-weight="800" fill="#FFFFFF"><tspan fill="#F59E0B">beside</tspan> your ERP.</text>

  <!-- supporting line -->
  <text x="82" y="476" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#D6C8B4">AI automation that runs alongside your existing systems,</text>
  <text x="82" y="516" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#D6C8B4">with a human on every exception.</text>

  <!-- url -->
  <text x="82" y="576" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="1" fill="#F59E0B">aurmak.com</text>

  <!-- accent bar -->
  <rect x="0" y="${H - 10}" width="${W}" height="10" fill="#F59E0B"/>
</svg>`;

const logoPng = await sharp(readFileSync('public/logo-footer.svg')).resize({ width: 360 }).png().toBuffer();

await sharp(Buffer.from(bg))
  .composite([{ input: logoPng, top: 72, left: 80 }])
  .png()
  .toFile('public/og-image.png');

console.log('Wrote public/og-image.png');

// Apple touch icon (180x180): warm navy tile with the amber A mark.
const icon = `
<svg width="180" height="180" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="7" fill="#201812"/>
  <path d="M7 23L16 7L25 23H19.5L16 16.5L12.5 23H7Z" fill="#F59E0B"/>
  <rect x="14" y="18" width="4" height="4" fill="#1B130E"/>
</svg>`;
await sharp(Buffer.from(icon)).png().toFile('public/apple-touch-icon.png');
console.log('Wrote public/apple-touch-icon.png');
