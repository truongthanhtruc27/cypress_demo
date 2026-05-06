import React, { useState } from "react";

const initMangas = [
  { id: 268, title: "Vân Tường Chí Vương", author: "a", desc: "Truyện hay", date: "12/02/2023 12:03:35 am", views: 4, likes: 0, genre: "Viễn tưởng", type: "Thường", price: 0, image: "https://picsum.photos/40/56?1" },
  { id: 267, title: "Bậc Thầy Thuần Hóa", author: "Ganika", desc: "Truyện hay", date: "12/02/2023 04:48:39 pm", views: 1, likes: 0, genre: "Kịch tính", type: "Thường", price: 0, image: "https://picsum.photos/40/56?2" },
  { id: 266, title: "Hệ Thống Gánh Con Mạnh Nhất", author: "Jakani", desc: "Truyện hot", date: "12/02/2023 04:45:47 pm", views: 7, likes: 0, genre: "Võ thuật", type: "Thường", price: 0, image: "https://picsum.photos/40/56?3" },
  { id: 265, title: "Đại Chu Tiên Lại", author: "LiMaCha", desc: "Truyện viễn tưởng hay", date: "12/02/2023 04:43:42 pm", views: 4, likes: 2, genre: "Viễn tưởng", type: "Thường", price: 0, image: "https://picsum.photos/40/56?4" },
  { id: 264, title: "Đại Đường Sóng Thần", author: "Namco", desc: "Truyện hot", date: "12/02/2023 04:41:25 pm", views: 2, likes: 0, genre: "Hành động", type: "Hot", price: 0, image: "https://picsum.photos/40/56?5" },
  { id: 263, title: "Siêu Phàm Truyền Thuyết", author: "TKing", desc: "Hay", date: "12/02/2023 04:39:10 pm", views: 9, likes: 1, genre: "Fantasy", type: "Thường", price: 0, image: "https://picsum.photos/40/56?6" },
];

const genres = ["Tất cả", "Hành động", "Viễn tưởng", "Kịch tính", "Võ thuật", "Fantasy", "Hài hước"];

const MangasView = () => {
  const [mangas, setMangas] = useState(initMangas);
  const [search, setSearch] = useState("");
  const [filterGenre, setFilterGenre] = useState("Tất cả");

  const filtered = mangas
    .filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    .filter(m => filterGenre === "Tất cả" || m.genre === filterGenre);

  const handleDelete = (id: number) => {
    if (window.confirm("Xác nhận xóa truyện này?"))
      setMangas(mangas.filter(m => m.id !== id));
  };

  return (
    <div>
      <h2 style={s.title}>📚 Danh sách truyện</h2>

      {/* Toolbar */}
      <div style={s.toolbar}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Nhập tên truyện muốn tìm kiếm..."
          style={s.input} className="adm-input"
        />
        <select value={filterGenre} onChange={e => setFilterGenre(e.target.value)} style={s.select} className="adm-select">
          {genres.map(g => <option key={g}>{g}</option>)}
        </select>
        <button style={s.btnBlue}>🔍 Tìm kiếm</button>
        <button style={s.btnGreen}>+ Thêm</button>
      </div>

      {/* Table */}
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr style={s.thead}>
              {["Mã", "Tên truyện", "Tác giả", "Giới thiệu", "Ngày giờ", "View", "Like", "Loại", "Truyện", "Ảnh", "Chức năng"].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id} style={s.tr} className="adm-tr">
                <td style={s.td}>{m.id}</td>
                <td style={{ ...s.td, color: "#f1f5f9", fontWeight: 600, maxWidth: 150 }}>{m.title}</td>
                <td style={s.td}>{m.author}</td>
                <td style={{ ...s.td, maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis" }}>{m.desc}</td>
                <td style={{ ...s.td, whiteSpace: "nowrap" as const, fontSize: 11 }}>{m.date}</td>
                <td style={s.td}>{m.views}</td>
                <td style={s.td}>{m.likes}</td>
                <td style={s.td}>
                  <span style={{ ...s.badge, background: m.genre === "Fantasy" ? "#8b5cf6" : "#2a3045" }}>{m.genre}</span>
                </td>
                <td style={s.td}>
                  <span style={{ ...s.badge, background: m.type === "Hot" ? "#ef4444" : "#334155" }}>{m.type}</span>
                </td>
                <td style={s.td}>
                  <img src={m.image} alt="" style={{ width: 36, height: 50, objectFit: "cover", borderRadius: 4 }} />
                </td>
                <td style={s.td}>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 4 }}>
                    <button style={s.btnEdit}>Sửa</button>
                    <button onClick={() => handleDelete(m.id)} style={s.btnDel}>Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const s: Record<string, React.CSSProperties> = {
  title: { color: "#f1f5f9", fontSize: 22, fontWeight: 800, margin: "0 0 24px" },
  toolbar: { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" as const, alignItems: "center" },
  input: { background: "#1e2435", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "9px 14px", color: "#f1f5f9", fontSize: 13, outline: "none", flex: 1, minWidth: 180 },
  select: { background: "#1e2435", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "9px 12px", color: "#f1f5f9", fontSize: 13, outline: "none", cursor: "pointer" },
  btnBlue: { background: "#3b82f6", border: "none", color: "#fff", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" },
  btnGreen: { background: "#22c55e", border: "none", color: "#fff", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" },
  btnEdit: { background: "#f59e0b", border: "none", color: "#fff", borderRadius: 6, padding: "4px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" },
  btnDel: { background: "#ef4444", border: "none", color: "#fff", borderRadius: 6, padding: "4px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" },
  tableWrap: { background: "#1e2435", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "auto" },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: 12, minWidth: 900 },
  thead: { background: "rgba(59,130,246,0.15)" },
  th: { color: "#94a3b8", fontWeight: 700, padding: "12px 12px", textAlign: "left" as const, borderBottom: "1px solid rgba(255,255,255,0.07)", whiteSpace: "nowrap" as const },
  tr: { borderBottom: "1px solid rgba(255,255,255,0.04)" },
  td: { color: "#94a3b8", padding: "10px 12px" },
  badge: { color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 },
};

export default MangasView;
