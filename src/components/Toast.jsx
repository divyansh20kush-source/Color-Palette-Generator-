import { useEffect, useState } from 'react';

/**
 * Toast — Global floating copy notification.
 * Renders at the bottom center of the viewport.
 */
export default function Toast({ message, icon, visible }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[999]
                  flex items-center gap-2 px-5 py-2.5 rounded-full
                  bg-[#16161f]/95 backdrop-blur-2xl border border-white/[0.08]
                  text-white text-sm font-semibold whitespace-nowrap
                  shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                  pointer-events-none
                  transition-all duration-300
                  ${visible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
                  }`}
    >
      <span className="text-base">{icon}</span>
      {message}
    </div>
  );
}
