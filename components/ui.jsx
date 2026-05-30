/* ui.jsx — shared helpers, exported to window. Loaded first. */
(function () {
  const { useState, useEffect, useRef } = React;

  // ---- Icons: self-contained inline SVG dictionary (no deps) ----
  const ICON = {
    spa: '<circle cx="12" cy="12" r="2.4"/><path d="M12 9.6C12 6 10 4 7.6 4 7.6 7 9.6 9 12 9.6Z"/><path d="M12 9.6C12 6 14 4 16.4 4 16.4 7 14.4 9 12 9.6Z"/><path d="M9.7 11C6.4 9.8 4 10.6 3.3 13 6 14 8.7 13.3 9.7 11Z"/><path d="M14.3 11c3.3-1.2 5.7-.4 6.4 2-2.7 1-5.4.3-6.4-2Z"/><path d="M10.9 13.3c-2 2.8-2 5.2-.2 6.9 2-2 2.2-4.7.2-6.9Z"/><path d="M13.1 13.3c2 2.8 2 5.2.2 6.9-2-2-2.2-4.7-.2-6.9Z"/>',
    calendar_month: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/>',
    calendar_check: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/><path d="m9 16 2 2 4-4"/>',
    event_available: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/><path d="m9 16 2 2 4-4"/>',
    event_repeat: '<path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h7"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M20 17a3 3 0 1 1-1-2.2"/><path d="M20 13v2h-2"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    forum: '<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>',
    schedule: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    payments: '<rect width="18" height="14" x="3" y="6" rx="2.5"/><path d="M3 10.5h18"/><circle cx="16.5" cy="13.5" r="1.1" fill="currentColor" stroke="none"/>',
    savings: '<path d="M19 11.5V8l-3 1a8 8 0 0 0-4-1c-4 0-7 2.7-7 6 0 1.7.8 3.2 2 4.3V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-.4a8.5 8.5 0 0 0 3 0V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.6a6.7 6.7 0 0 0 1.6-2.4H20a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z"/><circle cx="9" cy="12.5" r="1" fill="currentColor" stroke="none"/>',
    bedtime: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    bloodtype: '<path d="M12 2.5S5 9 5 14a7 7 0 0 0 14 0c0-5-7-11.5-7-11.5Z"/>',
    water_drop: '<path d="M12 2.5S5 9 5 14a7 7 0 0 0 14 0c0-5-7-11.5-7-11.5Z"/>',
    sentiment_calm: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>',
    healing: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    self_improvement: '<circle cx="12" cy="5" r="1.3"/><path d="m9 20 3-6 3 6M6 8l6 2 6-2M12 10v4"/>',
    accessibility_new: '<circle cx="12" cy="5" r="1.3"/><path d="m9 20 3-6 3 6M6 8l6 2 6-2M12 10v4"/>',
    back_hand: '<path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.3l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/>',
    waving_hand: '<path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.3l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/>',
    favorite: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
    volunteer_activism: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
    auto_awesome: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"/><path d="M19 15l.6 1.6 1.6.6-1.6.6L19 20l-.6-1.6L16.8 17.8l1.6-.6Z"/>',
    celebration: '<path d="m2 22 5-13 8 8Z"/><path d="M13 6a2 2 0 0 1 2-2M16 9a3 3 0 0 1 3-3M14 2l.5 1.5M20 8l1.5.5M19 3l-1 1M22 6l-1 1"/>',
    bolt: '<path d="M13 2 3 14h7l-1 8 10-12h-7Z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
    verified: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    health_and_safety: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="M12 8v6M9 11h6"/>',
    nutrition: '<path d="M12 7c-1.5-2-4-2.5-5.5-1C5 7.2 5 9.6 6 12c1 2.5 2.5 4 4 4 .6 0 1-.2 2-.5 1 .3 1.4.5 2 .5 1.5 0 3-1.5 4-4 1-2.4 1-4.8-.5-6-1.5-1.3-4-1-5.5 1Z"/><path d="M12 7c0-1.5.5-3 2-4"/>',
    school: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.7 2 6 2s6-1 6-2v-5"/>',
    format_quote: '<path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2-1 3.5-3 4.5"/><path d="M19 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2-1 3.5-3 4.5"/>',
    loyalty: '<path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z"/><path d="M13 7v10"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    check_circle: '<circle cx="12" cy="12" r="10"/><path d="m8.5 12 2.5 2.5 4.5-4.5"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9.5a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4"/><path d="M12 17h.01"/>',
    menu_book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3Z"/>',
    place: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    location_on: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    alternate_email: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',
    send: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/>',
    route: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8"/>',
    clinical_notes: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/>',
    grass: '<path d="M12 20v-8"/><path d="M12 12c-3.3 0-5-2-5-5 3 0 5 2 5 5Z"/><path d="M12 12c0-3 2-5 5-5 0 3.3-2 5-5 5Z"/><path d="M7 20h10"/>',
    format_list_bulleted: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
    circle: '<circle cx="12" cy="12" r="9"/>',
    park: '<path d="M12 2 7 9h3l-4 6h4l-1.5 4h7L14 15h4l-4-6h3Z"/><path d="M12 19v3"/>',
    public: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z"/>',
    air: '<path d="M3 8h10a2.5 2.5 0 1 0-2.5-2.5"/><path d="M3 12h16a2.5 2.5 0 1 1-2.5 2.5"/><path d="M3 16h7a2.5 2.5 0 1 1-2.5 2.5"/>',
    local_fire_department: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5Z"/>',
    star: '<polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
    arrow_forward: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrow_back: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    add: '<path d="M5 12h14M12 5v14"/>',
    remove: '<path d="M5 12h14"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    chevron_left: '<path d="m15 18-6-6 6-6"/>',
    chevron_right: '<path d="m9 18 6-6-6-6"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    groups: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M5.5 21a7 7 0 0 1 13 0"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    delete: '<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>',
    inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.4 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.4-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.8 1.1Z"/>',
    event_busy: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/><path d="m14.5 14.5 3 3M17.5 14.5l-3 3"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7.5V12l3 1.5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/>',
    dashboard: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
    north_east: '<path d="M7 17 17 7M7 7h10v10"/>',
  };
  function Ic({ n, s = 22, style }) {
    const inner = ICON[n] || ICON.circle;
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        style={{ display: "inline-block", verticalAlign: "middle", flex: "none", ...(style || {}) }}
        dangerouslySetInnerHTML={{ __html: inner }}>
      </svg>
    );
  }

  // Brand mark — cupped hands cradling a qi dot, with rays
  function Mark({ size = 34, dotColor }) {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
           style={{ display: "block" }} aria-hidden="true">
        <circle cx="20" cy="14.5" r="3.4" fill={dotColor || "var(--primary)"} />
        <path d="M20 6.4v2.2M14.6 8.1l1 1.9M25.4 8.1l-1 1.9" stroke="var(--primary)"
              strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        <path d="M6.5 22.5C9 31 14 35 20 35s11-4 13.5-12.5" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" />
        <path d="M11.5 21.5C13.2 27.2 16.4 30 20 30s6.8-2.8 8.5-8.5" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      </svg>
    );
  }

  function Logo({ color }) {
    return (
      <a href="#topo" className="pdm-logo" style={{ display: "inline-flex", alignItems: "center", gap: 11, color: color || "var(--ink)" }}>
        <Mark size={32} />
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.02 }}>
          <span className="display" style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.005em", whiteSpace: "nowrap" }}>
            O Poder das Mãos
          </span>
          <span style={{ fontSize: 9.5, letterSpacing: "0.34em", textTransform: "uppercase", color: "var(--ink-3)", fontWeight: 600, marginTop: 2 }}>
            Terapias Integrativas
          </span>
        </span>
      </a>
    );
  }

  // BRL formatting
  const brl = (n) =>
    "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // WhatsApp deep link
  const WA_NUMBER = "5551985792797";
  const wa = (msg) =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg || "Olá! Gostaria de agendar uma sessão no Poder das Mãos.")}`;

  // Scroll reveal hook — adds .in when element enters viewport
  function useReveal() {
    useEffect(() => {
      const els = document.querySelectorAll(".reveal:not(.in)");
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    });
  }

  // Section heading block
  function Eyebrow({ children, icon }) {
    return (
      <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        {icon && <Ic n={icon} s={16} />}
        {children}
      </span>
    );
  }

  Object.assign(window, { Ic, Mark, Logo, brl, wa, WA_NUMBER, useReveal, Eyebrow });
})();
