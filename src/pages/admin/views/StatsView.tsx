import React, { useState } from "react";

const statsData = [
  { id: 139, name: "Hành động", count: 5, views: 150, vMin: 0, vAvg: 30, vMax: 81, likes: 1897, lMin: 0, lAvg: 379.4, lMax: 1246 },
  { id: 140, name: "Kịch", count: 2, views: 1, vMin: 0, vAvg: 0.5, vMax: 1, likes: 658, lMin: 0, lAvg: 329, lMax: 658 },
  { id: 141, name: "Võ thuật", count: 7, views: 1227, vMin: 0, vAvg: 175.3, vMax: 523, likes: 656, lMin: 0, lAvg: 93.7, lMax: 655 },
  { id: 142, name: "Hài hước", count: 5, views: 960, vMin: 0, vAvg: 192.2, vMax: 615, likes: 3, lMin: 0, lAvg: 0.6, lMax: 2 },
  { id: 143, name: "Kịch tính", count: 5, views: 627, vMin: 0, vAvg: 125.4, vMax: 346, likes: 1, lMin: 0, lAvg: 0.2, lMax: 1 },
  { id: 144, name: "Viễn tưởng", count: 8, views: 1338, vMin: 0, vAvg: 167.3, vMax: 746, likes: 687, lMin: 0, lAvg: 85.9, lMax: 683 },
  { id: 145, name: "Trinh Thám", count: 2, views: 0, vMin: 0, vAvg: 0, vMax: 0, likes: 0, lMin: 0, lAvg: 0, lMax: 0 },
  { id: 156, name: "Lãng mạn", count: 4, views: 334, vMin: 0, vAvg: 83.5, vMax: 334, likes: 1, lMin: 0, lAvg: 0.3, lMax: 1 },
];

const COLORS = ["#ef4444","#f59e0b","#8b5cf6","#22c55e","#3b82f6","#ec4899","#14b8a6","#f97316"];

/* ── Simple SVG Pie Chart ── */
const PieChart = () => {
  const total = statsData.reduce((s, d) => s + d.count, 0);
  let angle = -90;
  const slices = statsData.map((d, i) => {
    const pct = d.count / total;
    const startAngle = angle;
    angle += pct * 360;
    const endAngle = angle;
    const r = 120;
    const cx = 160, cy = 160;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const large = pct > 0.5 ? 1 : 0;
    return { ...d, pct, path: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`, color: COLORS[i] };
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" as const }}>
      <svg width="320" height="320" viewBox="0 0 320 320">
        {slices.map((sl, i) => (
          <path key={i} d={sl.path} fill={sl.color} stroke="#111" strokeWidth={2} />
        ))}
      </svg>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
        {slices.map((sl, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: sl.color, flexShrink: 0 }} />
            <span style={{ color: "#94a3b8", fontSize: 13 }}>
              {sl.name} <strong style={{ color: "#f1f5f9" }}>{(sl.pct * 100).toFixed(1)}%</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatsView = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"table" | "chart">("table");
  const filtered = statsData.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h2 style={s.title}>📈 Thống kê truyện theo loại</h2>

      {/* Tabs */}
      <div style={s.tabs}>
        <button onClick={() => setTab("table")} style={{ ...s.tab, ...(tab === "table" ? s.tabActive : {}) }}>📋 Bảng dữ liệu</button>
        <button onClick={() => setTab("chart")} style={{ ...s.tab, ...(tab === "chart" ? s.tabActive : {}) }}>🥧 Biểu đồ tròn</button>
      </div>

      {tab === "chart" ? (
        <div style={{ ...s.tableWrap, padding: 32 }}>
          <h3 style={{ color: "#f1f5f9", margin: "0 0 24px", fontWeight: 700 }}>Thống kê truyện theo loại</h3>
          <PieChart />
        </div>
      ) : (
        <>
          <div style={s.toolbar}>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Nhập tên thể loại..." style={s.input} className="adm-input" />
            <button style={s.btnBlue}>🔍 Tìm kiếm</button>
          </div>
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr style={s.thead}>
                  {["Mã loại","Tên loại","Số lượng","View","View thấp nhất","View trung bình","View cao nhất","Like","Like thấp nhất","Like trung bình","Like cao nhất"].map(h => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(d => (
                  <tr key={d.id} style={s.tr} className="adm-tr">
                    <td style={s.td}>{d.id}</td>
                    <td style={{ ...s.td, color: "#f1f5f9", fontWeight: 600 }}>{d.name}</td>
                    <td style={s.td}>{d.count}</td>
                    <td style={s.td}>{d.views}</td>
                    <td style={s.td}>{d.vMin}</td>
                    <td style={s.td}>{d.vAvg}</td>
                    <td style={s.td}>{d.vMax}</td>
                    <td style={s.td}>{d.likes}</td>
                    <td style={s.td}>{d.lMin}</td>
                    <td style={s.td}>{d.lAvg}</td>
                    <td style={s.td}>{d.lMax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

const s: Record<string, React.CSSProperties> = {
  title: { color: "#f1f5f9", fontSize: 22, fontWeight: 800, margin: "0 0 20px" },
  tabs: { display: "flex", gap: 8, marginBottom: 20 },
  tab: { background: "#1e2435", border: "1px solid rgba(255,255,255,0.08)", color: "#64748b", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" },
  tabActive: { background: "linear-gradient(135deg,#6366f1,#4f46e5)", color: "#fff", border: "1px solid #6366f1" },
  toolbar: { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" as const },
  input: { background: "#1e2435", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "9px 14px", color: "#f1f5f9", fontSize: 13, outline: "none", flex: 1, minWidth: 200 },
  btnBlue: { background: "#3b82f6", border: "none", color: "#fff", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" },
  tableWrap: { background: "#1e2435", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "auto" },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: 12, minWidth: 900 },
  thead: { background: "rgba(99,102,241,0.15)" },
  th: { color: "#94a3b8", fontWeight: 700, padding: "12px 14px", textAlign: "left" as const, borderBottom: "1px solid rgba(255,255,255,0.07)", whiteSpace: "nowrap" as const },
  tr: { borderBottom: "1px solid rgba(255,255,255,0.04)" },
  td: { color: "#94a3b8", padding: "11px 14px", whiteSpace: "nowrap" as const },
};

export default StatsView;
