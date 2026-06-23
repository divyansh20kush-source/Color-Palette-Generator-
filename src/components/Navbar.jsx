export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Brand */}
      <a href="/" className="navbar-brand">
        <div className="brand-logo">CF</div>
        <span className="brand-name">
          Chroma<span className="gradient-text">flow</span>
        </span>
      </a>

      {/* Actions */}
      <div className="navbar-actions">
        <span className="keyboard-hint">
          Press <kbd className="kbd">Space</kbd> to generate
        </span>

        {/* ✅ MANDATORY: Built for Digital Heroes */}
        <a
          id="btn-digital-heroes-nav"
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-digital-heroes"
        >
          <span>🦸</span>
          Built for Digital Heroes
        </a>
      </div>
    </nav>
  );
}
