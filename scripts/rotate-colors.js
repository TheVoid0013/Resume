const fs = require('fs');
const path = require('path');
const CSS_PATH = path.join(__dirname, '..', 'css', 'main.css');

// Add as many palettes as you want — each needs all 6 variables
const palettes = [
  { name: 'Red Wine',   redWine: '#722F37', boneWhite: '#F5F0EB', deepEspresso: '#1C1010', dustyMauve: '#A89080', darkMerlot: '#5C4A4A', antiqueGold: '#C9A84C' },
  { name: 'Deep Teal',  redWine: '#0F4C4C', boneWhite: '#F0F5F3', deepEspresso: '#0A1414', dustyMauve: '#7FA8A0', darkMerlot: '#2E5555', antiqueGold: '#B8A94C' },
  { name: 'Slate Blue', redWine: '#3B4A6B', boneWhite: '#EEF1F5', deepEspresso: '#12151E', dustyMauve: '#8892A8', darkMerlot: '#3F4C5E', antiqueGold: '#C0A870' },
  { name: 'Forest',     redWine: '#2F5233', boneWhite: '#F2F5EE', deepEspresso: '#11170F', dustyMauve: '#8B9E7E', darkMerlot: '#4A5C3E', antiqueGold: '#C9A84C' },
  { name: 'Plum',       redWine: '#5B2A5C', boneWhite: '#F5EFF5', deepEspresso: '#1A0F1A', dustyMauve: '#9E80A0', darkMerlot: '#4A3A50', antiqueGold: '#C9A84C' },
  { name: 'Blush Pink', redWine: '#B8506B', boneWhite: '#F7EEF0', deepEspresso: '#1A0F12', dustyMauve: '#B08A94', darkMerlot: '#6B3A48', antiqueGold: '#C9A84C' },
];
// Deterministic "random" pick based on day of year — cycles daily
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / 86400000);
}
const today = new Date();
const palette = palettes[getDayOfYear(today) % palettes.length];
let css = fs.readFileSync(CSS_PATH, 'utf8');
css = css
  .replace(/--red-wine:\s*#[0-9A-Fa-f]{6};/, `--red-wine: ${palette.redWine};`)
  .replace(/--bone-white:\s*#[0-9A-Fa-f]{6};/, `--bone-white: ${palette.boneWhite};`)
  .replace(/--deep-espresso:\s*#[0-9A-Fa-f]{6};/, `--deep-espresso: ${palette.deepEspresso};`)
  .replace(/--dusty-mauve:\s*#[0-9A-Fa-f]{6};/, `--dusty-mauve: ${palette.dustyMauve};`)
  .replace(/--dark-merlot:\s*#[0-9A-Fa-f]{6};/, `--dark-merlot: ${palette.darkMerlot};`)
  .replace(/--antique-gold:\s*#[0-9A-Fa-f]{6};/, `--antique-gold: ${palette.antiqueGold};`);
fs.writeFileSync(CSS_PATH, css);
console.log(`Applied palette: ${palette.name}`);
