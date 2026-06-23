import { useClipboard } from '../hooks/useClipboard';

/**
 * SavedPalettes — Displays previously saved palettes from localStorage.
 */
export default function SavedPalettes({ palettes, onLoad, onDelete, onToast }) {
  const { copy, copiedId } = useClipboard(1200);

  if (palettes.length === 0) {
    return (
      <section className="px-6 pb-6">
        <h2 className="font-display font-bold text-white text-base mb-3 flex items-center gap-2">
          <span className="text-violet-400">♥</span>
          Saved Palettes
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-violet-500 text-white text-[0.6rem] font-bold">
            0
          </span>
        </h2>
        <div className="text-center py-8 bg-[#16161f] border border-dashed border-white/[0.08] rounded-xl text-[#5a5a80] text-sm">
          No saved palettes yet. Hit <strong className="text-[#a0a0c0]">"Save Palette"</strong> to keep a favorite!
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 pb-6">
      <h2 className="font-display font-bold text-white text-base mb-3 flex items-center gap-2">
        <span className="text-violet-400">♥</span>
        Saved Palettes
        <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-violet-500 text-white text-[0.6rem] font-bold">
          {palettes.length}
        </span>
      </h2>

      <div className="flex flex-col gap-2">
        {palettes.map((palette) => (
          <div
            key={palette.id}
            className="flex items-center gap-3 px-4 py-3 bg-[#16161f] border border-white/[0.07]
                       rounded-xl hover:border-violet-500/20 hover:bg-[#1c1c28] transition-all duration-150"
          >
            {/* Swatches */}
            <div className="flex gap-1 flex-1">
              {palette.colors.map((c, i) => (
                <button
                  key={i}
                  title={`Copy ${c.hex}`}
                  onClick={async () => {
                    const ok = await copy(c.hex, `${palette.id}-${i}`);
                    if (ok) onToast(`Copied ${c.hex}`, '✓');
                  }}
                  className={`flex-1 h-9 rounded-lg transition-all duration-150 hover:scale-y-110
                              ${copiedId === `${palette.id}-${i}` ? 'ring-2 ring-violet-400' : ''}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>

            {/* Mode tag */}
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full
                             bg-violet-500/10 text-violet-400 text-[0.6rem] font-bold tracking-wider capitalize shrink-0">
              {palette.mode}
            </span>

            {/* Actions */}
            <div className="flex gap-1.5 shrink-0">
              <button
                id={`btn-load-palette-${palette.id}`}
                onClick={() => { onLoad(palette); onToast('Palette loaded!', '🎨'); }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/[0.07]
                           text-[#a0a0c0] hover:border-violet-500/40 hover:text-violet-400 transition-all duration-150"
              >
                Load
              </button>
              <button
                id={`btn-delete-palette-${palette.id}`}
                onClick={() => onDelete(palette.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/[0.07]
                           text-[#a0a0c0] hover:border-red-500/40 hover:text-red-400 transition-all duration-150"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
