import React, { useState } from "react";

const initUsers = [
  { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", role: "Admin", joined: "01/01/2024", status: "active" },
  { id: 2, name: "Trần Thị B", email: "b@gmail.com", role: "User", joined: "05/02/2024", status: "active" },
  { id: 3, name: "Lê Văn C", email: "c@gmail.com", role: "User", joined: "10/03/2024", status: "banned" },
  { id: 4, name: "Phạm Thị D", email: "d@gmail.com", role: "User", joined: "22/03/2024", status: "active" },
  { id: 5, name: "Hoàng Văn E", email: "e@gmail.com", role: "Mod", joined: "01/04/2024", status: "active" },
  { id: 6, name: "Đỗ Thị F", email: "f@gmail.com", role: "User", joined: "14/04/2024", status: "banned" },
];

const initComments = [
  { id: 1, user: "Trần Thị B", manga: "Solo Leveling", content: "Truyện hay lắm, đọc không chán!", date: "01/05/2024", status: "visible" },
  { id: 2, user: "Lê Văn C", manga: "One Piece", content: "Chương này hơi chậm...", date: "02/05/2024", status: "visible" },
  { id: 3, user: "Phạm Thị D", manga: "Naruto", content: "Nội dung không phù hợp 18+", date: "03/05/2024", status: "hidden" },
  { id: 4, user: "Hoàng Văn E", manga: "Attack on Titan", content: "Cốt truyện tuyệt vời!", date: "04/05/2024", status: "visible" },
];

const UsersView = () => {
  const [users, setUsers] = useState(initUsers);
  const [search, setSearch] = useState("");
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search));

  const toggleBan = (id: number) =>
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "banned" ? "active" : "banned" } : u));

  const handleDelete = (id: number) => {
    if (window.confirm("Xác nhận xóa người dùng?")) setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <h2 style={s.title}>👤 Quản lý người dùng</h2>
      <div style={s.toolbar}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Tìm tên hoặc email..." style={s.input} className="adm-input" />
        <button style={s.btnBlue}>🔍 Tìm</button>
      </div>
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr style={s.thead}>
              {["ID","Tên","Email","Vai trò","Ngày tham gia","Trạng thái","Hành động"].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={s.tr} className="adm-tr">
                <td style={s.td}>{u.id}</td>
                <td style={{ ...s.td, color: "#f1f5f9", fontWeight: 600 }}>{u.name}</td>
                <td style={s.td}>{u.email}</td>
                <td style={s.td}>
                  <span style={{ ...s.badge, background: u.role === "Admin" ? "#6366f1" : u.role === "Mod" ? "#f59e0b" : "#334155" }}>
                    {u.role}
                  </span>
                </td>
                <td style={s.td}>{u.joined}</td>
                <td style={s.td}>
                  <span style={{ ...s.badge, background: u.status === "active" ? "#22c55e" : "#ef4444" }}>
                    {u.status === "active" ? "Hoạt động" : "Bị cấm"}
                  </span>
                </td>
                <td style={s.td}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => toggleBan(u.id)} style={{ ...s.btnEdit, background: u.status === "active" ? "#f59e0b" : "#22c55e" }}>
                      {u.status === "active" ? "Cấm" : "Mở"}
                    </button>
                    <button onClick={() => handleDelete(u.id)} style={s.btnDel}>Xóa</button>
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

export const CommentsView = () => {
  const [comments, setComments] = useState(initComments);
  const toggleHide = (id: number) =>
    setComments(comments.map(c => c.id === id ? { ...c, status: c.status === "hidden" ? "visible" : "hidden" } : c));
  const handleDelete = (id: number) => {
    if (window.confirm("Xóa bình luận này?")) setComments(comments.filter(c => c.id !== id));
  };

  return (
    <div>
      <h2 style={s.title}>💬 Quản lý bình luận</h2>
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr style={s.thead}>
              {["ID","Người dùng","Truyện","Nội dung","Ngày","Trạng thái","Hành động"].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comments.map(c => (
              <tr key={c.id} style={s.tr} className="adm-tr">
                <td style={s.td}>{c.id}</td>
                <td style={{ ...s.td, color: "#f1f5f9", fontWeight: 600 }}>{c.user}</td>
                <td style={s.td}>{c.manga}</td>
                <td style={{ ...s.td, maxWidth: 220 }}>{c.content}</td>
                <td style={s.td}>{c.date}</td>
                <td style={s.td}>
                  <span style={{ ...s.badge, background: c.status === "visible" ? "#22c55e" : "#ef4444" }}>
                    {c.status === "visible" ? "Hiển thị" : "Ẩn"}
                  </span>
                </td>
                <td style={s.td}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => toggleHide(c.id)} style={s.btnEdit}>
                      {c.status === "visible" ? "Ẩn" : "Hiện"}
                    </button>
                    <button onClick={() => handleDelete(c.id)} style={s.btnDel}>Xóa</button>
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
  toolbar: { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" as const },
  input: { background: "#1e2435", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "9px 14px", color: "#f1f5f9", fontSize: 13, outline: "none", flex: 1, minWidth: 200 },
  btnBlue: { background: "#3b82f6", border: "none", color: "#fff", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" },
  btnEdit: { background: "#f59e0b", border: "none", color: "#fff", borderRadius: 6, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" },
  btnDel: { background: "#ef4444", border: "none", color: "#fff", borderRadius: 6, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" },
  tableWrap: { background: "#1e2435", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "auto" },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: 13 },
  thead: { background: "rgba(34,197,94,0.1)" },
  th: { color: "#94a3b8", fontWeight: 700, padding: "12px 14px", textAlign: "left" as const, borderBottom: "1px solid rgba(255,255,255,0.07)", whiteSpace: "nowrap" as const },
  tr: { borderBottom: "1px solid rgba(255,255,255,0.04)" },
  td: { color: "#94a3b8", padding: "11px 14px" },
  badge: { color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20 },
};

export default UsersView;
