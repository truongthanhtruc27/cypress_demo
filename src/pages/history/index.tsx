import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Types ─── */
interface IHistoryItem {
  id: number;
  mangaId: number;
  title: string;
  image: string;
  lastChapter: string;
  lastChapterId: number;
  time: string;
  progress: number; // percentage
}

const MOCK_HISTORY: IHistoryItem[] = [
  {
    id: 1,
    mangaId: 1,
    title: "Solo Leveling",
    image: "https://cdn.myanimelist.net/images/manga/3/222295l.jpg",
    lastChapter: "Chương 150",
    lastChapterId: 150,
    time: "2 giờ trước",
    progress: 85,
  },
  {
    id: 2,
    mangaId: 2,
    title: "Demon Slayer",
    image: "https://cdn.myanimelist.net/images/manga/3/179023l.jpg",
    lastChapter: "Chương 45",
    lastChapterId: 45,
    time: "Hôm qua",
    progress: 100,
  },
  {
    id: 3,
    mangaId: 4,
    title: "One Piece",
    image: "https://cdn.myanimelist.net/images/manga/2/253146l.jpg",
    lastChapter: "Chương 1090",
    lastChapterId: 1090,
    time: "3 ngày trước",
    progress: 40,
  },
];

const HistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<IHistoryItem[]>(MOCK_HISTORY);

  const removeItem = (id: number) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearAll = () => {
    if (window.confirm("Xóa toàn bộ lịch sử đọc?")) {
      setHistory([]);
    }
  };

  if (history.length === 0) {
    return (
      <div style={s.emptyRoot}>
        <div style={s.emptyIcon}>📖</div>
        <h2 style={s.emptyTitle}>Lịch sử trống</h2>
        <p style={s.emptyDesc}>Bạn chưa đọc bộ truyện nào gần đây.</p>
        <button onClick={() => navigate("/manga-list")} style={s.btnPrimary}>
          Khám phá ngay
        </button>
      </div>
    );
  }

  return (
    <div style={s.root}>
      <style>{css}</style>
      <div style={s.container}>
        
        <div style={s.header}>
          <div>
            <h1 style={s.pageTitle}>🕒 Lịch sử đọc</h1>
            <p style={s.subtitle}>Những bộ truyện bạn đã xem gần đây</p>
          </div>
          <button onClick={clearAll} style={s.btnClear}>Xóa tất cả</button>
        </div>

        <div style={s.grid}>
          {history.map(item => (
            <div key={item.id} style={s.card} className="history-card">
              
              {/* Image with Progress bar */}
              <div style={s.imgWrap}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={s.img} 
                  onClick={() => navigate(`/manga/${item.mangaId}`)}
                />
                <div style={s.progBarTrack}>
                  <div style={{...s.progBarFill, width: `${item.progress}%`}} />
                </div>
                <button onClick={() => removeItem(item.id)} style={s.btnRemove} className="btn-remove">✕</button>
              </div>

              {/* Info */}
              <div style={s.info}>
                <h3 
                  style={s.itemTitle} 
                  onClick={() => navigate(`/manga/${item.mangaId}`)}
                  className="item-title"
                >
                  {item.title}
                </h3>
                <div style={s.chapterLine}>
                  <span style={s.label}>Đã đọc:</span>
                  <span 
                    style={s.chapterName}
                    onClick={() => navigate(`/manga/${item.mangaId}/chapter/${item.lastChapterId}`)}
                  >
                    {item.lastChapter}
                  </span>
                </div>
                <div style={s.timeLine}>
                  <span>🕒 {item.time}</span>
                  <span style={{color: item.progress === 100 ? "#22c55e" : "#64748b"}}>
                    {item.progress === 100 ? "Đã xong" : `${item.progress}%`}
                  </span>
                </div>

                <button 
                  onClick={() => navigate(`/manga/${item.mangaId}/chapter/${item.lastChapterId}`)}
                  style={s.btnContinue}
                  className="btn-continue"
                >
                  Đọc tiếp
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

/* ─── Styles ─── */
const s: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "#090b10",
    color: "#f1f5f9",
    paddingTop: 50,
    paddingBottom: 80,
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: "0 24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 40,
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 900,
    margin: 0,
    letterSpacing: "-0.5px",
  },
  subtitle: {
    color: "#64748b",
    fontSize: 14,
    marginTop: 6,
  },
  btnClear: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#94a3b8",
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },

  /* Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 24,
  },
  card: {
    background: "#121620",
    borderRadius: 20,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
  },
  imgWrap: {
    position: "relative",
    height: 180,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    cursor: "pointer",
    transition: "transform 0.5s ease",
  },
  progBarTrack: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    background: "rgba(0,0,0,0.5)",
  },
  progBarFill: {
    height: "100%",
    background: "#ef4444",
  },
  btnRemove: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.6)",
    border: "none",
    color: "#fff",
    fontSize: 12,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s",
  },

  /* Info */
  info: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 800,
    margin: 0,
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    transition: "color 0.2s",
  },
  chapterLine: {
    fontSize: 14,
    display: "flex",
    gap: 8,
  },
  label: {
    color: "#64748b",
  },
  chapterName: {
    color: "#ef4444",
    fontWeight: 700,
    cursor: "pointer",
  },
  timeLine: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: "#64748b",
  },
  btnContinue: {
    marginTop: "auto",
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.2)",
    color: "#ef4444",
    borderRadius: 12,
    padding: "10px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s",
  },

  /* Empty */
  emptyRoot: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
  },
  emptyIcon: { fontSize: 64, marginBottom: 20, opacity: 0.3 },
  emptyTitle: { color: "#f1f5f9", fontSize: 24, fontWeight: 800, marginBottom: 12 },
  emptyDesc: { fontSize: 16, marginBottom: 32 },
  btnPrimary: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: 30,
    padding: "12px 32px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
};

const css = `
  .history-card:hover { transform: translateY(-8px); border-color: rgba(239,68,68,0.3) !important; box-shadow: 0 15px 40px rgba(0,0,0,0.4); }
  .history-card:hover .img { transform: scale(1.1); }
  .history-card:hover .btn-remove { opacity: 1; }
  .btn-remove:hover { background: #ef4444 !important; }
  .item-title:hover { color: #ef4444; }
  .btn-continue:hover { background: #ef4444 !important; color: #fff !important; }
  .btn-clear:hover { border-color: #ef4444; color: #ef4444; }
`;

export default HistoryPage;
