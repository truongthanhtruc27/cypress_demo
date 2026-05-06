import React, { useState } from "react";
import { useUserInfo } from "../../store/useUserInfo";
import { useNavigate } from "react-router-dom";

type Tab = "general" | "security" | "bookmarks" | "notifications";

const ProfilePage = () => {
  const { user } = useUserInfo();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("general");

  // Fallback if not logged in
  if (!user) {
    return (
      <div style={s.root}>
        <div style={s.emptyState}>
          <p style={{ fontSize: 48 }}>🔒</p>
          <h2 style={{ color: "#fff" }}>Vui lòng đăng nhập</h2>
          <p style={{ color: "#64748b", marginBottom: 24 }}>Bạn cần đăng nhập để xem trang cá nhân.</p>
          <button onClick={() => navigate("/login")} style={s.btnPrimary}>Đăng nhập ngay</button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.coverBlur} />
        <div style={s.headerContent}>
          <div style={s.avatarWrap}>
            <div style={s.avatar}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button style={s.btnEditAvatar}>📷</button>
          </div>
          <div style={s.headerInfo}>
            <h1 style={s.userName}>{user.name}</h1>
            <p style={s.userHandle}>@{user.username || "user"}</p>
            <div style={s.badgeRow}>
              <span style={s.badge}>Thành viên</span>
              <span style={s.joinDate}>Tham gia từ: 01/01/2024</span>
            </div>
          </div>
        </div>
      </div>

      <div style={s.container}>
        <div style={s.layout}>

          {/* ── Sidebar ── */}
          <aside style={s.sidebar}>
            <button onClick={() => setActiveTab("general")}
              style={{ ...s.navBtn, ...(activeTab === "general" ? s.navBtnActive : {}) }}>
              👤 Thông tin chung
            </button>
            <button onClick={() => setActiveTab("security")}
              style={{ ...s.navBtn, ...(activeTab === "security" ? s.navBtnActive : {}) }}>
              🔒 Bảo mật
            </button>
            <button onClick={() => setActiveTab("bookmarks")}
              style={{ ...s.navBtn, ...(activeTab === "bookmarks" ? s.navBtnActive : {}) }}>
              🔖 Truyện đã lưu
            </button>
            <button onClick={() => setActiveTab("notifications")}
              style={{ ...s.navBtn, ...(activeTab === "notifications" ? s.navBtnActive : {}) }}>
              🔔 Thông báo
            </button>
            <div style={s.divider} />
            <button onClick={() => navigate("/")} style={{ ...s.navBtn, color: "#94a3b8" }}>
              🏠 Quay lại trang chủ
            </button>
          </aside>

          {/* ── Main Content ── */}
          <main style={s.main}>
            {activeTab === "general" && <GeneralTab user={user} />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "bookmarks" && <BookmarksTab />}
            {activeTab === "notifications" && <NotificationsTab />}
          </main>

        </div>
      </div>
    </div>
  );
};

/* ─── TABS ─── */

const GeneralTab = ({ user }: { user: any }) => (
  <div style={s.tabContent} className="fade-in">
    <h2 style={s.tabTitle}>Thông tin tài khoản</h2>
    <div style={s.formGrid}>
      <div style={s.inputGroup}>
        <label style={s.label}>Họ và tên</label>
        <input defaultValue={user.name} style={s.input} className="p-input" />
      </div>
      <div style={s.inputGroup}>
        <label style={s.label}>Email</label>
        <input defaultValue={`${user.username}@gmail.com`} style={s.input} className="p-input" />
      </div>
      <div style={s.inputGroup}>
        <label style={s.label}>Số điện thoại</label>
        <input placeholder="Chưa cập nhật" style={s.input} className="p-input" />
      </div>
      <div style={s.inputGroup}>
        <label style={s.label}>Ngày sinh</label>
        <input type="date" style={s.input} className="p-input" />
      </div>
    </div>
    <div style={{ ...s.inputGroup, marginTop: 20 }}>
      <label style={s.label}>Tiểu sử</label>
      <textarea placeholder="Giới thiệu ngắn về bản thân..." style={{ ...s.input, height: 100, resize: "none" }} className="p-input" />
    </div>
    <button style={s.btnSave} className="btn-save">Lưu thay đổi</button>
  </div>
);

const SecurityTab = () => (
  <div style={s.tabContent} className="fade-in">
    <h2 style={s.tabTitle}>Đổi mật khẩu</h2>
    <div style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={s.inputGroup}>
        <label style={s.label}>Mật khẩu hiện tại</label>
        <input type="password" style={s.input} className="p-input" />
      </div>
      <div style={s.inputGroup}>
        <label style={s.label}>Mật khẩu mới</label>
        <input type="password" style={s.input} className="p-input" />
      </div>
      <div style={s.inputGroup}>
        <label style={s.label}>Xác nhận mật khẩu mới</label>
        <input type="password" style={s.input} className="p-input" />
      </div>
      <button style={s.btnSave} className="btn-save">Cập nhật mật khẩu</button>
    </div>
  </div>
);

const BookmarksTab = () => (
  <div style={s.tabContent} className="fade-in">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
      <h2 style={s.tabTitle}>Truyện đã lưu (5)</h2>
      <button style={{ background: "none", border: "none", color: "#64748b", fontSize: 13, cursor: "pointer" }}>Quản lý</button>
    </div>
    <div style={s.bookmarkGrid}>
      {[1, 2, 3].map(i => (
        <div key={i} style={s.bookmarkCard} className="b-card">
          <div style={s.bImg} />
          <div style={{ padding: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Truyện đã lưu {i}</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>Đã xem Chương 20</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const NotificationsTab = () => (
  <div style={s.tabContent} className="fade-in">
    <h2 style={s.tabTitle}>Thông báo</h2>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[1, 2].map(i => (
        <div key={i} style={s.notiItem} className="noti-item">
          <div style={s.notiDot} />
          <div>
            <div style={{ fontSize: 14, color: "#f1f5f9" }}>Truyện <strong>Solo Leveling</strong> vừa cập nhật chương mới!</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>10 phút trước</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Styles ─── */
const s: Record<string, React.CSSProperties> = {
  root: { minHeight: "100vh", background: "#090b10", fontFamily: "'Inter', sans-serif" },
  header: { position: "relative", height: 260, display: "flex", alignItems: "flex-end", padding: "0 40px 40px", overflow: "hidden" },
  coverBlur: { position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(239,68,68,0.3), #090b10)", filter: "blur(60px)", opacity: 0.6 },
  headerContent: { position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 24, maxWidth: 1100, margin: "0 auto", width: "100%" },
  avatarWrap: { position: "relative" },
  avatar: { width: 120, height: 120, borderRadius: 40, background: "linear-gradient(135deg, #ef4444, #b91c1c)", display: "flex", alignItems: "center", fontSize: 48, fontWeight: 900, color: "#fff", boxShadow: "0 20px 40px rgba(239,68,68,0.3)", border: "4px solid #090b10" },
  btnEditAvatar: { position: "absolute", bottom: 0, right: 0, width: 36, height: 36, borderRadius: 12, background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  headerInfo: { display: "flex", flexDirection: "column", gap: 4 },
  userName: { fontSize: 32, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-1px" },
  userHandle: { fontSize: 16, color: "#64748b", fontWeight: 500 },
  badgeRow: { display: "flex", alignItems: "center", gap: 12, marginTop: 8 },
  badge: { background: "rgba(239,68,68,0.15)", color: "#ef4444", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.5px" },
  joinDate: { color: "#475569", fontSize: 12 },

  container: { maxWidth: 1100, margin: "-20px auto 80px", padding: "0 24px" },
  layout: { display: "flex", gap: 32, flexWrap: "wrap" },
  sidebar: { flex: "0 0 240px", display: "flex", flexDirection: "column", gap: 4 },
  navBtn: { background: "transparent", border: "none", color: "#64748b", padding: "12px 16px", borderRadius: 12, textAlign: "left", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" },
  navBtnActive: { background: "rgba(255,255,255,0.05)", color: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
  divider: { height: 1, background: "rgba(255,255,255,0.06)", margin: "12px 0" },

  main: { flex: 1, minWidth: 320 },
  tabContent: { background: "#121620", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: 32, minHeight: 400 },
  tabTitle: { fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 24, margin: 0 },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  inputGroup: { display: "flex", flexDirection: "column", gap: 8 },
  label: { fontSize: 13, fontWeight: 600, color: "#94a3b8" },
  input: { background: "#090b10", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none", transition: "all 0.2s" },
  btnSave: { background: "linear-gradient(135deg, #ef4444, #b91c1c)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 24px", fontSize: 15, fontWeight: 800, cursor: "pointer", marginTop: 24, boxShadow: "0 10px 20px rgba(239,68,68,0.2)" },

  bookmarkGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 },
  bookmarkCard: { background: "#1e2433", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer" },
  bImg: { height: 120, background: "#2a3045" },

  notiItem: { background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 16, display: "flex", gap: 12, alignItems: "center", border: "1px solid rgba(255,255,255,0.04)" },
  notiDot: { width: 8, height: 8, borderRadius: "50%", background: "#ef4444", flexShrink: 0 },

  emptyState: { minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" },
  btnPrimary: { background: "#ef4444", color: "#fff", border: "none", borderRadius: 30, padding: "12px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer" },
};

const css = `
  .navBtnActive { background: rgba(255,255,255,0.05) !important; color: #fff !important; }
  .p-input:focus { border-color: #ef4444 !important; box-shadow: 0 0 0 4px rgba(239,68,68,0.1); }
  .btn-save:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 12px 25px rgba(239,68,68,0.4) !important; }
  .fade-in { animation: fadeIn 0.4s ease-out; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .b-card:hover { transform: translateY(-5px); border-color: #ef4444 !important; }
  .noti-item:hover { background: rgba(255,255,255,0.05); }
`;

export default ProfilePage;
