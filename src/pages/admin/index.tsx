import React, { useState } from "react";
import DashboardView from "./views/DashboardView";
import GenresView from "./views/GenresView";
import MangasView from "./views/MangasView";
import StatsView from "./views/StatsView";
import UsersView, { CommentsView } from "./views/UsersView";

type Page = "dashboard" | "genres" | "mangas" | "users" | "comments" | "stats";

const navItems: { key: Page; label: string; icon: string }[] = [
  { key: "dashboard", label: "Tổng quan", icon: "🏠" },
  { key: "genres",    label: "Thể loại",  icon: "📂" },
  { key: "mangas",    label: "Truyện",    icon: "📚" },
  { key: "users",     label: "Người dùng",icon: "👤" },
  { key: "comments",  label: "Bình luận", icon: "💬" },
  { key: "stats",     label: "Thống kê",  icon: "📈" },
];

const AdminPage = () => {
  const [page, setPage] = useState<Page>("dashboard");
  const [sideOpen, setSideOpen] = useState(true);

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <DashboardView />;
      case "genres":    return <GenresView />;
      case "mangas":    return <MangasView />;
      case "users":     return <UsersView />;
      case "comments":  return <CommentsView />;
      case "stats":     return <StatsView />;
    }
  };

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* ── SIDEBAR ── */}
      <aside style={{ ...s.sidebar, width: sideOpen ? 220 : 60 }}>
        {/* Logo */}
        <div style={s.logo}>
          <span style={s.logoIcon}>⚡</span>
          {sideOpen && <span style={s.logoText}>Admin Panel</span>}
        </div>

        {/* Nav */}
        <nav style={s.nav}>
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              style={{
                ...s.navBtn,
                ...(page === item.key ? s.navBtnActive : {}),
              }}
              className="adm-nav-btn"
              title={!sideOpen ? item.label : ""}
            >
              <span style={s.navIcon}>{item.icon}</span>
              {sideOpen && <span style={s.navLabel}>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Toggle */}
        <button onClick={() => setSideOpen(!sideOpen)} style={s.toggleBtn} className="adm-nav-btn">
          {sideOpen ? "◀" : "▶"}
        </button>
      </aside>

      {/* ── MAIN ── */}
      <div style={s.main}>
        {/* Top header */}
        <div style={s.topBar}>
          <div style={s.topLeft}>
            <span style={s.breadcrumb}>
              {navItems.find(n => n.key === page)?.icon}{" "}
              {navItems.find(n => n.key === page)?.label}
            </span>
          </div>
          <div style={s.topRight}>
            <div style={s.adminAvatar}>
              <span>👤</span>
              <span style={{ fontSize: 13, color: "#f1f5f9", fontWeight: 600 }}>Admin</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={s.content}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

const s: Record<string, React.CSSProperties> = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "#f6f8fb",
    color: "#16202a",
    fontFamily: "'DM Sans','Segoe UI',sans-serif",
  },

  /* Sidebar */
  sidebar: {
    background: "#16202a",
    borderRight: "1px solid #263440",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    transition: "width 0.25s ease",
    overflow: "hidden",
    position: "sticky" as const,
    top: 0,
    height: "100vh",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "20px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  logoIcon: { fontSize: 22, flexShrink: 0 },
  logoText: { color: "#f1f5f9", fontWeight: 800, fontSize: 15, whiteSpace: "nowrap" as const },
  nav: { flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column" as const, gap: 2 },
  navBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "transparent",
    border: "none",
    color: "#64748b",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    width: "100%",
    textAlign: "left" as const,
    transition: "all 0.15s ease",
    whiteSpace: "nowrap" as const,
  },
  navBtnActive: {
    background: "linear-gradient(135deg,rgba(99,102,241,0.25),rgba(79,70,229,0.15))",
    color: "#818cf8",
    fontWeight: 700,
  },
  navIcon: { fontSize: 16, flexShrink: 0 },
  navLabel: { flex: 1 },
  toggleBtn: {
    background: "rgba(255,255,255,0.04)",
    border: "none",
    color: "#475569",
    padding: "12px",
    cursor: "pointer",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    fontSize: 14,
    transition: "all 0.15s ease",
    width: "100%",
  },

  /* Main area */
  main: { flex: 1, display: "flex", flexDirection: "column" as const, minWidth: 0 },
  topBar: {
    background: "#ffffff",
    borderBottom: "1px solid #e4e9ef",
    padding: "0 24px",
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky" as const,
    top: 0,
    zIndex: 10,
  },
  topLeft: { display: "flex", alignItems: "center", gap: 12 },
  breadcrumb: { color: "#16202a", fontWeight: 700, fontSize: 15 },
  topRight: { display: "flex", alignItems: "center", gap: 12 },
  adminAvatar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f6f8fb",
    border: "1px solid #e4e9ef",
    borderRadius: 30,
    padding: "6px 14px",
    cursor: "pointer",
  },
  content: { flex: 1, padding: "28px 28px 60px", background: "#f6f8fb" },
};

const css = `
  .adm-nav-btn { color: #aebbc6 !important; }
  .adm-nav-btn:hover { background: rgba(255,255,255,0.1) !important; color: #ffffff !important; }
  .adm-nav-btn[style*="linear-gradient"] { color: #ffffff !important; }
  .adm-nav-btn:hover { background: rgba(255,255,255,0.06) !important; color: #f1f5f9 !important; }
  .adm-tr:hover { background: #f0f6f7 !important; }
  .adm-input:focus { border-color: #168f91 !important; box-shadow: 0 0 0 3px rgba(22,143,145,0.15); }
  .adm-select option { background: #ffffff; color: #16202a; }
`;

export default AdminPage;
