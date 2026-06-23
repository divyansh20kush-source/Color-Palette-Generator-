export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-glow" />

      <div className="hero-badge">
        <span className="hero-badge-dot">●</span>
        Color Palette Generator
      </div>

      <h1 className="hero-heading">
        Generate <span className="gradient-text">Beautiful</span>
        <br />
        Color Palettes Instantly
      </h1>

      <p className="hero-subtitle">
        Craft cohesive color schemes with harmony modes. Click any swatch to
        copy its hex code. Lock colors you love and randomize the rest.
      </p>

      <div className="hero-orb-left" />
      <div className="hero-orb-right" />
    </section>
  );
}
