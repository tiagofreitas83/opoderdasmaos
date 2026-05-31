/* sec-top.jsx — Nav, Hero (editorial × imersivo), philosophy band */
(function () {
  const { useState, useEffect } = React;
  const { Ic, Logo, wa, Eyebrow } = window;

  const NAV = [
    ["Terapias", "#terapias"],
    ["Medicina Chinesa", "#mtc"],
    ["O Tiago", "#sobre"],
    ["Planos", "#planos"],
  ];

  function Nav({ onAgendar }) {
    const [solid, setSolid] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
      const onScroll = () => setSolid(window.scrollY > 40);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
      <header className={"pdm-nav" + (solid ? " solid" : "")}>
        <div className="wrap pdm-nav-inner">
          <Logo />
          <nav className="pdm-nav-links">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <div className="pdm-nav-cta">
            <a className="btn btn-primary btn-sm pdm-wa-link" href={wa()} target="_blank" rel="noreferrer" style={{ color: "#fff" }}>
              <Ic n="chat" s={18} /> WhatsApp
            </a>
            <button className="pdm-burger" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              <Ic n={open ? "close" : "menu"} s={24} />
            </button>
          </div>
        </div>
        {open && (
          <div className="pdm-mobile-menu">
            {NAV.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
            <a href={wa()} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>WhatsApp</a>
          </div>
        )}
      </header>
    );
  }

  const TRUST = [
    ["32", "anos de prática"],
    ["50 mil+", "sessões realizadas"],
    ["5,0", "em avaliações"],
  ];

  function HeroEditorial({ onAgendar }) {
    return (
      <section className="section pdm-hero pdm-hero--editorial" id="topo">
        <div className="wrap pdm-hero-grid">
          <div className="pdm-hero-copy">
            <Eyebrow icon="spa">Massagem · Acupuntura · MTC · Pilates</Eyebrow>
            <h1 className="display pdm-hero-title">
              O cuidado que o seu corpo<br />
              estava <span className="serif-italic" style={{ color: "var(--primary)" }}>pedindo.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 480 }}>
              No Poder das Mãos, o Tiago une o toque terapêutico à sabedoria milenar
              da Medicina Tradicional Chinesa para devolver leveza, equilíbrio e
              energia ao seu dia a dia.
            </p>
            <div className="pdm-hero-actions">
              <button className="btn btn-primary btn-lg" onClick={onAgendar}>
                <Ic n="calendar_month" s={20} /> Agendar minha sessão
              </button>
              <a className="btn btn-ghost btn-lg" href="#terapias">Conhecer as terapias</a>
            </div>
            <div className="pdm-trust">
              {TRUST.map(([n, l], i) => (
                <div className="pdm-trust-item" key={i}>
                  <span className="display tabnum" style={{ fontSize: 30, color: "var(--ink)" }}>{n}</span>
                  <span className="muted" style={{ fontSize: 13.5 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pdm-hero-media">
            <div className="pdm-hero-arch arch-soft">
              <img src="uploads/massagem.jpg"
                alt="Tiago Silveira fazendo massagem terapêutica nas costas de um paciente"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
            </div>
            <div className="pdm-hero-seal">
              <Ic n="verified" s={18} />
              <span>Acupunturista e massagista</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function HeroImersivo({ onAgendar }) {
    return (
      <section className="section pdm-hero pdm-hero--imersivo" id="topo">
        <img src="uploads/massagem.jpg"
          alt="Tiago Silveira fazendo massagem terapêutica nas costas de um paciente"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} />
        <div className="pdm-hero-scrim" />
        <div className="wrap pdm-hero-imersivo-inner">
          <Eyebrow icon="spa">Massagem · Acupuntura · MTC · Pilates</Eyebrow>
          <h1 className="display pdm-hero-title" style={{ color: "#fff", maxWidth: 14 + "ch" }}>
            Respire. Você chegou ao seu <span className="serif-italic" style={{ color: "var(--ochre)" }}>refúgio.</span>
          </h1>
          <p className="lead" style={{ color: "rgba(255,255,255,.86)", maxWidth: 520 }}>
            Toque terapêutico e Medicina Tradicional Chinesa, num só lugar, com o
            cuidado atento do Tiago. Equilíbrio para o corpo, calma para a mente.
          </p>
          <div className="pdm-hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onAgendar}>
              <Ic n="calendar_month" s={20} /> Agendar minha sessão
            </button>
            <a className="btn btn-lg pdm-btn-glass" href="#terapias">Conhecer as terapias</a>
          </div>
          <div className="pdm-trust pdm-trust--light">
            {TRUST.map(([n, l], i) => (
              <div className="pdm-trust-item" key={i}>
                <span className="display tabnum" style={{ fontSize: 30, color: "#fff" }}>{n}</span>
                <span style={{ fontSize: 13.5, color: "rgba(255,255,255,.7)" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function Hero({ layout, onAgendar }) {
    return layout === "imersivo"
      ? <HeroImersivo onAgendar={onAgendar} />
      : <HeroEditorial onAgendar={onAgendar} />;
  }

  // Philosophy band — a calm intent statement after hero
  function Philosophy() {
    return (
      <section className="section--tight pdm-philos">
        <div className="wrap center">
          <span className="flourish eyebrow" style={{ color: "var(--ink-3)" }}>Nossa essência</span>
          <p className="display pdm-philos-text">
            Acreditamos que cuidar é, antes de tudo, <span style={{ color: "var(--primary)" }}>escutar</span>.
            Cada sessão começa com a sua história, e termina com o seu corpo
            um pouco mais leve do que chegou.
          </p>
        </div>
      </section>
    );
  }

  Object.assign(window, { Nav, Hero, Philosophy });
})();
