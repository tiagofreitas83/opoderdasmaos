/* admin-app.jsx — Painel da Agenda shell + state + mount */
(function () {
  const { useState, useEffect } = React;
  const { Ic, Mark } = window;
  const S = window.PDMStore;
  const { DayView, WeekView, MonthView } = window.AdminViews;
  const { Login, RequestsInbox, ClientsList, ClientDrawer, ApptModal, BlockModal, RecurModal } = window.AdminPanels;

  const MON = S.MON, MONL = S.MONL, DOWL = S.DOWL;

  function AdminApp() {
    const [role, setRole] = useState(null);
    const [section, setSection] = useState("agenda");
    const [view, setView] = useState("semana");
    const [refDate, setRefDate] = useState(new Date());
    const [rev, setRev] = useState(0);
    const [selected, setSelected] = useState(null);
    const [client, setClient] = useState(null);
    const [blockOpen, setBlockOpen] = useState(false);
    const [recurOpen, setRecurOpen] = useState(false);

    useEffect(() => { S.seedIfEmpty(); setRev((r) => r + 1); }, []);
    const reload = () => setRev((r) => r + 1);

    const appts = S.list();
    const blocks = S.blocks();
    const clients = S.clients();
    const pendCount = appts.filter((a) => a.status === "pendente").length;

    const onSave = (id, patch) => { S.update(id, patch); reload(); };
    const onDelete = (id) => { S.remove(id); reload(); };
    const onConfirm = (a) => { S.update(a.id, { status: "confirmada" }); reload(); };
    const onRefuse = (a) => { S.update(a.id, { status: "recusada" }); reload(); };
    const addBlock = (b) => { S.addBlock(b); reload(); };
    const deleteSeries = (rid) => { S.removeSeries(rid); reload(); };

    const shift = (dir) => {
      const d = new Date(refDate);
      if (view === "dia") d.setDate(d.getDate() + dir);
      else if (view === "semana") d.setDate(d.getDate() + dir * 7);
      else d.setMonth(d.getMonth() + dir);
      setRefDate(d);
    };
    const pickDay = (d) => { setRefDate(new Date(d)); setView("dia"); setSection("agenda"); };

    const title = () => {
      if (section === "pedidos") return "Pedidos";
      if (section === "clientes") return "Clientes";
      if (view === "dia") return `${DOWL[refDate.getDay()]}, ${refDate.getDate()} ${MON[refDate.getMonth()]}`;
      if (view === "semana") { const w = S.weekDays(refDate, 6); return `${w[0].getDate()} ${MON[w[0].getMonth()]} – ${w[5].getDate()} ${MON[w[5].getMonth()]}`; }
      return `${MONL[refDate.getMonth()]} ${refDate.getFullYear()}`;
    };

    // stats for current week
    const wk = S.weekDays(refDate, 6).map((d) => S.isoOf(d));
    const todayISO = S.isoOf(new Date());
    const active = (a) => a.status !== "recusada" && a.status !== "cancelada";
    const todays = appts.filter((a) => a.date === todayISO && active(a));
    const weekAppts = appts.filter((a) => wk.includes(a.date) && active(a));
    const received = appts.filter((a) => wk.includes(a.date) && a.paid).reduce((s, a) => s + (a.price || 0), 0);

    if (!role) return <Login onPick={setRole} />;

    const NAV = [
      ["agenda", "Agenda", "calendar_month"],
      ["pedidos", "Pedidos", "inbox"],
      ["clientes", "Clientes", "groups"],
    ];

    return (
      <div className="adm-shell">
        <aside className="adm-side">
          <div className="adm-side-logo">
            <Mark size={30} dotColor="var(--ochre)" />
            <span className="adm-lg-txt"><b>O Poder das Mãos</b><small>Agenda</small></span>
          </div>
          <nav className="adm-nav">
            {NAV.map(([id, label, ic]) => (
              <button key={id} className={"adm-nav-item" + (section === id ? " active" : "")} onClick={() => setSection(id)}>
                <Ic n={ic} s={19} /> {label}
                {id === "pedidos" && pendCount > 0 && <span className="adm-nav-badge">{pendCount}</span>}
              </button>
            ))}
          </nav>
          <div className="adm-side-foot">
            <span className="adm-role-av">{role.ini}</span>
            <div><b>{role.name.split(" ")[0]}</b><small>{role.id === "tiago" ? "Terapeuta" : "Recepção"}</small></div>
            <button onClick={() => setRole(null)} title="Sair"><Ic n="logout" s={18} /></button>
          </div>
        </aside>

        <div className="adm-main">
          <header className="adm-top">
            <h1>{title()}</h1>
            {section === "agenda" && (
              <div className="adm-date-nav">
                <button className="adm-icon-btn" onClick={() => shift(-1)}><Ic n="chevron_left" s={20} /></button>
                <button className="adm-today-btn" onClick={() => setRefDate(new Date())}>Hoje</button>
                <button className="adm-icon-btn" onClick={() => shift(1)}><Ic n="chevron_right" s={20} /></button>
              </div>
            )}
            <div className="adm-spacer"></div>
            {section === "agenda" && (
              <>
                <div className="adm-seg">
                  {["dia", "semana", "mes"].map((v) => (
                    <button key={v} className={view === v ? "active" : ""} onClick={() => setView(v)}>
                      {v === "dia" ? "Dia" : v === "semana" ? "Semana" : "Mês"}
                    </button>
                  ))}
                </div>
                <button className="adm-btn adm-btn-ghost" onClick={() => setBlockOpen(true)}><Ic n="event_busy" s={16} /> Bloquear</button>
                <button className="adm-btn" onClick={() => setRecurOpen(true)}><Ic n="event_repeat" s={16} /> Horário fixo</button>
              </>
            )}
          </header>

          <div className="adm-content">
            {section === "agenda" && (
              <>
                <div className="adm-stats">
                  <div className="adm-stat"><div className="v">{todays.length}</div><div className="l"><Ic n="calendar_month" s={15} /> sessões hoje</div></div>
                  <div className="adm-stat"><div className="v" style={{ color: pendCount ? "var(--ochre)" : "var(--ink)" }}>{pendCount}</div><div className="l"><Ic n="inbox" s={15} /> pedidos pendentes</div></div>
                  <div className="adm-stat"><div className="v">{weekAppts.length}</div><div className="l"><Ic n="event_available" s={15} /> sessões na semana</div></div>
                  <div className="adm-stat"><div className="v" style={{ fontSize: 22 }}>{S.brl(received)}</div><div className="l"><Ic n="payments" s={15} /> recebido (semana)</div></div>
                </div>
                {view === "dia" && <DayView refDate={refDate} appts={appts} blocks={blocks} onOpen={setSelected} />}
                {view === "semana" && <WeekView refDate={refDate} appts={appts} blocks={blocks} onOpen={setSelected} onPickDay={pickDay} />}
                {view === "mes" && <MonthView refDate={refDate} appts={appts} onPickDay={pickDay} />}
              </>
            )}
            {section === "pedidos" && <RequestsInbox appts={appts} onConfirm={onConfirm} onRefuse={onRefuse} onOpen={setSelected} />}
            {section === "clientes" && <ClientsList clients={clients} onOpen={setClient} />}
          </div>
        </div>

        {selected && <ApptModal appt={selected} onClose={() => setSelected(null)} onSave={onSave} onDelete={onDelete} onDeleteSeries={deleteSeries} />}
        {client && <ClientDrawer client={client} onClose={() => setClient(null)} onOpen={(a) => { setClient(null); setSelected(a); }} />}
        {blockOpen && <BlockModal onClose={() => setBlockOpen(false)} onAdd={addBlock} refIso={S.isoOf(refDate)} />}
        {recurOpen && <RecurModal onClose={() => setRecurOpen(false)} onCreate={reload} clients={clients} />}
      </div>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById("adm-root"));
  root.render(<AdminApp />);
})();
