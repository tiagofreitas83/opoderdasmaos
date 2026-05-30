/* sec-plans.jsx — Planos com preços + conteúdo/artigos */
(function () {
  const { Ic, brl, Eyebrow } = window;

  const PLANS = [
    {
      name: "Sessão avulsa", price: 150, unit: "por sessão",
      desc: "Para quem quer experimentar ou cuidar de algo pontual.",
      feats: ["Massagem, acupuntura ou pilates", "Avaliação inicial inclusa", "50 a 80 minutos", "Sem fidelidade"],
      cta: "Agendar avulsa", featured: false,
    },
    {
      name: "Pacote 4 sessões", price: 560, unit: "R$ 140 cada · validade 60 dias",
      desc: "O equilíbrio ideal entre constância e flexibilidade.",
      feats: ["4 sessões à sua escolha", "Combine as terapias", "Plano de cuidado personalizado", "Reagendamento livre"],
      cta: "Quero o pacote", featured: true, save: "Economize R$ 40",
    },
    {
      name: "Plano mensal", price: 135, unit: "cada · 4 sessões mensais · assinatura",
      desc: "Autocuidado como hábito, com prioridade na agenda.",
      feats: ["4 sessões por mês", "Prioridade nos horários", "10% off em sessões extras", "Acompanhamento contínuo"],
      cta: "Assinar plano", featured: false,
    },
  ];

  function Plans({ onAgendar }) {
    return (
      <section className="section pdm-plans" id="planos">
        <div className="wrap">
          <div className="pdm-sec-head center reveal">
            <Eyebrow icon="loyalty">Planos & pacotes</Eyebrow>
            <h2 className="display pdm-h2">Cuidar de você cabe na sua rotina</h2>
            <p className="lead" style={{ maxWidth: 540, margin: "12px auto 0" }}>
              Preços transparentes, sem pegadinha. Escolha o ritmo que combina
              com o seu momento, dá para mudar quando quiser.
            </p>
          </div>
          <div className="pdm-plans-grid">
            {PLANS.map((p, i) => (
              <div className={"pdm-plan card reveal" + (p.featured ? " featured" : "")} key={p.name}
                   style={{ transitionDelay: i * 70 + "ms" }}>
                {p.featured && <span className="pdm-plan-tag">Mais escolhido</span>}
                <div className="pdm-plan-head">
                  <h3 style={{ margin: 0, fontSize: 19 }}>{p.name}</h3>
                  <p className="muted" style={{ fontSize: 13.5, margin: "6px 0 0", minHeight: 38 }}>{p.desc}</p>
                </div>
                <div className="pdm-plan-price">
                  <span className="display tabnum">{brl(p.price)}</span>
                  <span className="muted" style={{ fontSize: 13 }}>{p.unit}</span>
                  {p.save && <span className="pill pill-sage" style={{ marginTop: 8 }}><Ic n="savings" s={15} /> {p.save}</span>}
                </div>
                <ul className="pdm-plan-feats">
                  {p.feats.map((f) => (
                    <li key={f}><Ic n="check_circle" s={18} style={{ color: p.featured ? "var(--ochre)" : "var(--sage)" }} /> {f}</li>
                  ))}
                </ul>
                <button className={"btn btn-block " + (p.featured ? "btn-primary" : "btn-ghost")} onClick={onAgendar}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="center muted" style={{ fontSize: 13.5, marginTop: 22 }}>
            <Ic n="info" s={16} style={{ verticalAlign: "-3px" }} /> Valores ilustrativos, ajustamos com você.
            Aceitamos Pix, cartão e reembolso por nota para alguns convênios.
          </p>
        </div>
      </section>
    );
  }

  const ARTICLES = [
    { cat: "Autocuidado", title: "5 sinais de que seu corpo está pedindo uma pausa", read: "4 min de leitura",
      href: "https://www.hcor.com.br/imprensa/noticias/esses-sao-os-5-sinais-que-voce-chegou-ao-limite-do-cansaco/",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=70" },
    { cat: "Acupuntura", title: "O que esperar da sua primeira sessão de agulhas", read: "6 min de leitura",
      href: "https://cmba.org.br/acupuntura-perguntas-duvidas-frequentes/",
      img: "uploads/tiago.jpg" },
    { cat: "Medicina Chinesa", title: "Os 5 elementos e o que eles revelam sobre você", read: "7 min de leitura",
      href: "https://clinicalevidade.com/os-5-elementos-da-medicina-tradicional-chinesa-mtc/",
      img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=70" },
    { cat: "Movimento", title: "Massagem ou pilates? Como escolher para a sua semana", read: "5 min de leitura",
      href: "#terapias",
      img: "uploads/pilates.jpg" },
  ];

  function Articles() {
    return (
      <section className="section pdm-articles" id="conteudo">
        <div className="wrap">
          <div className="pdm-sec-head reveal">
            <Eyebrow icon="menu_book">Conteúdo</Eyebrow>
            <h2 className="display pdm-h2">Para você cuidar também em casa</h2>
            <p className="lead" style={{ maxWidth: 520 }}>
              Histórias, guias e sabedoria da Medicina Chinesa em linguagem
              simples, do jeito que a gente conversa aqui no consultório.
            </p>
          </div>
          <div className="pdm-articles-grid">
            {ARTICLES.map((a, i) => {
              const ext = a.href.startsWith("http");
              return (
                <a className="pdm-article card reveal" href={a.href} key={a.title}
                  target={ext ? "_blank" : undefined} rel={ext ? "noreferrer" : undefined}
                  style={{ transitionDelay: (i % 2) * 80 + "ms" }}>
                  <div className="pdm-article-media">
                    <img src={a.img} alt={a.title} loading="lazy"
                      onError={(e) => { e.currentTarget.style.opacity = 0; }}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span className="pill pdm-article-cat">{a.cat}</span>
                  </div>
                  <div className="pdm-article-body">
                    <h3 style={{ margin: 0, fontSize: 18.5, lineHeight: 1.25 }}>{a.title}</h3>
                    <div className="pdm-article-foot">
                      <span className="muted" style={{ fontSize: 12.5 }}><Ic n="schedule" s={15} style={{ verticalAlign: "-3px" }} /> {a.read}</span>
                      <span className="pdm-ther-link" style={{ fontSize: 13.5 }}>Ler <Ic n="arrow_forward" s={16} /></span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  Object.assign(window, { Plans, Articles });
})();
