import { HARMONY_MODES } from '../utils/colorUtils';

export default function ControlsBar({
  mode,
  count,
  onGenerate,
  onModeChange,
  onCountChange,
  onSave,
  isSaving,
}) {
  return (
    <div className="controls-bar">

      {/* Generate Button */}
      <button
        id="btn-generate-palette"
        onClick={onGenerate}
        className="btn-generate"
        title="Generate new palette (or press Space)"
      >
        <svg
          className="btn-generate-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
        </svg>
        Generate Palette
      </button>

      {/* Harmony Mode Selector */}
      <div className="harmony-selector">
        {Object.entries(HARMONY_MODES).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onModeChange(key)}
            className={`harmony-btn ${mode === key ? 'harmony-btn-active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Color Count */}
      <div className="count-control">
        <label className="count-label" htmlFor="color-count-select">
          Colors
        </label>
        <select
          id="color-count-select"
          value={count}
          onChange={(e) => onCountChange(e.target.value)}
          className="count-select"
        >
          {[3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Save Palette */}
      <button
        id="btn-save-palette"
        onClick={onSave}
        className={`btn-save ${isSaving ? 'btn-save-active' : ''}`}
      >
        <svg
          style={{ width: '1rem', height: '1rem' }}
          viewBox="0 0 24 24"
          fill={isSaving ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
        {isSaving ? 'Saved!' : 'Save Palette'}
      </button>
    </div>
  );
}
