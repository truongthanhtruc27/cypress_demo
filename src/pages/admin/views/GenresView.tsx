import React, { useState } from "react";

const initGenres = [
  { id: 156, name: "Lãng mạn", count: 4 },
  { id: 145, name: "Trinh Thám", count: 2 },
  { id: 144, name: "Viễn tưởng", count: 8 },
  { id: 143, name: "Kịch tính", count: 5 },
  { id: 142, name: "Hài hước", count: 5 },
  { id: 141, name: "Võ thuật", count: 7 },
  { id: 139, name: "Hành động", count: 5 },
  { id: 138, name: "Phiêu lưu", count: 3 },
];

const GenresView = () => {
  const [genres, setGenres] = useState(initGenres);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const filtered = genres.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    if (!newName.trim()) return;
    const id = Math.max(...genres.map(g => g.id)) + 1;
    setGenres([{ id, name: newName.trim(), count: 0 }, ...genres]);
    setNewName(""); setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Xác nhận xóa thể loại này?"))
      setGenres(genres.filter(g => g.id !== id));
  };

  const handleSave = () => {
    setGenres(genres.map(g => g.id === editId ? { ...g, name: editName } : g));
    setEditId(null);
  };

  return (
    <div>
      <h2 style={s.title}>📂 Danh sách thể loại</h2>

      {/* Search + Add */}
      <div style={s.toolbar}>
        <div style={s.searchWrap}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Nhập tên thể loại muốn tìm kiếm..."
            style={s.input} className="adm-input"
          />
          <button style={s.btnBlue}>🔍 Tìm kiếm</button>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={s.btnGreen}>+ Thêm</button>
      </div>

      {/* Add form */}
      {showForm && (
        <div style={s.addForm}>
          <input
            value={newName} onChange={e => setNewName(e.target.value)}
            placeholder="Tên thể loại mới..."
            style={s.input} className="adm-input"
            onKeyDown={e => e.key === "Enter" && handleAdd()}
          />
          <button onClick={handleAdd} style={s.btnGreen}>✓ Lưu</button>
          <button onClick={() => setShowForm(false)} style={s.btnGray}>✕ Hủy</button>
        </div>
      )}

      {/* Table */}
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr style={s.thead}>
              <th style={s.th}>Mã truyện</th>
              <th style={s.th}>Tên loại truyện</th>
              <th style={s.th}>Số truyện</th>
              <th style={s.th}>Thay đổi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(g => (
              <tr key={g.id} style={s.tr} className="adm-tr">
                <td style={s.td}>{g.id}</td>
                <td style={s.td}>
                  {editId === g.id ? (
                    <input
                      value={editName} onChange={e => setEditName(e.target.value)}
                      style={{ ...s.input, padding: "4px 10px", fontSize: 13 }}
                      className="adm-input"
                    />
                  ) : (
                    <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{g.name}</span>
                  )}
                </td>
                <td style={s.td}>{g.count}</td>
                <td style={s.td}>
                  {editId === g.id ? (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={handleSave} style={s.btnGreen}>✓</button>
                      <button onClick={() => setEditId(null)} style={s.btnGray}>✕</button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => { setEditId(g.id); setEditName(g.name); }} style={s.btnEdit}>Sửa</button>
                      <button onClick={() => handleDelete(g.id)} style={s.btnDel}>Xóa</button>
                    </div>
                  )}
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
  toolbar: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" as const, alignItems: "center" },
  searchWrap: { display: "flex", gap: 8, flex: 1, minWidth: 200 },
  addForm: { display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" as const },
  input: { background: "#1e2435", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "9px 14px", color: "#f1f5f9", fontSize: 13, outline: "none", flex: 1, minWidth: 160 },
  btnBlue: { background: "#3b82f6", border: "none", color: "#fff", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" as const },
  btnGreen: { background: "#22c55e", border: "none", color: "#fff", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" as const },
  btnGray: { background: "#475569", border: "none", color: "#fff", borderRadius: 8, padding: "9px 14px", fontSize: 13, cursor: "pointer" },
  btnEdit: { background: "#f59e0b", border: "none", color: "#fff", borderRadius: 6, padding: "5px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" },
  btnDel: { background: "#ef4444", border: "none", color: "#fff", borderRadius: 6, padding: "5px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" },
  tableWrap: { background: "#1e2435", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "auto" },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: 13 },
  thead: { background: "rgba(99,102,241,0.15)" },
  th: { color: "#94a3b8", fontWeight: 700, padding: "13px 18px", textAlign: "left" as const, borderBottom: "1px solid rgba(255,255,255,0.07)" },
  tr: { borderBottom: "1px solid rgba(255,255,255,0.04)" },
  td: { color: "#94a3b8", padding: "12px 18px" },
};

export default GenresView;
