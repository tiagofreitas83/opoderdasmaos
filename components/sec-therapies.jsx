/* sec-therapies.jsx — Terapias (massagem-first) + Como funciona */
(function () {
  const { Ic, Eyebrow } = window;

  const OTHERS = [
    {
      icon: "healing", tag: "Energia & equilíbrio",
      title: "Acupuntura",
      desc: "Agulhas finíssimas em pontos precisos para regular a energia do corpo. Praticamente indolor, profundamente reguladora.",
      bullets: ["Dores crônicas e enxaqueca", "Ansiedade e qualidade do sono", "Equilíbrio hormonal"],
      href: "#agendar",
    },
    {
      icon: "spa", tag: "Sabedoria milenar",
      title: "Medicina Chinesa",
      desc: "Ventosaterapia e moxabustão guiadas por uma leitura energética completa do seu momento.",
      bullets: ["Ventosas e moxa", "Leitura energética completa", "Plano de cuidado personalizado"],
      href: "#mtc",
    },
    {
      icon: "self_improvement", tag: "Força & consciência",
      title: "Pilates",
      desc: "Solo e aparelhos para fortalecer o centro, alinhar a postura e devolver liberdade aos seus movimentos.",
      bullets: ["Fortalecimento do core", "Postura e mobilidade", "Aulas individuais ou em dupla"],
      href: "#agendar",
    },
  ];

  const STEPS = [
    ["forum", "Conversa inicial", "Entendemos a sua queixa, sua rotina e o que você espera sentir."],
    ["clinical_notes", "Avaliação integrada", "Leitura do corpo e da energia, no olhar da Medicina Chinesa."],
    ["spa", "Plano de cuidado", "Definimos juntos as terapias certas para o seu momento."],
    ["favorite", "Acompanhamento", "Evolução sessão a sessão, sempre no seu ritmo."],
  ];

  function Therapies({ onAgendar }) {
    return (
      <section className="section" id="terapias">
        <div className="wrap">
          <div className="pdm-sec-head reveal">
            <Eyebrow icon="format_list_bulleted">As terapias</Eyebrow>
            <h2 className="display pdm-h2">Um cuidado para cada necessidade</h2>
            <p className="lead" style={{ maxWidth: 560 }}>
              Quatro caminhos que conversam entre si. O Tiago combina o que faz
              sentido para o seu corpo, nada de protocolo de prateleira.
            </p>
          </div>

          {/* Featured: Massagem */}
          <div className="pdm-feature card reveal">
            <div className="pdm-feature-media">
              <img src="uploads/sala.jpg"
                alt="Sala de atendimento da clínica, com maca e ambiente acolhedor"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              <span className="pill pill-accent pdm-feature-badge"><Ic n="star" s={15} /> Mais procurada</span>
            </div>
            <div className="pdm-feature-body">
              <Eyebrow icon="back_hand">Carro-chefe</Eyebrow>
              <h3 className="display" style={{ fontSize: 34, margin: "8px 0 0" }}>Massagem terapêutica</h3>
              <p className="muted" style={{ marginTop: 12 }}>
                Relaxante, desportiva, de recuperação ou drenagem linfática. O
                toque é adaptado às suas tensões do dia. Mãos treinadas que
                encontram o nó certo e desfazem com calma.
              </p>
              <div className="pdm-feature-tags">
                {["Relaxante", "Desportiva", "Drenagem linfática", "Liberação miofascial"].map((t) => (
                  <span className="pill" key={t}>{t}</span>
                ))}
              </div>
              <ul className="pdm-benefits">
                {[
                  ["bedtime", "Alivia tensões e melhora o sono"],
                  ["bloodtype", "Ativa a circulação e a recuperação"],
                  ["sentiment_calm", "Reduz estresse e ansiedade"],
                ].map(([ic, tx]) => (
                  <li key={tx}><Ic n={ic} s={20} style={{ color: "var(--primary)" }} /> {tx}</li>
                ))}
              </ul>
              <div className="stack-row" style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick={onAgendar}><Ic n="calendar_month" s={18} /> Agendar massagem</button>
                <span className="pill"><Ic n="schedule" s={16} /> 50–80 min</span>
                <span className="pill"><Ic n="payments" s={16} /> a partir de R$ 180</span>
              </div>
            </div>
          </div>

          {/* Grid: outras terapias */}
          <div className="pdm-ther-grid">
            {OTHERS.map((t, i) => (
              <a className="pdm-ther-card card reveal" href={t.href} key={t.title} style={{ transitionDelay: i * 60 + "ms" }}>
                <div className="pdm-ther-ic"><Ic n={t.icon} s={26} /></div>
                <span className="eyebrow" style={{ fontSize: 11 }}>{t.tag}</span>
                <h3 className="display" style={{ fontSize: 25, margin: "4px 0 0" }}>{t.title}</h3>
                <p className="muted" style={{ fontSize: 14.5, marginTop: 8 }}>{t.desc}</p>
                <ul className="pdm-ther-bullets">
                  {t.bullets.map((b) => (
                    <li key={b}><Ic n="check" s={16} style={{ color: "var(--sage)" }} /> {b}</li>
                  ))}
                </ul>
                <span className="pdm-ther-link">Saber mais <Ic n="arrow_forward" s={17} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function HowItWorks() {
    return (
      <section className="section--tight pdm-how">
        <div className="wrap">
          <div className="pdm-how-head reveal">
            <Eyebrow icon="route">Sua primeira visita</Eyebrow>
            <h2 className="display pdm-h2" style={{ maxWidth: 620 }}>
              Simples, acolhedor e sem pressa
            </h2>
            <p className="lead" style={{ maxWidth: 520 }}>
              Se é a sua primeira vez, fique tranquilo. Veja como é receber
              cuidado no Poder das Mãos, do “oi” ao “até a próxima”.
            </p>
          </div>
          <div className="pdm-steps">
            {STEPS.map(([ic, t, d], i) => (
              <div className="pdm-step reveal" key={t} style={{ transitionDelay: i * 70 + "ms" }}>
                <div className="pdm-step-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="pdm-step-ic"><Ic n={ic} s={24} /></div>
                <h4 style={{ margin: "0 0 4px", fontSize: 17 }}>{t}</h4>
                <p className="muted" style={{ fontSize: 14, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  Object.assign(window, { Therapies, HowItWorks });
})();
