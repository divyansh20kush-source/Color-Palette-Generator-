import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ControlsBar from './components/ControlsBar';
import PaletteStrip from './components/PaletteStrip';
import ColorDetailsGrid from './components/ColorDetailsGrid';
import AccessibilityPanel from './components/AccessibilityPanel';
import ExportPanel from './components/ExportPanel';
import SavedPalettes from './components/SavedPalettes';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { usePalette } from './hooks/usePalette';

/* Tab definitions */
const TABS = [
  { id: 'details',     label: '🎨 Color Details'   },
  { id: 'saved',       label: '♥ Saved Palettes'   },
  { id: 'a11y',        label: '♿ Accessibility'    },
  { id: 'export',      label: '⬇ Export'           },
];

export default function App() {
  const {
    colors,
    count,
    mode,
    savedPalettes,
    generate,
    toggleLock,
    changeCount,
    changeMode,
    savePalette,
    deleteSaved,
    loadSaved,
  } = usePalette(5);

  const [activeTab, setActiveTab]   = useState('details');
  const [toast, setToast]           = useState({ visible: false, message: '', icon: '' });
  const [isSaving, setIsSaving]     = useState(false);

  /* Show a temporary toast */
  const showToast = useCallback((message, icon = '✓') => {
    setToast({ visible: true, message, icon });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2000);
  }, []);

  /* Save with brief visual feedback */
  const handleSave = () => {
    savePalette();
    setIsSaving(true);
    showToast('Palette saved!', '♥');
    setTimeout(() => setIsSaving(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-white">
      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Hero ── */}
      <Hero />

      {/* ── Controls ── */}
      <ControlsBar
        mode={mode}
        count={count}
        onGenerate={generate}
        onModeChange={changeMode}
        onCountChange={changeCount}
        onSave={handleSave}
        isSaving={isSaving}
      />

      {/* ── Main palette strip ── */}
      <main>
        <PaletteStrip colors={colors} onLock={toggleLock} onToast={showToast} />

        {/* ── Tab Navigation ── */}
        <div className="flex items-center gap-1 px-6 pt-5 pb-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
                          whitespace-nowrap border transition-all duration-150
                          ${
                            activeTab === tab.id
                              ? 'text-violet-400 bg-violet-500/10 border-violet-500/25'
                              : 'text-[#5a5a80] border-transparent hover:text-[#a0a0c0] hover:bg-[#16161f]'
                          }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab Panels ── */}
        <div className="mt-4 animate-[fadeInUp_0.3s_ease_both]">
          {activeTab === 'details' && (
            <ColorDetailsGrid colors={colors} onToast={showToast} />
          )}
          {activeTab === 'saved' && (
            <SavedPalettes
              palettes={savedPalettes}
              onLoad={loadSaved}
              onDelete={deleteSaved}
              onToast={showToast}
            />
          )}
          {activeTab === 'a11y' && (
            <AccessibilityPanel colors={colors} />
          )}
          {activeTab === 'export' && (
            <ExportPanel colors={colors} onToast={showToast} />
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Global Toast ── */}
      <Toast message={toast.message} icon={toast.icon} visible={toast.visible} />
    </div>
  );
}
