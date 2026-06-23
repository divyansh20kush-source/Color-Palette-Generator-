import { useState, useCallback } from 'react';

/**
 * useClipboard — copy text to clipboard with a visual timeout.
 * Returns { copy, copied, copiedId }
 */
export function useClipboard(timeout = 1800) {
  const [copiedId, setCopiedId] = useState(null);

  const copy = useCallback(
    async (text, id = 'default') => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for non-secure contexts
          const el = document.createElement('textarea');
          el.value = text;
          el.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el);
        }
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), timeout);
        return true;
      } catch (err) {
        console.error('Copy failed:', err);
        return false;
      }
    },
    [timeout]
  );

  return { copy, copiedId, copied: copiedId !== null };
}
