export function randomHSL(hue = null) {
  const h = hue !== null ? hue : Math.floor(Math.random() * 360);
  const s = 45 + Math.floor(Math.random() * 40); // 45–85%
  const l = 35 + Math.floor(Math.random() * 35); // 35–70%
  return { h, s, l };
}

/** Convert HSL to RGB (0-255 values) */
export function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return {
    r: Math.round(f(0) * 255),
    g: Math.round(f(8) * 255),
    b: Math.round(f(4) * 255),
  };
}

/** Convert RGB to Hex */
export function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

/** Convert Hex to RGB */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

/** Convert RGB to HSL */
export function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/** Full color object from HSL */
export function buildColor(h, s, l) {
  const rgb = hslToRgb(h, s, l);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  return {
    id: Math.random().toString(36).slice(2),
    hex,
    rgb,
    hsl: { h, s, l },
    locked: false,
  };
}

/** Luminance for contrast calculations */
export function relativeLuminance(r, g, b) {
  const toLinear = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/** WCAG contrast ratio */
export function contrastRatio(hex1, hex2) {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  const l1 = relativeLuminance(c1.r, c1.g, c1.b);
  const l2 = relativeLuminance(c2.r, c2.g, c2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return +((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

/** Determine if text on a background should be white or dark */
export function getContrastTextColor(hex) {
  const { r, g, b } = hexToRgb(hex);
  const lum = relativeLuminance(r, g, b);
  return lum > 0.35 ? '#111118' : '#ffffff';
}

/** Get WCAG rating */
export function wcagRating(ratio) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Large';
  return 'Fail';
}

/* ---- Harmony generators ---- */

function clampHue(h) {
  return ((h % 360) + 360) % 360;
}

export const HARMONY_MODES = {
  random: 'Random',
  analogous: 'Analogous',
  complementary: 'Complementary',
  triadic: 'Triadic',
  tetradic: 'Tetradic',
  monochromatic: 'Monochromatic',
  splitComplementary: 'Split-Complementary',
};

export function generatePalette(count, mode, existingColors = []) {
  const palette = [];

  for (let i = 0; i < count; i++) {
    if (existingColors[i]?.locked) {
      palette.push({ ...existingColors[i] });
      continue;
    }

    let h, s, l;

    // Pick a base hue either from a locked color or random
    const baseHue =
      existingColors.find((c) => c.locked)?.hsl?.h ?? Math.floor(Math.random() * 360);

    switch (mode) {
      case 'analogous': {
        const spread = 30;
        h = clampHue(baseHue + (i - Math.floor(count / 2)) * spread);
        s = 55 + Math.floor(Math.random() * 25);
        l = 40 + Math.floor(Math.random() * 25);
        break;
      }
      case 'complementary': {
        h = clampHue(baseHue + (i % 2 === 0 ? 0 : 180) + Math.floor(Math.random() * 20) - 10);
        s = 50 + Math.floor(Math.random() * 30);
        l = 38 + Math.floor(Math.random() * 28);
        break;
      }
      case 'triadic': {
        h = clampHue(baseHue + (i % 3) * 120 + Math.floor(Math.random() * 15) - 7);
        s = 55 + Math.floor(Math.random() * 25);
        l = 38 + Math.floor(Math.random() * 25);
        break;
      }
      case 'tetradic': {
        h = clampHue(baseHue + (i % 4) * 90 + Math.floor(Math.random() * 12) - 6);
        s = 50 + Math.floor(Math.random() * 30);
        l = 38 + Math.floor(Math.random() * 28);
        break;
      }
      case 'monochromatic': {
        h = clampHue(baseHue + Math.floor(Math.random() * 10) - 5);
        s = 40 + Math.floor(Math.random() * 35);
        l = 20 + i * (55 / Math.max(count - 1, 1));
        break;
      }
      case 'splitComplementary': {
        const offsets = [0, 150, 210];
        h = clampHue(baseHue + offsets[i % 3] + Math.floor(Math.random() * 15) - 7);
        s = 55 + Math.floor(Math.random() * 25);
        l = 38 + Math.floor(Math.random() * 25);
        break;
      }
      default: {
        // random
        h = Math.floor(Math.random() * 360);
        s = 45 + Math.floor(Math.random() * 40);
        l = 35 + Math.floor(Math.random() * 35);
      }
    }

    palette.push(buildColor(h, s, l));
  }

  return palette;
}

/** Approximate color name from hue */
export function approximateColorName(hex) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  if (l < 10) return 'Onyx Black';
  if (l > 90) return 'Pearl White';
  if (s < 12) {
    if (l < 30) return 'Charcoal';
    if (l < 60) return 'Slate Gray';
    return 'Silver Mist';
  }

  const hueNames = [
    [15, 'Crimson Red'],
    [30, 'Scarlet'],
    [45, 'Burnt Orange'],
    [60, 'Amber'],
    [75, 'Golden Yellow'],
    [90, 'Chartreuse'],
    [120, 'Emerald Green'],
    [150, 'Mint Green'],
    [165, 'Seafoam'],
    [180, 'Cyan Teal'],
    [195, 'Sky Blue'],
    [210, 'Azure'],
    [240, 'Royal Blue'],
    [255, 'Indigo'],
    [270, 'Violet'],
    [285, 'Purple'],
    [300, 'Magenta'],
    [315, 'Hot Pink'],
    [330, 'Rose Pink'],
    [345, 'Ruby Red'],
    [360, 'Crimson Red'],
  ];

  for (const [maxH, name] of hueNames) {
    if (h <= maxH) {
      if (l < 35) return `Deep ${name.split(' ').pop()}`;
      if (l > 65) return `Light ${name.split(' ').pop()}`;
      return name;
    }
  }
  return 'Custom Hue';
}
