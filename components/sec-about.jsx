/* sec-about.jsx — Sobre o Tiago + depoimentos */
(function () {
  const { Ic, Eyebrow } = window;

  const CREDS = [
    ["healing", "Acupunturista certificado"],
    ["spa", "Especialista em MTC"],
    ["self_improvement", "Instrutor de Pilates"],
  ];

  function About() {
    return (
      <section className="section pdm-about" id="sobre">
        <div className="wrap pdm-about-grid">
          <div className="pdm-about-media reveal">
            <div className="arch-soft pdm-about-photo">
              <img src="uploads/tiago.jpg"
                alt="Tiago Silveira"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
            </div>
            <div className="pdm-about-quote card">
              <Ic n="format_quote" s={28} style={{ color: "var(--primary)" }} />
              <p className="serif-italic" style={{ fontSize: 19, lineHeight: 1.4, margin: "6px 0 0" }}>
                “Não trato sintomas. Cuido de pessoas.”
              </p>
            </div>
          </div>
          <div className="pdm-about-copy reveal">
            <Eyebrow icon="waving_hand">Quem cuida de você</Eyebrow>
            <h2 className="display pdm-h2">Oi, eu sou o Tiago</h2>
            <p className="lead">
              Há mais de três décadas descobri que as mãos podem dizer o que as
              palavras não alcançam. Desde então, juntei a massagem, a
              acupuntura e a Medicina Chinesa num jeito só de cuidar: atento,
              leve e profundamente humano.
            </p>
            <p className="muted">
              Cada pessoa que entra aqui é única, e a sessão se molda a você,
              não o contrário. Gosto de unir técnica e presença, ciência e
              intuição. E adoro ver alguém sair daqui sorrindo, respirando mais
              fundo do que quando chegou.
            </p>
            <div className="pdm-cred-grid">
              {CREDS.map(([ic, t]) => (
                <div className="pdm-cred" key={t}>
                  <Ic n={ic} s={22} style={{ color: "var(--primary)" }} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <div className="pdm-sign">
              <span className="serif-italic" style={{ fontSize: 30 }}>Tiago Silveira</span>
              <span className="muted" style={{ fontSize: 13.5 }}>Fundador · O Poder das Mãos</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const REVIEWS = [
    {
      q: "Cheguei com dores na lombar que arrastava há anos. Em poucas sessões eu literalmente esqueci que elas existiam. O cuidado do Tiago é de outro nível.",
      n: "Marina R.", c: "Professora · há 8 meses na clínica",
    },
    {
      q: "A acupuntura mudou meu sono. Eu era de virar a noite acordada e hoje durmo como criança. O ambiente é tão calmo que já chego relaxando.",
      n: "Carolina M.", c: "Designer · cliente desde 2024",
    },
    {
      q: "Faço pilates e massagem alternados. Minha postura melhorou, o estresse do trabalho caiu muito. Virou meu ritual de autocuidado da semana.",
      n: "Eduardo P.", c: "Engenheiro · pacote mensal",
    },
  ];

  function Testimonials() {
    return (
      <section className="section--tight pdm-reviews">
        <div className="wrap">
          <div className="pdm-sec-head center reveal">
            <Eyebrow icon="favorite">Quem já se cuidou aqui</Eyebrow>
            <h2 className="display pdm-h2">Histórias que aquecem o coração</h2>
          </div>
          <div className="pdm-reviews-grid">
            {REVIEWS.map((r, i) => (
              <figure className="pdm-review card reveal" key={i} style={{ transitionDelay: i * 70 + "ms" }}>
                <div className="pdm-stars">
                  {[0, 1, 2, 3, 4].map((s) => <Ic key={s} n="star" s={18} style={{ color: "var(--ochre)" }} />)}
                </div>
                <blockquote>{r.q}</blockquote>
                <figcaption>
                  <span className="pdm-review-avatar">{r.n.charAt(0)}</span>
                  <span>
                    <strong>{r.n}</strong>
                    <span className="muted" style={{ display: "block", fontSize: 12.5 }}>{r.c}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="pdm-reviews-foot">
            <span className="pill"><Ic n="verified" s={16} style={{ color: "var(--sage)" }} /> Avaliações reais de clientes</span>
          </div>
        </div>
      </section>
    );
  }

  Object.assign(window, { About, Testimonials });
})();
