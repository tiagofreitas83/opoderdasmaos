/* sec-booking.jsx — Agendamento (completo × simples) */
(function () {
  const { useState } = React;
  const { Ic, wa, Eyebrow, brl } = window;

  const SERVICES = [
    ["Massagem terapêutica", "back_hand", 180],
    ["Acupuntura", "healing", 200],
    ["Medicina Chinesa", "spa", 200],
    ["Pilates", "self_improvement", 150],
  ];
  const SVC_IDS = ["massagem", "acupuntura", "mtc", "pilates"];
  const TIMES = ["09:00", "10:30", "14:00", "15:30", "17:00", "18:30"];
  const DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  const MON = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

  function nextDays(n) {
    const out = [];
    const d = new Date();
    for (let i = 0; i < n; i++) {
      const dd = new Date(d);
      dd.setDate(d.getDate() + i);
      if (dd.getDay() !== 0) out.push(dd); // skip Sundays (clinic closed)
    }
    return out.slice(0, n - 2);
  }

  function SideInfo() {
    return (
      <div className="pdm-book-side reveal">
        <Eyebrow icon="event_available">Agendar</Eyebrow>
        <h2 className="display pdm-h2" style={{ color: "var(--on-dark)" }}>
          Reserve um tempo<br />para você
        </h2>
        <p style={{ color: "rgba(244,236,223,.78)", fontSize: 16.5, lineHeight: 1.6 }}>
          Escolha a terapia e o melhor horário. Em instantes confirmamos sua
          sessão pelo WhatsApp, com todo o carinho.
        </p>
        <ul className="pdm-book-assure">
          {[
            ["schedule", "Resposta rápida, normalmente em minutos"],
            ["event_repeat", "Reagende sem custo até 12h antes"],
            ["health_and_safety", "Ambiente acolhedor, limpo e reservado"],
          ].map(([ic, t]) => (
            <li key={t}><Ic n={ic} s={20} style={{ color: "var(--ochre)" }} /> {t}</li>
          ))}
        </ul>
        <div className="pdm-book-help">
          <Ic n="chat" s={20} />
          <div>
            <div style={{ fontWeight: 600 }}>Prefere conversar antes?</div>
            <a href={wa("Olá! Tenho uma dúvida antes de agendar.")} target="_blank" rel="noreferrer"
               style={{ color: "var(--ochre)", fontWeight: 600 }}>Fale com o Tiago no WhatsApp →</a>
          </div>
        </div>
      </div>
    );
  }

  function Field({ label, ...p }) {
    return (
      <label className="pdm-field">
        <span>{label}</span>
        <input {...p} />
      </label>
    );
  }

  // ---------- COMPLETO (multi-step) ----------
  function BookingFull() {
    const [step, setStep] = useState(0);
    const saved = React.useRef(false);
    const [svc, setSvc] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [first, setFirst] = useState(false);
    const [note, setNote] = useState("");
    const days = nextDays(12);

    const labels = ["Terapia", "Data e hora", "Seus dados", "Pronto"];
    const can = [svc !== null, date !== null && time !== null, name.trim() && phone.trim(), true];

    const summaryMsg = () => {
      const s = SERVICES[svc];
      const dt = date ? `${DOW[date.getDay()]} ${date.getDate()} ${MON[date.getMonth()]}` : "";
      return `Olá! Quero agendar no Poder das Mãos:\n• Terapia: ${s ? s[0] : ""}\n• Dia: ${dt} às ${time}\n• Nome: ${name}${first ? "\n• Primeira vez" : ""}${note ? "\n• Obs: " + note : ""}`;
    };

    const persist = () => {
      if (saved.current || !window.PDMStore || svc === null) return;
      saved.current = true;
      const s = SERVICES[svc];
      window.PDMStore.add({
        service: SVC_IDS[svc], serviceName: s[0], price: s[2],
        dur: window.PDMStore.svc(SVC_IDS[svc]).dur,
        name: name.trim(), phone: phone.trim(),
        date: date ? window.PDMStore.isoOf(date) : "", time: time || "",
        first, note: note.trim(), status: "pendente", source: "site", plan: "Avulsa",
      });
    };

    return (
      <div className="pdm-book-card card reveal">
        <div className="pdm-stepper">
          {labels.map((l, i) => (
            <div className={"pdm-stepper-item" + (i === step ? " active" : "") + (i < step ? " done" : "")} key={l}>
              <span className="pdm-stepper-dot">{i < step ? <Ic n="check" s={15} /> : i + 1}</span>
              <span className="pdm-stepper-lbl">{l}</span>
            </div>
          ))}
        </div>

        <div className="pdm-book-body">
          {step === 0 && (
            <div className="pdm-step-pane">
              <h3 className="pdm-book-q">Qual cuidado você procura?</h3>
              <div className="pdm-svc-options">
                {SERVICES.map(([nm, ic, pr], i) => (
                  <button key={nm} className={"pdm-svc-opt" + (svc === i ? " active" : "")} onClick={() => setSvc(i)}>
                    <span className="pdm-svc-ic"><Ic n={ic} s={24} /></span>
                    <span className="pdm-svc-nm">{nm}</span>
                    {svc === i && <Ic n="check_circle" s={20} style={{ color: "var(--primary)" }} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="pdm-step-pane">
              <h3 className="pdm-book-q">Escolha o melhor dia</h3>
              <div className="pdm-date-row">
                {days.map((d, i) => (
                  <button key={i} className={"pdm-date" + (date && date.getDate() === d.getDate() ? " active" : "")} onClick={() => setDate(d)}>
                    <span className="pdm-date-dow">{DOW[d.getDay()]}</span>
                    <span className="pdm-date-num">{d.getDate()}</span>
                    <span className="pdm-date-mon">{MON[d.getMonth()]}</span>
                  </button>
                ))}
              </div>
              <h3 className="pdm-book-q" style={{ marginTop: 22 }}>E o horário</h3>
              <div className="pdm-time-row">
                {TIMES.map((t) => (
                  <button key={t} className={"pdm-time" + (time === t ? " active" : "")} onClick={() => setTime(t)}>{t}</button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="pdm-step-pane">
              <h3 className="pdm-book-q">Como te chamamos?</h3>
              <div className="pdm-form-grid">
                <Field label="Nome completo" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
                <Field label="WhatsApp" placeholder="(11) 9 0000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <label className="pdm-field" style={{ marginTop: 14 }}>
                <span>Algo que o Tiago deva saber? (opcional)</span>
                <textarea rows={3} placeholder="Dores, objetivos, preferências..." value={note} onChange={(e) => setNote(e.target.value)} />
              </label>
              <label className="pdm-check">
                <input type="checkbox" checked={first} onChange={(e) => setFirst(e.target.checked)} />
                <span>É a minha primeira vez na clínica</span>
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="pdm-step-pane pdm-confirm">
              <div className="pdm-confirm-ic"><Ic n="celebration" s={34} /></div>
              <h3 className="display" style={{ fontSize: 26, margin: "8px 0 2px" }}>Quase lá, {name.split(" ")[0] || "tudo certo"}!</h3>
              <p className="muted" style={{ marginTop: 0 }}>Confira seu resumo e confirme pelo WhatsApp.</p>
              <div className="pdm-summary">
                <div><span className="muted">Terapia</span><strong>{svc !== null ? SERVICES[svc][0] : "—"}</strong></div>
                <div><span className="muted">Quando</span><strong>{date ? `${DOW[date.getDay()]} ${date.getDate()} ${MON[date.getMonth()]} · ${time}` : "—"}</strong></div>
                <div><span className="muted">Nome</span><strong>{name || "—"}</strong></div>
              </div>
              <a className="btn btn-primary btn-block btn-lg" href={wa(summaryMsg())} target="_blank" rel="noreferrer" onClick={persist}>
                <Ic n="chat" s={20} /> Confirmar pelo WhatsApp
              </a>
              <button className="pdm-restart" onClick={() => { saved.current = false; setStep(0); setSvc(null); setDate(null); setTime(null); }}>
                Começar de novo
              </button>
            </div>
          )}
        </div>

        {step < 3 && (
          <div className="pdm-book-nav">
            <button className="btn btn-ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Voltar</button>
            <button className="btn btn-primary" disabled={!can[step]} onClick={() => setStep((s) => s + 1)}>
              Continuar <Ic n="arrow_forward" s={18} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ---------- SIMPLES (single form) ----------
  function BookingSimple() {
    const [done, setDone] = useState(false);
    const [svc, setSvc] = useState(0);
    const [pref, setPref] = useState("Manhã");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const ok = name.trim() && phone.trim();
    const msg = `Olá! Quero agendar:\n• Terapia: ${SERVICES[svc][0]}\n• Preferência: ${pref}\n• Nome: ${name}`;

    if (done) {
      return (
        <div className="pdm-book-card card reveal pdm-confirm" style={{ textAlign: "center", padding: 40 }}>
          <div className="pdm-confirm-ic"><Ic n="celebration" s={34} /></div>
          <h3 className="display" style={{ fontSize: 26, margin: "10px 0 4px" }}>Pedido enviado!</h3>
          <p className="muted">Confirme pelo WhatsApp para garantir seu horário.</p>
          <a className="btn btn-primary btn-block btn-lg" href={wa(msg)} target="_blank" rel="noreferrer" style={{ marginTop: 16 }}>
            <Ic n="chat" s={20} /> Confirmar pelo WhatsApp
          </a>
          <button className="pdm-restart" onClick={() => setDone(false)}>Fazer outro pedido</button>
        </div>
      );
    }
    return (
      <form className="pdm-book-card card reveal" onSubmit={(e) => { e.preventDefault(); if (!ok) return; if (window.PDMStore) { const s = SERVICES[svc]; window.PDMStore.add({ service: SVC_IDS[svc], serviceName: s[0], price: s[2], dur: window.PDMStore.svc(SVC_IDS[svc]).dur, name: name.trim(), phone: phone.trim(), date: "", time: "", note: "Preferência: " + pref, status: "pendente", source: "site", plan: "Avulsa" }); } setDone(true); }}>
        <h3 className="pdm-book-q" style={{ marginTop: 4 }}>Peça seu horário</h3>
        <label className="pdm-field">
          <span>Terapia</span>
          <select value={svc} onChange={(e) => setSvc(+e.target.value)}>
            {SERVICES.map(([nm], i) => <option key={nm} value={i}>{nm}</option>)}
          </select>
        </label>
        <div className="pdm-field" style={{ marginTop: 14 }}>
          <span>Preferência de período</span>
          <div className="pdm-seg">
            {["Manhã", "Tarde", "Noite"].map((p) => (
              <button type="button" key={p} className={"pdm-seg-btn" + (pref === p ? " active" : "")} onClick={() => setPref(p)}>{p}</button>
            ))}
          </div>
        </div>
        <div className="pdm-form-grid" style={{ marginTop: 14 }}>
          <Field label="Nome" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
          <Field label="WhatsApp" placeholder="(11) 9 0000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={!ok} style={{ marginTop: 20 }}>
          <Ic n="send" s={18} /> Enviar pedido de horário
        </button>
        <p className="center muted" style={{ fontSize: 12.5, marginTop: 12 }}>Sem compromisso, confirmamos juntos pelo WhatsApp.</p>
      </form>
    );
  }

  function Booking({ variant }) {
    return (
      <section className="section pdm-booking" id="agendar">
        <div className="wrap pdm-booking-grid">
          <SideInfo />
          {variant === "simples" ? <BookingSimple /> : <BookingFull />}
        </div>
      </section>
    );
  }

  Object.assign(window, { Booking });
})();
