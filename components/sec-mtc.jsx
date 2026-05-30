/* sec-mtc.jsx — Medicina Tradicional Chinesa: explainer, 5 elements, benefits */
(function () {
  const { useState } = React;
  const { Ic, Eyebrow } = window;

  function MTC() {
    return (
      <section className="section pdm-mtc" id="mtc">
        <div className="wrap">
          {/* Intro split */}
          <div className="pdm-mtc-intro">
            <div className="pdm-mtc-media reveal">
              <div className="arch-soft" style={{ width: "100%", height: "100%" }}>
                <image-slot id="mtc-photo" shape="rect" placeholder="Foto: ventosas, agulhas ou detalhe das mãos"
                  style={{ width: "100%", height: "100%" }}></image-slot>
              </div>
            </div>
            <div className="pdm-mtc-copy reveal">
              <Eyebrow icon="auto_awesome">Medicina Tradicional Chinesa</Eyebrow>
              <h2 className="display pdm-h2">Mais de 2.500 anos de escuta do corpo</h2>
              <p className="lead">
                A MTC enxerga você por inteiro: corpo, emoções e energia (o <em className="serif-italic">Qi</em>)
                em movimento. Em vez de silenciar sintomas, ela busca a raiz do
                desequilíbrio e devolve o fluxo natural.
              </p>
              <p className="muted">
                Tudo se organiza em torno de cinco elementos que se nutrem e se
                equilibram. Descobrir qual deles pede atenção é o primeiro passo
                do seu plano de cuidado.
              </p>
              <div className="pdm-mtc-pills">
                <span className="pill pill-sage"><Ic n="healing" s={16} /> Acupuntura</span>
                <span className="pill pill-sage"><Ic n="circle" s={16} /> Ventosas</span>
                <span className="pill pill-sage"><Ic n="local_fire_department" s={16} /> Moxabustão</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const BENEFITS = [
    ["sentiment_calm", "Menos ansiedade", "Sistema nervoso desacelera, a mente respira."],
    ["bedtime", "Sono profundo", "Pega no sono mais fácil e acorda inteiro."],
    ["healing", "Alívio de dores", "Coluna, ombros, enxaqueca e tensões crônicas."],
    ["bolt", "Mais energia", "Disposição que dura o dia, sem picos e quedas."],
    ["shield", "Imunidade", "Corpo mais resistente às trocas de estação."],
    ["nutrition", "Digestão leve", "Menos inchaço, mais equilíbrio intestinal."],
    ["accessibility_new", "Postura & mobilidade", "Movimento livre, corpo alinhado."],
    ["favorite", "Bem-estar geral", "A sensação boa de estar, enfim, cuidado."],
  ];

  function Benefits() {
    return (
      <section className="section--tight pdm-benef-sec">
        <div className="wrap">
          <div className="pdm-sec-head center reveal">
            <Eyebrow icon="volunteer_activism">O que você sente</Eyebrow>
            <h2 className="display pdm-h2">Benefícios que vão além da sessão</h2>
          </div>
          <div className="pdm-benef-grid">
            {BENEFITS.map(([ic, t, d], i) => (
              <div className="pdm-benef card reveal" key={t} style={{ transitionDelay: (i % 4) * 60 + "ms" }}>
                <div className="pdm-benef-ic"><Ic n={ic} s={24} /></div>
                <h4 style={{ margin: "0 0 4px", fontSize: 16.5 }}>{t}</h4>
                <p className="muted" style={{ margin: 0, fontSize: 13.5 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  Object.assign(window, { MTC, Benefits });
})();
