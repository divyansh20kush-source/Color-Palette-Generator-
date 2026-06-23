import { useState, useEffect, useCallback } from 'react';
import { generatePalette } from '../utils/colorUtils';

const STORAGE_KEY = 'chromaflow_saved_palettes';

/**
 * usePalette — Core state manager for the Color Palette Generator.
 */
export function usePalette(initialCount = 5) {
  const [colors, setColors] = useState(() => generatePalette(initialCount, 'random'));
  const [count, setCount] = useState(initialCount);
  const [mode, setMode] = useState('random');
  const [savedPalettes, setSavedPalettes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  // Persist saved palettes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  // Keyboard shortcut: Space to generate
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.code === 'Space') {
        e.preventDefault();
        generate();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, count, colors]);

  const generate = useCallback(() => {
    setColors((prev) => generatePalette(count, mode, prev));
  }, [count, mode, colors]);

  const toggleLock = useCallback((id) => {
    setColors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, locked: !c.locked } : c))
    );
  }, []);

  const changeCount = useCallback(
    (n) => {
      const newCount = parseInt(n, 10);
      setCount(newCount);
      setColors((prev) => generatePalette(newCount, mode, prev));
    },
    [mode]
  );

  const changeMode = useCallback(
    (m) => {
      setMode(m);
      setColors((prev) => generatePalette(count, m, prev));
    },
    [count]
  );

  const savePalette = useCallback(() => {
    const entry = {
      id: Date.now(),
      colors: colors.map(({ hex, hsl, rgb }) => ({ hex, hsl, rgb })),
      mode,
      savedAt: new Date().toISOString(),
    };
    setSavedPalettes((prev) => [entry, ...prev].slice(0, 20));
    return entry.id;
  }, [colors, mode]);

  const deleteSaved = useCallback((id) => {
    setSavedPalettes((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const loadSaved = useCallback((palette) => {
    const loaded = palette.colors.map((c) => ({
      ...c,
      id: Math.random().toString(36).slice(2),
      locked: false,
    }));
    setColors(loaded);
    setCount(loaded.length);
  }, []);

  return {
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
  };
}
