/* admin-views.jsx — Day / Week / Month calendar views */
(function () {
  const { Ic } = window;
  const S = window.PDMStore;
  const HOURS = Array.from({ length: 13 }, (_, i) => 8 + i); // 8..20
  const HOURH = 56;
  const BODYH = 12 * HOURH;

  const tpos = (t) => { const [h, m] = (t || "08:00").split(":").map(Number); return (h + m / 60 - 8) * HOURH; };
  const initials = (n) => (n || "?").trim().split(/\s+/).slice(0, 2).map((x) => x[0]).join("").toUpperCase();

  function ApptBlock({ a, onOpen, compact }) {
    const meta = S.STATUS[a.status] || S.STATUS.pendente;
    const top = tpos(a.time);
    const h = Math.max((a.dur || 50) / 60 * HOURH, 26);
    return (
      <div className={"adm-appt " + a.status} style={{ top, height: h - 3, "--c": meta.color, "--cs": meta.soft }}
        onClick={(e) => { e.stopPropagation(); onOpen(a); }} title={a.serviceName + " · " + a.name}>
        <div className="t">{a.time}{a.status === "pendente" ? " · pedido" : ""}</div>
        {h > 40 && <div className="s">{a.serviceName}</div>}
        <div className="n">{a.name}</div>
      </div>
    );
  }

  function NowLine({ day }) {
    const now = new Date();
    if (S.isoOf(now) !== S.isoOf(day)) return null;
    const pos = (now.getHours() + now.getMinutes() / 60 - 8) * HOURH;
    if (pos < 0 || pos > BODYH) return null;
    return <div className="adm-nowline" style={{ top: pos }} />;
  }

  function TimeGrid({ days, appts, blocks, onOpen, onPickDay }) {
    const tmpl = `64px repeat(${days.length}, 1fr)`;
    const today = S.isoOf(new Date());
    return (
      <div className="adm-cal">
        <div className="adm-cal-head" style={{ gridTemplateColumns: tmpl }}>
          <div className="gutter"></div>
          {days.map((d, i) => {
            const iso = S.isoOf(d);
            return (
              <div key={i} className={"adm-cal-dayhdr" + (iso === today ? " today" : "")}
                onClick={() => onPickDay && onPickDay(d)} style={{ cursor: onPickDay ? "pointer" : "default" }}>
                <div className="dow">{S.DOWL[d.getDay()].slice(0, 3)}</div>
                <div className="num">{d.getDate()}</div>
              </div>
            );
          })}
        </div>
        <div className="adm-cal-body">
          <div className="adm-grid-cols" style={{ gridTemplateColumns: tmpl, height: BODYH }}>
            <div className="adm-gutter" style={{ position: "relative" }}>
              {HOURS.map((h, i) => (
                <div key={h} className="adm-hour-lbl" style={{ position: "absolute", top: i * HOURH - 7, right: 0, left: 0 }}>{h}:00</div>
              ))}
            </div>
            {days.map((d, di) => {
              const iso = S.isoOf(d);
              const dayAppts = appts.filter((a) => a.date === iso && a.status !== "recusada" && a.status !== "cancelada");
              const dayBlocks = blocks.filter((b) => b.date === iso);
              return (
                <div key={di} className="adm-daycol">
                  {HOURS.slice(0, 12).map((h) => <div key={h} className="adm-hour-line" />)}
                  {dayBlocks.map((b) => {
                    const top = tpos(b.start); const hh = tpos(b.end) - top;
                    return (
                      <div key={b.id} className="adm-block" style={{ top, height: Math.max(hh - 3, 20) }}>
                        <Ic n="lock" s={13} />{b.reason}
                      </div>
                    );
                  })}
                  {dayAppts.map((a) => <ApptBlock key={a.id} a={a} onOpen={onOpen} />)}
                  <NowLine day={d} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  function DayView(props) { return <TimeGrid days={[props.refDate]} {...props} />; }
  function WeekView(props) { return <TimeGrid days={S.weekDays(props.refDate, 6)} {...props} />; }

  function MonthView({ refDate, appts, onPickDay }) {
    const cells = S.monthMatrix(refDate);
    const today = S.isoOf(new Date());
    const dows = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    return (
      <div className="adm-month">
        <div className="adm-month-dows">{dows.map((d) => <div key={d}>{d}</div>)}</div>
        <div className="adm-month-grid">
          {cells.map((d, i) => {
            const iso = S.isoOf(d);
            const dim = d.getMonth() !== refDate.getMonth();
            const dayAppts = appts.filter((a) => a.date === iso && a.status !== "recusada" && a.status !== "cancelada")
              .sort((x, y) => x.time.localeCompare(y.time));
            return (
              <div key={i} className={"adm-mcell" + (dim ? " dim" : "") + (iso === today ? " today" : "")}
                onClick={() => onPickDay(d)}>
                <div className="mnum">{d.getDate()}</div>
                {dayAppts.slice(0, 3).map((a) => {
                  const m = S.STATUS[a.status] || S.STATUS.pendente;
                  return <div key={a.id} className="adm-mchip" style={{ "--c": m.color, "--cs": m.soft }}>{a.time} {a.serviceName.split(" ")[0]}</div>;
                })}
                {dayAppts.length > 3 && <div className="adm-mmore">+{dayAppts.length - 3} mais</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  window.AdminViews = { DayView, WeekView, MonthView, initials };
})();
