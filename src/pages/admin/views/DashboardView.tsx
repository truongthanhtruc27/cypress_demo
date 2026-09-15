import React from "react";

const cards = [
  { label: "Tổng truyện", value: "268", icon: "📚", color: "#6366f1", sub: "+12 tháng này" },
  { label: "Người dùng", value: "1,245", icon: "👤", color: "#22c55e", sub: "+38 tháng này" },
  { label: "Bình luận", value: "4,820", icon: "💬", color: "#f59e0b", sub: "+210 tháng này" },
  { label: "Lượt xem", value: "98.4K", icon: "👁", color: "#e63946", sub: "+5.2K tuần này" },
];

const recentMangas = [
  { id: 268, title: "Vân Tường Chí Vương", genre: "Viễn tưởng", views: 4, status: "Thường" },
  { id: 267, title: "Bậc Thầy Thuần Hóa", genre: "Kịch tính", views: 1, status: "Thường" },
  { id: 266, title: "Hệ Thống Gánh Con Mạnh Nhất", genre: "Võ thuật", views: 7, status: "Hot" },
  { id: 265, title: "Đại Chu Tiên Lại", genre: "Viễn tưởng", views: 4, status: "Thường" },
  { id: 264, title: "Đại Đường Sóng Thần", genre: "Hành động", views: 2, status: "Thường" },
];

const DashboardView = () => (
  <div>
    <h2 style={s.pageTitle}>📊 Tổng quan</h2>

    {/* Stats cards */}
    <div style={s.cardGrid}>
      {cards.map(c => (
        <div key={c.label} style={s.card}>
          <div style={{ ...s.cardIcon, background: c.color + "22", color: c.color }}>
            {c.icon}
          </div>
          <div>
            <div style={s.cardVal}>{c.value}</div>
            <div style={s.cardLabel}>{c.label}</div>
            <div style={s.cardSub}>{c.sub}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Recent table */}
    <div style={s.section}>
      <h3 style={s.sectionTitle}>📋 Truyện mới đăng gần đây</h3>
      <table style={s.table}>
        <thead>
          <tr>
            {["Mã", "Tên truyện", "Thể loại", "Lượt xem", "Trạng thái"].map(h => (
              <th key={h} style={s.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recentMangas.map(m => (
            <tr key={m.id} style={s.tr} className="adm-tr">
              <td style={s.td}>{m.id}</td>
              <td style={{ ...s.td, fontWeight: 700, color: "#16202a" }}>{m.title}</td>
              <td style={s.td}>{m.genre}</td>
              <td style={s.td}>{m.views}</td>
              <td style={s.td}>
                <span style={{ ...s.badge, background: m.status === "Hot" ? "#ef4444" : "#2a3045" }}>
                  {m.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const s: Record<string, React.CSSProperties> = {
  pageTitle: { color: "#16202a", fontSize: 22, fontWeight: 800, margin: "0 0 24px", letterSpacing: "-0.3px" },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16, marginBottom: 32 },
  card: { background: "#ffffff", border: "1px solid #e4e9ef", borderRadius: 14, padding: "20px 20px", display: "flex", alignItems: "center", gap: 16 },
  cardIcon: { width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 },
  cardVal: { color: "#16202a", fontSize: 24, fontWeight: 800, lineHeight: 1 },
  cardLabel: { color: "#52616d", fontSize: 12, marginTop: 4 },
  cardSub: { color: "#22c55e", fontSize: 11, marginTop: 4 },
  section: { background: "#ffffff", border: "1px solid #e4e9ef", borderRadius: 14, padding: 20, overflow: "auto" },
  sectionTitle: { color: "#16202a", fontSize: 15, fontWeight: 700, margin: "0 0 16px" },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: 13 },
  th: { color: "#64748b", fontWeight: 600, padding: "10px 14px", textAlign: "left" as const, borderBottom: "1px solid rgba(255,255,255,0.06)", whiteSpace: "nowrap" as const },
  tr: { borderBottom: "1px solid rgba(255,255,255,0.04)" },
  td: { color: "#52616d", padding: "11px 14px", whiteSpace: "nowrap" as const },
  badge: { color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20 },
};

export default DashboardView;
