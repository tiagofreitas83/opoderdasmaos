/* admin-panels.jsx — Login, Requests, Clients, Drawer, Appt modal, Block modal */
(function () {
  const { useState } = React;
  const { Ic, Mark } = window;
  const S = window.PDMStore;
  const initials = (n) => (n || "?").trim().split(/\s+/).slice(0, 2).map((x) => x[0]).join("").toUpperCase();
  const waTo = (phone, msg) => `https://wa.me/55${(phone || "").replace(/\D/g, "")}?text=${encodeURIComponent(msg || "")}`;
  const fmtDate = (iso) => { if (!iso) return "Sem data"; const d = S.parseISO(iso); return `${S.DOWL[d.getDay()].slice(0,3)}, ${d.getDate()} ${S.MON[d.getMonth()]}`; };

  const ADM_USER = "tiagosilveira";
  const ADM_HASH = "4299235aec2c347e02ad24f6d0ae07c8a89b984d04ab51d1b2ee693fd9a23ec9";
  async function sha256(str) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function Login({ onPick }) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [err, setErr] = useState("");
    const [busy, setBusy] = useState(false);
    const submit = async (e) => {
      e.preventDefault();
      setBusy(true); setErr("");
      const hash = await sha256(pass);
      if (user.trim().toLowerCase() === ADM_USER && hash === ADM_HASH) {
        onPick({ id: "tiago", name: "Tiago Silveira", ini: "TS" });
      } else {
        setErr("Usuário ou senha incorretos.");
      }
      setBusy(false);
    };
    return (
      <div className="adm-login">
        <form className="adm-login-card" onSubmit={submit} autoComplete="on">
          <div className="adm-login-mark"><Mark size={30} dotColor="var(--ochre)" /></div>
          <h1>Painel da Agenda</h1>
          <p>O Poder das Mãos · acesso restrito</p>
          <div className="adm-f" style={{ textAlign: "left", marginBottom: 12 }}>
            <label>Usuário</label>
            <input value={user} autoComplete="username" placeholder="usuário"
              onChange={(e) => { setUser(e.target.value); setErr(""); }} />
          </div>
          <div className="adm-f" style={{ textAlign: "left" }}>
            <label>Senha</label>
            <input type="password" value={pass} autoComplete="current-password" placeholder="senha"
              onChange={(e) => { setPass(e.target.value); setErr(""); }} />
          </div>
          {err && <p style={{ color: "var(--error-600, #C0573B)", fontSize: 13, margin: "12px 0 0", fontWeight: 600 }}>{err}</p>}
          <button className="adm-btn" type="submit" disabled={busy}
            style={{ width: "100%", justifyContent: "center", marginTop: 18, padding: "13px" }}>
            <Ic n="lock" s={18} /> {busy ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  function StatusChip({ status }) {
    const m = S.STATUS[status] || S.STATUS.pendente;
    return <span className="adm-chip" style={{ "--cs": m.soft, "--c2": m.color }}>
      <span style={{ width: 7, height: 7, borderRadius: 9, background: m.color }} />{m.label}
    </span>;
  }

  function RequestsInbox({ appts, onConfirm, onRefuse, onOpen }) {
    const pend = appts.filter((a) => a.status === "pendente").sort((a, b) => b.createdAt - a.createdAt);
    if (!pend.length) return (
      <div className="adm-empty">
        <div className="ic"><Ic n="inbox" s={28} /></div>
        <h3 style={{ margin: 0 }}>Nenhum pedido pendente</h3>
        <p style={{ marginTop: 6 }}>Novos agendamentos feitos no site aparecem aqui.</p>
      </div>
    );
    return (
      <div className="adm-req-list">
        {pend.map((a) => (
          <div key={a.id} className="adm-req pend">
            <span className="adm-req-av">{initials(a.name)}</span>
            <div className="adm-req-main" onClick={() => onOpen(a)} style={{ cursor: "pointer" }}>
              <b>{a.name}</b> {a.first && <span className="adm-chip" style={{ "--cs": "var(--ochre-soft)", "--c2": "var(--primary-deep)" }}>1ª vez</span>}
              <div className="adm-req-meta">
                <span><Ic n="spa" s={14} /> {a.serviceName}</span>
                <span><Ic n="calendar_month" s={14} /> {fmtDate(a.date)}{a.time ? " · " + a.time : ""}</span>
                <span><Ic n="phone" s={14} /> {a.phone || "—"}</span>
                {a.note && <span><Ic n="forum" s={14} /> {a.note}</span>}
              </div>
            </div>
            <div className="adm-req-actions">
              <a className="adm-btn adm-btn-ghost" href={waTo(a.phone, `Olá ${a.name}! Aqui é do Poder das Mãos.`)} target="_blank" rel="noreferrer"><Ic n="chat" s={16} /></a>
              <button className="adm-btn adm-btn-ghost" onClick={() => onRefuse(a)}><Ic n="close" s={16} /> Recusar</button>
              <button className="adm-btn" onClick={() => onConfirm(a)}><Ic n="check" s={16} /> Confirmar</button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function ClientsList({ clients, onOpen }) {
    if (!clients.length) return <div className="adm-empty"><div className="ic"><Ic n="groups" s={28} /></div><h3 style={{ margin: 0 }}>Sem clientes ainda</h3></div>;
    return (
      <div className="adm-cli-list">
        {clients.map((c) => (
          <div key={c.key} className="adm-cli" onClick={() => onOpen(c)}>
            <span className="adm-req-av">{initials(c.name)}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <b style={{ fontSize: 15 }}>{c.name}</b>
              <div className="adm-req-meta"><span><Ic n="phone" s={14} /> {c.phone || "—"}</span></div>
            </div>
            <div className="adm-cli-stat"><div className="v">{c.total}</div><div className="l">sessões</div></div>
            <div className="adm-cli-stat"><div className="v">{c.done}</div><div className="l">concluídas</div></div>
            <div className="adm-cli-stat"><div className="v" style={{ fontSize: 15 }}>{S.brl(c.spent)}</div><div className="l">pago</div></div>
            <Ic n="chevron_right" s={20} style={{ color: "var(--ink-3)" }} />
          </div>
        ))}
      </div>
    );
  }

  function ClientDrawer({ client, onClose, onOpen }) {
    if (!client) return null;
    return (
      <>
        <div className="adm-overlay" style={{ background: "rgba(30,22,16,.3)" }} onClick={onClose}></div>
        <aside className="adm-drawer">
          <div className="adm-drawer-head">
            <span className="adm-req-av" style={{ width: 50, height: 50, fontSize: 20 }}>{initials(client.name)}</span>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: 19 }}>{client.name}</h3>
              <div className="muted" style={{ fontSize: 13 }}>{client.phone}</div>
            </div>
            <a className="adm-btn adm-btn-ghost" href={waTo(client.phone, `Olá ${client.name}!`)} target="_blank" rel="noreferrer"><Ic n="chat" s={16} /></a>
            <button className="adm-modal-x" onClick={onClose}><Ic n="close" s={22} /></button>
          </div>
          <div className="adm-drawer-body">
            <div className="adm-stats" style={{ gridTemplateColumns: "1fr 1fr 1fr", marginBottom: 20 }}>
              <div className="adm-stat"><div className="v">{client.total}</div><div className="l">sessões</div></div>
              <div className="adm-stat"><div className="v">{client.done}</div><div className="l">concluídas</div></div>
              <div className="adm-stat"><div className="v" style={{ fontSize: 20 }}>{S.brl(client.spent)}</div><div className="l">total pago</div></div>
            </div>
            <div className="adm-section-lbl">Histórico de sessões</div>
            <div className="adm-hist">
              {client.sessions.slice().reverse().map((s) => (
                <div key={s.id} className="adm-hist-item" onClick={() => onOpen(s)} style={{ cursor: "pointer" }}>
                  <div className="hh">
                    <div><b style={{ fontSize: 14 }}>{s.serviceName}</b><div className="muted" style={{ fontSize: 12.5 }}>{fmtDate(s.date)}{s.time ? " · " + s.time : ""} · {s.plan}</div></div>
                    <StatusChip status={s.status} />
                  </div>
                  {s.sessionNotes && <div className="hn">“{s.sessionNotes}”</div>}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </>
    );
  }

  const STATUS_ORDER = ["pendente", "confirmada", "concluida", "cancelada", "recusada"];

  function ApptModal({ appt, onClose, onSave, onDelete, onDeleteSeries }) {
    const [st, setSt] = useState(appt.status);
    const [date, setDate] = useState(appt.date || "");
    const [time, setTime] = useState(appt.time || "");
    const [plan, setPlan] = useState(appt.plan || "Avulsa");
    const [paid, setPaid] = useState(!!appt.paid);
    const [notes, setNotes] = useState(appt.sessionNotes || "");
    const save = () => { onSave(appt.id, { status: st, date, time, plan, paid, sessionNotes: notes }); onClose(); };
    return (
      <>
        <div className="adm-overlay" onClick={onClose}></div>
        <div className="adm-overlay" style={{ background: "transparent", pointerEvents: "none" }}>
          <div className="adm-modal" style={{ pointerEvents: "auto" }}>
            <div className="adm-modal-head">
              <span className="adm-req-av">{initials(appt.name)}</span>
              <div>
                <h3>{appt.name}</h3>
                <div className="sub">{appt.serviceName} · {appt.dur} min · {appt.phone || "sem telefone"}</div>
                {appt.recurId && <div style={{ marginTop: 6 }}><span className="adm-chip" style={{ "--cs": "var(--primary-soft)", "--c2": "var(--primary-deep)" }}><Ic n="event_repeat" s={14} /> {appt.recurLabel || "Horário fixo"}</span></div>}
              </div>
              <button className="adm-modal-x" onClick={onClose}><Ic n="close" s={22} /></button>
            </div>
            <div className="adm-modal-body">
              {appt.note && <div className="adm-pay-row" style={{ marginTop: 0 }}><Ic n="forum" s={18} style={{ color: "var(--primary)" }} /><span style={{ fontSize: 13.5 }}>{appt.note}</span></div>}

              <div className="adm-section-lbl">Situação</div>
              <div className="adm-status-row">
                {STATUS_ORDER.map((s) => {
                  const m = S.STATUS[s];
                  return (
                    <button key={s} className={"adm-status-btn" + (st === s ? " on" : "")}
                      style={st === s ? { background: m.color } : { color: m.color }}
                      onClick={() => setSt(s)}>
                      <span style={{ width: 8, height: 8, borderRadius: 9, background: st === s ? "#fff" : m.color }} />{m.label}
                    </button>
                  );
                })}
              </div>

              <div className="adm-section-lbl">Data e horário</div>
              <div className="adm-field-row">
                <div className="adm-f"><label>Data</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
                <div className="adm-f"><label>Horário</label><input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></div>
              </div>

              <div className="adm-section-lbl">Plano e pagamento</div>
              <div className="adm-field-row">
                <div className="adm-f"><label>Plano</label>
                  <select value={plan} onChange={(e) => setPlan(e.target.value)}>{S.PLANS.map((p) => <option key={p}>{p}</option>)}</select>
                </div>
                <div className="adm-f"><label>Valor</label><input value={S.brl(appt.price || 0)} readOnly /></div>
              </div>
              <div className="adm-pay-row">
                <button className={"adm-toggle" + (paid ? " on" : "")} onClick={() => setPaid((v) => !v)}></button>
                <div><b style={{ fontSize: 14 }}>{paid ? "Pagamento recebido" : "Pagamento pendente"}</b><div className="muted" style={{ fontSize: 12.5 }}>{S.brl(appt.price || 0)} · {plan}</div></div>
              </div>

              <div className="adm-section-lbl">Anotações da sessão (evolução)</div>
              <div className="adm-f"><textarea rows={3} value={notes} placeholder="Queixa, conduta, evolução do paciente..." onChange={(e) => setNotes(e.target.value)}></textarea></div>
            </div>
            <div className="adm-modal-foot">
              <button className="adm-btn adm-btn-danger" onClick={() => { onDelete(appt.id); onClose(); }}><Ic n="delete" s={16} /> Excluir</button>
              {appt.recurId && <button className="adm-btn adm-btn-danger" onClick={() => { onDeleteSeries(appt.recurId); onClose(); }}><Ic n="event_busy" s={16} /> Excluir série</button>}
              <div className="adm-spacer"></div>
              <button className="adm-btn adm-btn-ghost" onClick={onClose}>Cancelar</button>
              <button className="adm-btn" onClick={save}><Ic n="check" s={16} /> Salvar</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  function BlockModal({ onClose, onAdd, refIso }) {
    const [date, setDate] = useState(refIso);
    const [start, setStart] = useState("12:00");
    const [end, setEnd] = useState("13:30");
    const [reason, setReason] = useState("Almoço");
    return (
      <>
        <div className="adm-overlay" onClick={onClose}></div>
        <div className="adm-overlay" style={{ background: "transparent", pointerEvents: "none" }}>
          <div className="adm-modal" style={{ maxWidth: 440, pointerEvents: "auto" }}>
            <div className="adm-modal-head">
              <span className="adm-req-av" style={{ background: "var(--ink)", color: "var(--paper)" }}><Ic n="event_busy" s={22} /></span>
              <div><h3>Bloquear horário</h3><div className="sub">Almoço, folga, férias ou imprevisto</div></div>
              <button className="adm-modal-x" onClick={onClose}><Ic n="close" s={22} /></button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-f" style={{ marginTop: 6 }}><label>Data</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
              <div className="adm-field-row">
                <div className="adm-f"><label>Início</label><input type="time" value={start} onChange={(e) => setStart(e.target.value)} /></div>
                <div className="adm-f"><label>Fim</label><input type="time" value={end} onChange={(e) => setEnd(e.target.value)} /></div>
              </div>
              <div className="adm-f" style={{ marginTop: 14 }}><label>Motivo</label>
                <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Ex.: Almoço, Folga, Férias" /></div>
            </div>
            <div className="adm-modal-foot">
              <button className="adm-btn adm-btn-ghost" onClick={onClose}>Cancelar</button>
              <button className="adm-btn" onClick={() => { onAdd({ date, start, end, reason }); onClose(); }}><Ic n="lock" s={16} /> Bloquear</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  function RecurModal({ onClose, onCreate, clients }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [service, setService] = useState("massagem");
    const [weekday, setWeekday] = useState("1");
    const [time, setTime] = useState("09:00");
    const [freq, setFreq] = useState("semanal");
    const [count, setCount] = useState("8");
    const [endDate, setEndDate] = useState("");
    const [plan, setPlan] = useState("Mensal");
    const svc = S.svc(service);

    const occurrences = () => {
      let d = new Date(); d.setHours(0, 0, 0, 0);
      const wd = Number(weekday); let guard = 0;
      while (d.getDay() !== wd && guard < 8) { d = S.addDays(d, 1); guard++; }
      if (freq === "unica") return [d];
      const step = freq === "quinzenal" ? 14 : 7;
      const out = []; let cur = new Date(d), g = 0;
      if (count === "date") {
        const end = endDate ? S.parseISO(endDate) : S.addDays(d, 7 * 8);
        while (cur <= end && g < 300) { out.push(new Date(cur)); cur = S.addDays(cur, step); g++; }
      } else if (count === "open") {
        const end = S.addDays(d, 7 * 26);
        while (cur <= end && g < 300) { out.push(new Date(cur)); cur = S.addDays(cur, step); g++; }
      } else {
        const n = Number(count); for (let i = 0; i < n; i++) { out.push(new Date(cur)); cur = S.addDays(cur, step); }
      }
      return out;
    };
    const occ = occurrences();

    const create = () => {
      if (!name.trim()) return;
      const recurId = freq === "unica" ? null : S.uid();
      const freqLabel = freq === "quinzenal" ? "Quinzenal" : "Semanal";
      const label = `${freqLabel} · ${S.DOWL[Number(weekday)].slice(0, 3)} ${time}`;
      occ.forEach((d) => {
        S.add({
          service, serviceName: svc.name, price: svc.price, dur: svc.dur,
          name: name.trim(), phone: phone.trim(), date: S.isoOf(d), time,
          status: "confirmada", source: "manual", plan,
          recurId, recurLabel: recurId ? label : "",
        });
      });
      onCreate(); onClose();
    };

    const fmt = (d) => `${d.getDate()} ${S.MON[d.getMonth()]}`;

    return (
      <>
        <div className="adm-overlay" onClick={onClose}></div>
        <div className="adm-overlay" style={{ background: "transparent", pointerEvents: "none" }}>
          <div className="adm-modal" style={{ pointerEvents: "auto" }}>
            <div className="adm-modal-head">
              <span className="adm-req-av" style={{ background: "var(--primary)", color: "#fff" }}><Ic n="event_repeat" s={22} /></span>
              <div><h3>Horário fixo</h3><div className="sub">Reserve a mesma vaga para um cliente, de forma recorrente</div></div>
              <button className="adm-modal-x" onClick={onClose}><Ic n="close" s={22} /></button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-field-row">
                <div className="adm-f"><label>Cliente</label>
                  <input list="adm-cli-names" value={name} placeholder="Nome do cliente"
                    onChange={(e) => { const v = e.target.value; setName(v); const c = clients.find((c) => c.name === v); if (c && c.phone) setPhone(c.phone); }} />
                  <datalist id="adm-cli-names">{clients.map((c) => <option key={c.key} value={c.name} />)}</datalist>
                </div>
                <div className="adm-f"><label>WhatsApp</label><input value={phone} placeholder="(51) 9 0000-0000" onChange={(e) => setPhone(e.target.value)} /></div>
              </div>
              <div className="adm-field-row">
                <div className="adm-f"><label>Terapia</label>
                  <select value={service} onChange={(e) => setService(e.target.value)}>{S.SERVICES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
                </div>
                <div className="adm-f"><label>Plano</label>
                  <select value={plan} onChange={(e) => setPlan(e.target.value)}>{S.PLANS.map((p) => <option key={p}>{p}</option>)}</select>
                </div>
              </div>
              <div className="adm-field-row">
                <div className="adm-f"><label>Dia da semana</label>
                  <select value={weekday} onChange={(e) => setWeekday(e.target.value)}>
                    {[1, 2, 3, 4, 5, 6].map((w) => <option key={w} value={w}>{S.DOWL[w]}</option>)}
                  </select>
                </div>
                <div className="adm-f"><label>Horário</label><input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></div>
              </div>
              <div className="adm-field-row">
                <div className="adm-f"><label>Repetição</label>
                  <select value={freq} onChange={(e) => setFreq(e.target.value)}>
                    <option value="unica">Sessão única (não repete)</option>
                    <option value="semanal">Toda semana</option>
                    <option value="quinzenal">A cada 15 dias</option>
                  </select>
                </div>
                {freq !== "unica" && (
                  <div className="adm-f"><label>Por quanto tempo</label>
                    <select value={count} onChange={(e) => setCount(e.target.value)}>
                      <option value="4">4 sessões</option>
                      <option value="8">8 sessões</option>
                      <option value="12">12 sessões</option>
                      <option value="date">Até uma data</option>
                      <option value="open">Sem fim definido (6 meses)</option>
                    </select>
                  </div>
                )}
              </div>
              {freq !== "unica" && count === "date" && (
                <div className="adm-f" style={{ marginTop: 14 }}><label>Repetir até</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
              )}
              <div className="adm-pay-row" style={{ marginTop: 18 }}>
                <Ic n="event_repeat" s={20} style={{ color: "var(--primary)" }} />
                <div style={{ fontSize: 13.5 }}>
                  {freq === "unica"
                    ? <>Será criada <b>1 sessão</b> em {occ[0] ? fmt(occ[0]) : "—"}.</>
                    : <>Serão criadas <b>{occ.length} sessões</b> — de {occ[0] ? fmt(occ[0]) : "—"} a {occ.length ? fmt(occ[occ.length - 1]) : "—"}.</>}
                </div>
              </div>
            </div>
            <div className="adm-modal-foot">
              <button className="adm-btn adm-btn-ghost" onClick={onClose}>Cancelar</button>
              <button className="adm-btn" onClick={create} disabled={!name.trim()}><Ic n="check" s={16} /> Reservar {freq === "unica" ? "sessão" : occ.length + " sessões"}</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  window.AdminPanels = { Login, RequestsInbox, ClientsList, ClientDrawer, ApptModal, BlockModal, RecurModal, StatusChip, waTo, fmtDate, initials };
})();
