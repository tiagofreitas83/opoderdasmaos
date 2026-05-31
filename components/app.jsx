/* app.jsx — assembles the page + Tweaks */
(function () {
  const { useEffect } = React;
  const {
    useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect,
    Nav, Hero, Philosophy, Therapies, HowItWorks, MTC, Benefits,
    About, Testimonials, Plans, FAQ, Contact, Footer, WhatsBubble,
    useReveal,
  } = window;

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "palette": "salvia",
    "type": "classico",
    "hero": "editorial"
  }/*EDITMODE-END*/;

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    useReveal();
    const onAgendar = () => window.open(window.wa(), "_blank");

    return (
      <div className="pdm-root" data-palette={t.palette} data-type={t.type}>
        <Nav onAgendar={onAgendar} />
        <main>
          <Hero layout={t.hero} onAgendar={onAgendar} />
          <Philosophy />
          <Therapies onAgendar={onAgendar} />
          <HowItWorks />
          <MTC />
          <Benefits />
          <About />
          <Testimonials />
          <Plans onAgendar={onAgendar} />
          <FAQ />
          <Contact />
        </main>
        <Footer onAgendar={onAgendar} />
        <WhatsBubble />

        <TweaksPanel>
          <TweakSection label="Estilo visual" />
          <TweakRadio label="Paleta" value={t.palette}
            options={["terra", "salvia", "argila"]}
            onChange={(v) => setTweak("palette", v)} />
          <TweakSelect label="Tipografia" value={t.type}
            options={["editorial", "classico", "caloroso"]}
            onChange={(v) => setTweak("type", v)} />
          <TweakSection label="Layout" />
          <TweakRadio label="Hero" value={t.hero}
            options={["editorial", "imersivo"]}
            onChange={(v) => setTweak("hero", v)} />
        </TweaksPanel>
      </div>
    );
  }

  // anchor smooth-scroll with offset for in-page links
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    if (!id || id === "topo") {
      if (id === "topo") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });

  window.PDMApp = App;
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
})();
