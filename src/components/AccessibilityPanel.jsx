import { contrastRatio, wcagRating, getContrastTextColor } from '../utils/colorUtils';

export default function AccessibilityPanel({ colors }) {
  if (colors.length < 2) return null;

  const pairs = colors.map((color) => {
    const vsWhite  = contrastRatio(color.hex, '#FFFFFF');
    const vsBlack  = contrastRatio(color.hex, '#000000');
    const bestText = vsWhite >= vsBlack ? '#FFFFFF' : '#111118';
    const bestRatio = Math.max(vsWhite, vsBlack);
    return { color, vsWhite, vsBlack, bestText, bestRatio };
  });

  const wcagClass = (ratio) => {
    const r = wcagRating(ratio);
    if (r === 'AAA')      return 'wcag-badge wcag-aaa';
    if (r.startsWith('AA')) return 'wcag-badge wcag-aa';
    return 'wcag-badge wcag-fail';
  };

  const wcagLabel = (ratio) => {
    const r = wcagRating(ratio);
    return r === 'Fail' ? '✗ Fail' : `✓ ${r}`;
  };

  return (
    <section className="a11y-section">
      <h2 className="section-heading">
        <span className="section-heading-icon">♿</span>
        Accessibility &amp; Contrast
      </h2>

      <div className="a11y-grid">
        {pairs.map(({ color, vsWhite, vsBlack, bestText, bestRatio }) => (
          <div key={color.id} className="contrast-card">
            {/* Text preview on real background */}
            <div
              className="contrast-preview"
              style={{ backgroundColor: color.hex }}
            >
              <span className="contrast-text-large" style={{ color: bestText }}>
                Sample Text Aa
              </span>
              <span className="contrast-text-small" style={{ color: bestText }}>
                Body copy preview
              </span>
            </div>

            {/* Stats */}
            <div className="contrast-meta">
              <span className="contrast-hex">{color.hex}</span>
              <span className={wcagClass(bestRatio)}>
                {wcagLabel(bestRatio)}
              </span>
            </div>

            <div className="contrast-stats" style={{ padding: '0 0.75rem 0.6rem' }}>
              <span>
                vs White:{' '}
                <span className="contrast-stat-value">{vsWhite}:1</span>
              </span>
              <span>
                vs Black:{' '}
                <span className="contrast-stat-value">{vsBlack}:1</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
