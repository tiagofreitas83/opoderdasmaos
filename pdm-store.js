/* pdm-store.js — shared schedule store (localStorage) for site + admin.
   Plain JS. Exposes window.PDMStore. Same-origin: the public site writes
   booking requests here; the admin panel reads/manages them. */
(function () {
  const KEY = "pdm_appointments_v1";
  const BKEY = "pdm_blocks_v1";

  const SERVICES = [
    { id: "massagem", name: "Massagem terapêutica", dur: 50, price: 180 },
    { id: "acupuntura", name: "Acupuntura", dur: 60, price: 200 },
    { id: "mtc", name: "Medicina Chinesa", dur: 60, price: 200 },
    { id: "pilates", name: "Pilates", dur: 50, price: 150 },
  ];
  const PLANS = ["Avulsa", "Pacote 4 sessões", "Mensal"];
  const STATUS = {
    pendente:   { label: "Pendente",   color: "#D69B53", soft: "#F3E2C4" },
    confirmada: { label: "Confirmada", color: "#6E8367", soft: "#DDE5D6" },
    concluida:  { label: "Concluída",  color: "#8A7B70", soft: "#E7DFD6" },
    recusada:   { label: "Recusada",   color: "#C0573B", soft: "#F3D9CF" },
    cancelada:  { label: "Cancelada",  color: "#9A8F86", soft: "#E7DFD6" },
  };

  const brl = (n) => "R$ " + Number(n).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const pad = (n) => String(n).padStart(2, "0");
  const isoOf = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseISO = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const startOfWeek = (d) => { const x = new Date(d); const wd = (x.getDay() + 6) % 7; return addDays(x, -wd); }; // Monday
  const weekDays = (ref, n = 6) => { const s = startOfWeek(ref); return Array.from({ length: n }, (_, i) => addDays(s, i)); };
  const DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  const DOWL = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const MON = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const MONL = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  function monthMatrix(ref) {
    const first = new Date(ref.getFullYear(), ref.getMonth(), 1);
    const start = startOfWeek(first);
    return Array.from({ length: 42 }, (_, i) => addDays(start, i));
  }

  const read = (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch (e) { return []; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  function list() { return read(KEY); }
  function save(arr) { write(KEY, arr); }
  function add(appt) {
    const arr = read(KEY);
    const rec = Object.assign({
      id: uid(), status: "pendente", source: "site", createdAt: Date.now(),
      dur: 50, plan: "Avulsa", paid: false, sessionNotes: "",
    }, appt);
    arr.push(rec);
    save(arr);
    return rec;
  }
  function update(id, patch) {
    const arr = read(KEY).map((a) => (a.id === id ? Object.assign({}, a, patch) : a));
    save(arr);
    return arr.find((a) => a.id === id);
  }
  function remove(id) { save(read(KEY).filter((a) => a.id !== id)); }
  function removeSeries(rid) { if (!rid) return; save(read(KEY).filter((a) => a.recurId !== rid)); }
  function uid2() { return uid(); }

  function blocks() { return read(BKEY); }
  function addBlock(b) { const arr = read(BKEY); arr.push(Object.assign({ id: uid() }, b)); write(BKEY, arr); return arr; }
  function removeBlock(id) { write(BKEY, read(BKEY).filter((b) => b.id !== id)); }

  // derive client list with history
  function clients() {
    const map = {};
    read(KEY).forEach((a) => {
      const key = (a.phone || a.name || "").trim() || a.id;
      if (!map[key]) map[key] = { key, name: a.name, phone: a.phone, sessions: [], first: a.first };
      map[key].sessions.push(a);
      if (!map[key].name && a.name) map[key].name = a.name;
    });
    return Object.values(map).map((c) => {
      c.sessions.sort((x, y) => (x.date + x.time).localeCompare(y.date + y.time));
      c.total = c.sessions.length;
      c.done = c.sessions.filter((s) => s.status === "concluida").length;
      c.spent = c.sessions.filter((s) => s.paid).reduce((sum, s) => sum + (s.price || 0), 0);
      return c;
    }).sort((a, b) => (b.total - a.total));
  }

  function svc(id) { return SERVICES.find((s) => s.id === id) || SERVICES[0]; }

  // ----- demo seed -----
  function seedIfEmpty() {
    if (localStorage.getItem(KEY + "_seeded")) return;
    localStorage.setItem(KEY + "_seeded", "1");
    if (read(KEY).length) return;

    const today = new Date();
    const wk = weekDays(today, 6);
    const T = (id, name, phone, dayIdx, time, status, plan, paid, first, sn) => {
      const s = svc(id);
      return {
        id: uid(), service: id, serviceName: s.name, dur: s.dur, price: s.price,
        name, phone, date: isoOf(wk[dayIdx]), time, status, plan, paid: !!paid,
        first: !!first, source: status === "pendente" ? "site" : "manual",
        note: "", sessionNotes: sn || "", createdAt: Date.now(),
      };
    };
    const seed = [
      T("massagem", "Marina Ribeiro", "(51) 99812-3344", 0, "09:00", "confirmada", "Mensal", true, false, "Tensão cervical melhorando. Manter alongamento em casa."),
      T("acupuntura", "Eduardo Pacheco", "(51) 99655-1020", 0, "10:30", "confirmada", "Pacote 4 sessões", true, false, "Insônia — 3ª sessão. Relata sono mais profundo."),
      T("pilates", "Helena Costa", "(51) 99431-7788", 0, "14:00", "concluida", "Avulsa", true, false, "Pós-operatório de joelho. Boa evolução de amplitude."),
      T("pilates", "Rafael Nunes", "(51) 99120-4567", 0, "17:00", "confirmada", "Mensal", true, false, ""),
      T("massagem", "Carolina Mendes", "(51) 99888-2211", 1, "09:00", "confirmada", "Pacote 4 sessões", true, false, "Drenagem — retenção reduzida."),
      T("mtc", "Beatriz Lima", "(51) 99777-9090", 1, "11:00", "pendente", "Avulsa", false, true, ""),
      T("acupuntura", "Sofia Andrade", "(51) 99201-3030", 1, "15:30", "confirmada", "Avulsa", false, false, ""),
      T("massagem", "Lucas Ferreira", "(51) 99344-1212", 2, "10:30", "confirmada", "Avulsa", true, false, ""),
      T("pilates", "Helena Costa", "(51) 99431-7788", 2, "14:00", "confirmada", "Avulsa", false, false, ""),
      T("pilates", "Rafael Nunes", "(51) 99120-4567", 2, "18:30", "confirmada", "Mensal", true, false, ""),
      T("mtc", "Beatriz Lima", "(51) 99777-9090", 3, "09:00", "pendente", "Avulsa", false, false, ""),
      T("massagem", "Marina Ribeiro", "(51) 99812-3344", 3, "16:00", "confirmada", "Mensal", true, false, ""),
      T("acupuntura", "André Tavares", "(51) 99566-7878", 4, "10:30", "confirmada", "Pacote 4 sessões", true, false, ""),
      T("massagem", "Patrícia Gomes", "(51) 99655-4343", 4, "15:30", "pendente", "Avulsa", false, true, ""),
      T("pilates", "Gabriel Rocha", "(51) 99233-9999", 5, "09:00", "confirmada", "Avulsa", false, false, ""),
      T("pilates", "Carolina Mendes", "(51) 99888-2211", 5, "11:00", "confirmada", "Pacote 4 sessões", true, false, ""),
    ];
    save(seed);
    const lunch = wk.slice(0, 6).map((d) => ({ id: uid(), date: isoOf(d), start: "12:00", end: "13:30", reason: "Almoço" }));
    write(BKEY, lunch);
  }

  window.PDMStore = {
    KEY, BKEY, SERVICES, PLANS, STATUS, DOW, DOWL, MON, MONL,
    brl, isoOf, parseISO, addDays, startOfWeek, weekDays, monthMatrix, svc,
    list, save, add, update, remove, removeSeries, uid: uid2, blocks, addBlock, removeBlock, clients, seedIfEmpty,
  };
})();
