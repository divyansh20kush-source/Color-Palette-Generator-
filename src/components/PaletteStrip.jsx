import { useState } from 'react';
import { getContrastTextColor, approximateColorName } from '../utils/colorUtils';
import { useClipboard } from '../hooks/useClipboard';

/* ── Single color swatch card ── */
function ColorCard({ color, onLock, onToast }) {
  const { copy, copiedId } = useClipboard(1600);
  const [hovered, setHovered] = useState(false);

  const textColor  = getContrastTextColor(color.hex);
  const colorName  = approximateColorName(color.hex);
  const isCopied   = copiedId === color.id;

  const handleCopyHex = async (e) => {
    e.stopPropagation();
    const ok = await copy(color.hex, color.id);
    if (ok) onToast(`Copied ${color.hex}!`, '✓');
  };

  const handleCopyRgb = async (e) => {
    e.stopPropagation();
    const val = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    const ok  = await copy(val, `rgb-${color.id}`);
    if (ok) onToast(`Copied ${val}`, '✓');
  };

  const handleCopyHsl = async (e) => {
    e.stopPropagation();
    const val = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
    const ok  = await copy(val, `hsl-${color.id}`);
    if (ok) onToast(`Copied ${val}`, '✓');
  };

  const handleLock = (e) => {
    e.stopPropagation();
    onLock(color.id);
  };

  return (
    <div
      className="color-card"
      style={{ backgroundColor: color.hex }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCopyHex}
      title={`Click to copy ${color.hex}`}
    >
      {/* Gradient overlay */}
      <div className="color-card-overlay" />

      {/* Lock indicator */}
      {color.locked && (
        <div className="lock-badge">🔒</div>
      )}

      {/* Hover action buttons */}
      <div className="card-actions">
        <button
          id={`btn-lock-${color.id}`}
          onClick={handleLock}
          title={color.locked ? 'Unlock color' : 'Lock color'}
          className={`card-action-btn ${color.locked ? 'card-action-btn-locked' : ''}`}
        >
          {color.locked ? '🔒' : '🔓'}
        </button>

        <button
          id={`btn-copy-rgb-${color.id}`}
          onClick={handleCopyRgb}
          title="Copy RGB value"
          className="card-action-btn card-action-label"
        >
          RGB
        </button>

        <button
          id={`btn-copy-hsl-${color.id}`}
          onClick={handleCopyHsl}
          title="Copy HSL value"
          className="card-action-btn card-action-label"
        >
          HSL
        </button>
      </div>

      {/* Color info strip */}
      <div className="color-card-info">
        {/* Hex badge */}
        <div className={`hex-badge ${isCopied ? 'hex-badge-copied' : ''}`}>
          <span className={`hex-text ${isCopied ? 'hex-text-copied' : ''}`}>
            {isCopied ? '✓ Copied!' : color.hex}
          </span>
          {!isCopied && (
            <svg
              className="hex-copy-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </div>

        {/* Color name */}
        <p className="color-name-label">{colorName}</p>
      </div>
    </div>
  );
}

/* ── Palette strip wrapper ── */
export default function PaletteStrip({ colors, onLock, onToast }) {
  return (
    <div className="palette-strip">
      <div className="palette-container">
        {colors.map((color) => (
          <ColorCard
            key={color.id}
            color={color}
            onLock={onLock}
            onToast={onToast}
          />
        ))}
      </div>
    </div>
  );
}
