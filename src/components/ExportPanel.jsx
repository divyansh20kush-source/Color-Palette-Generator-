import { useClipboard } from '../hooks/useClipboard';

export default function ExportPanel({ colors, onToast }) {
  const { copy, copiedId } = useClipboard(1500);

  const cssVars = colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n');
  const cssBlock = `:root {\n${cssVars}\n}`;

  const tailwindBlock =
    `// tailwind.config.js\nextend: {\n  colors: {\n` +
    colors.map((c, i) => `    palette${i + 1}: '${c.hex}',`).join('\n') +
    `\n  }\n}`;

  const jsonBlock = JSON.stringify(
    colors.map((c, i) => ({
      name: `color-${i + 1}`,
      hex: c.hex,
      rgb: c.rgb,
      hsl: c.hsl,
    })),
    null,
    2
  );

  const blocks = [
    { id: 'css',      label: 'CSS Variables',   code: cssBlock      },
    { id: 'tailwind', label: 'Tailwind Config',  code: tailwindBlock },
    { id: 'json',     label: 'JSON',             code: jsonBlock     },
  ];

  return (
    <section className="export-section">
      <h2 className="section-heading">
        <span className="section-heading-icon">⬇</span>
        Export Palette
      </h2>

      <div className="export-panel">
        <div className="export-grid">
          {blocks.map(({ id, label, code }) => (
            <div key={id} className="export-block">
              <div className="export-block-header">
                <span className="export-block-label">{label}</span>
                <button
                  id={`btn-copy-export-${id}`}
                  onClick={async () => {
                    const ok = await copy(code, id);
                    if (ok) onToast(`Copied ${label}!`, '✓');
                  }}
                  className={`export-copy-btn ${copiedId === id ? 'export-copy-btn-copied' : ''}`}
                >
                  {copiedId === id ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <pre className="export-code">{code}</pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
