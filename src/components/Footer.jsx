/**
 * Footer — Developer contact info + second "Built for Digital Heroes" button
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111118] border-t border-white/[0.07] py-10 px-6 mt-auto">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

        {/* Brand */}
        <div>
          <div className="font-display font-bold text-lg text-white mb-1">
            Chroma<span className="gradient-text">flow</span>
          </div>
          <p className="text-xs text-[#5a5a80]">
            Beautiful color palettes,<br />
            instantly generated. Free forever.
          </p>
        </div>

        {/* ✅ MANDATORY: Developer Contact Information */}
        <div className="bg-[#16161f] border border-white/[0.07] rounded-2xl px-6 py-5 text-center shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-violet-400 mb-2">
            Developer
          </p>
          <p className="font-display font-bold text-white text-base mb-1">
            Divyansh Kushwaha
          </p>
          <a
            href="mailto:divkushwaha0@gmail.com"
            id="footer-dev-email"
            className="text-sm text-[#a0a0c0] hover:text-violet-400 transition-colors duration-150 no-underline"
          >
            divkushwaha0@gmail.com
          </a>
        </div>

        {/* Links & second DH button */}
        <div className="flex flex-col items-center md:items-end gap-3">
          {/* ✅ MANDATORY: Built for Digital Heroes button (footer) */}
          <a
            id="btn-digital-heroes-footer"
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-digital-heroes"
          >
            <span>🦸</span>
            Built for Digital Heroes
          </a>
          <p className="text-xs text-[#5a5a80]">
            © {year} Chromaflow. All rights reserved.
          </p>
          <p className="text-[0.65rem] text-[#3a3a55]">
            100% free · Zero paid APIs · Vercel-ready
          </p>
        </div>
      </div>
    </footer>
  );
}
