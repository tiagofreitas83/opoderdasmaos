/* sec-foot.jsx — FAQ, Contato, Footer, WhatsApp bubble */
(function () {
  const { useState } = React;
  const { Ic, Logo, wa, Eyebrow } = window;

  const FAQS = [
    ["Preciso entender de acupuntura ou Medicina Chinesa para começar?",
     "De jeito nenhum. O Tiago explica tudo com calma na primeira conversa e o cuidado se adapta ao seu nível de familiaridade. Você só precisa querer se cuidar."],
    ["A acupuntura dói?",
     "As agulhas são finíssimas, muito mais finas que as de injeção. A maioria das pessoas sente apenas um leve formigamento e relaxa profundamente durante a sessão."],
    ["Quanto tempo dura cada sessão?",
     "Entre 50 e 80 minutos, dependendo da terapia. A primeira visita costuma ser um pouco mais longa porque inclui a avaliação inicial."],
    ["Como funciona o pagamento?",
     "Aceitamos Pix, cartão de crédito e débito. Para algumas terapias emitimos nota para reembolso por convênio. É só pedir."],
    ["Posso remarcar se precisar?",
     "Sim, sem custo até 12 horas antes do horário. É só avisar pelo WhatsApp que encontramos um novo momento para você."],
    ["Vocês atendem em quais terapias no mesmo dia?",
     "Dá para combinar, por exemplo, pilates e massagem no mesmo bloco. O Tiago monta o plano que faz sentido para o seu corpo e a sua agenda."],
  ];

  function FAQ() {
    const [open, setOpen] = useState(0);
    return (
      <section className="section--tight pdm-faq" id="faq">
        <div className="wrap pdm-faq-grid">
          <div className="pdm-faq-head reveal">
            <Eyebrow icon="help">Dúvidas frequentes</Eyebrow>
            <h2 className="display pdm-h2">Tudo que você<br />quer saber</h2>
            <p className="muted">Não achou sua dúvida? Chama no WhatsApp que a gente responde rapidinho.</p>
            <a className="btn btn-ghost" href={wa("Olá! Tenho uma dúvida.")} target="_blank" rel="noreferrer">
              <Ic n="chat" s={18} /> Tirar uma dúvida
            </a>
          </div>
          <div className="pdm-faq-list reveal">
            {FAQS.map(([q, a], i) => (
              <div className={"pdm-faq-item" + (open === i ? " open" : "")} key={i}>
                <button className="pdm-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{q}</span>
                  <Ic n={open === i ? "remove" : "add"} s={22} />
                </button>
                <div className="pdm-faq-a"><p>{a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function Contact() {
    return (
      <section className="section pdm-contact" id="contato">
        <div className="wrap pdm-contact-grid">
          <div className="pdm-contact-info reveal">
            <Eyebrow icon="place">Onde nos encontrar</Eyebrow>
            <h2 className="display pdm-h2">Venha respirar com a gente</h2>
            <div className="pdm-contact-list">
              <div className="pdm-contact-row">
                <Ic n="place" s={22} style={{ color: "var(--primary)" }} />
                <div><strong>Rua Dr. Sebastião Leão, 151</strong><span className="muted">Azenha · Porto Alegre, RS · CEP 90050-090</span></div>
              </div>
              <div className="pdm-contact-row">
                <Ic n="schedule" s={22} style={{ color: "var(--primary)" }} />
                <div><strong>Seg a Sex · 8h às 20h</strong><span className="muted">Sábado · 9h às 14h</span></div>
              </div>
              <div className="pdm-contact-row">
                <Ic n="chat" s={22} style={{ color: "var(--primary)" }} />
                <div><strong>(51) 98579-2797</strong><span className="muted">WhatsApp e ligações</span></div>
              </div>
              <div className="pdm-contact-row">
                <Ic n="alternate_email" s={22} style={{ color: "var(--primary)" }} />
                <div><strong>@poderdasmaos</strong><span className="muted">Instagram · conteúdo e bastidores</span></div>
              </div>
            </div>
            <div className="pdm-contact-cta">
              <a className="btn btn-primary" href={wa()} target="_blank" rel="noreferrer"><Ic n="chat" s={18} /> Chamar no WhatsApp</a>
              <a className="btn btn-ghost" href="#agendar"><Ic n="calendar_month" s={18} /> Agendar online</a>
            </div>
          </div>
          <div className="pdm-contact-map reveal">
            <img src="uploads/fachada.jpg"
              alt="Fachada do Poder das Mãos, Rua Dr. Sebastião Leão, 151"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="pdm-map-pin"><Ic n="location_on" s={20} /> O Poder das Mãos</div>
          </div>
        </div>
      </section>
    );
  }

  function Footer({ onAgendar }) {
    return (
      <footer className="pdm-footer">
        <div className="wrap">
          <div className="pdm-footer-top">
            <div className="pdm-footer-brand">
              <Logo color="var(--on-dark)" />
              <p style={{ color: "rgba(244,236,223,.6)", maxWidth: 320, marginTop: 16, fontSize: 14.5 }}>
                Massagem, acupuntura, Medicina Chinesa e pilates,
                um só lugar para o seu corpo respirar.
              </p>
              <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={onAgendar}>
                <Ic n="calendar_month" s={18} /> Agendar sessão
              </button>
            </div>
            <div className="pdm-footer-cols">
              <div>
                <h5>Terapias</h5>
                <a href="#terapias">Massagem</a><a href="#mtc">Acupuntura</a>
                <a href="#mtc">Medicina Chinesa</a><a href="#terapias">Pilates</a>
              </div>
              <div>
                <h5>Navegar</h5>
                <a href="#sobre">O Tiago</a><a href="#planos">Planos</a>
                <a href="#conteudo">Conteúdo</a><a href="#faq">Dúvidas</a><a href="#contato">Contato</a>
              </div>
              <div>
                <h5>Contato</h5>
                <a href={wa()} target="_blank" rel="noreferrer">WhatsApp</a>
                <a href="#">Instagram</a><a href="#contato">Endereço</a>
              </div>
            </div>
          </div>
          <div className="pdm-footer-bot">
            <span>© 2026 Poder das Mãos T. S. da Silveira &amp; Cia LTDA · Porto Alegre/RS</span>
            <span style={{ display: "flex", gap: 18, alignItems: "center" }}>
              <a href="painel.html" style={{ color: "var(--ochre)", fontWeight: 600 }}>Painel da equipe</a>
              <span>Feito com cuidado em Porto Alegre</span>
            </span>
          </div>
        </div>
      </footer>
    );
  }

  function WhatsBubble() {
    const [hint, setHint] = useState(true);
    return (
      <a className="pdm-wa-bubble" href={wa()} target="_blank" rel="noreferrer"
         onMouseEnter={() => setHint(true)}>
        {hint && (
          <span className="pdm-wa-hint">
            Fale com o Tiago
            <button className="pdm-wa-x" onClick={(e) => { e.preventDefault(); setHint(false); }}><Ic n="close" s={14} /></button>
          </span>
        )}
        <span className="pdm-wa-ic"><Ic n="chat" s={26} /></span>
      </a>
    );
  }

  Object.assign(window, { FAQ, Contact, Footer, WhatsBubble });
})();
