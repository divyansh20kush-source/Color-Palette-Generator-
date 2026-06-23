import { approximateColorName } from '../utils/colorUtils';
import { useClipboard } from '../hooks/useClipboard';

export default function ColorDetailsGrid({ colors, onToast }) {
  const { copy, copiedId } = useClipboard(1500);

  const handleCopy = async (text, id) => {
    const ok = await copy(text, id);
    if (ok) onToast(`Copied ${text}`, '✓');
  };

  return (
    <div className="details-grid">
      {colors.map((color) => {
        const hexVal = color.hex;
        const rgbVal = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
        const hslVal = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;

        const rows = [
          { label: 'HEX', value: hexVal, id: `hex-detail-${color.id}` },
          { label: 'RGB', value: rgbVal, id: `rgb-detail-${color.id}` },
          { label: 'HSL', value: hslVal, id: `hsl-detail-${color.id}` },
        ];

        return (
          <div key={color.id} className="detail-card">
            {/* Swatch */}
            <div
              className="detail-swatch"
              style={{ backgroundColor: color.hex }}
            />

            {/* Copyable rows */}
            {rows.map(({ label, value, id }) => (
              <div
                key={label}
                id={id}
                onClick={() => handleCopy(value, id)}
                className={`detail-row ${copiedId === id ? 'detail-row-copied' : ''}`}
              >
                <span className="detail-label">{label}</span>
                <span className={`detail-value ${copiedId === id ? 'detail-value-copied' : ''}`}>
                  {copiedId === id ? '✓ Copied' : value}
                </span>
              </div>
            ))}

            {/* Color name */}
            <p className="detail-color-name">
              {approximateColorName(color.hex)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
