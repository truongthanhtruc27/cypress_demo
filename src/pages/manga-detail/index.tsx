import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

/* ─── Types ─── */
interface IMangaDetail {
  id: number;
  title: string;
  image: string;
  chapter: string;
  rating: number;
  category: string;
  author?: string;
  status?: string;
  views?: number;
  description?: string;
}

interface IChapter {
  id: number;
  title: string;
  createdAt?: string;
}

/* ─── Category colors ─── */
const catColors: Record<string, string> = {
  ACTION: "#ef4444",
  ADVENTURE: "#f59e0b",
  FANTASY: "#8b5cf6",
  ROMANCE: "#ec4899",
  COMEDY: "#22c55e",
  HORROR: "#6b7280",
  SCIFI: "#3b82f6",
};

const statusMeta: Record<string, { label: string; color: string }> = {
  ongoing: { label: "Đang ra", color: "#4ade80" },
  completed: { label: "Hoàn thành", color: "#60a5fa" },
  dropped: { label: "Tạm dừng", color: "#fbbf24" },
};

/* ─── Skeleton ─── */
const DetailSkeleton = () => (
  <div style={s.root}>
    <style>{css}</style>
    <div style={s.heroBg} />
    <div style={s.container}>
      <div style={{ display: "flex", gap: 32, paddingTop: 40, flexWrap: "wrap" }}>
        <div style={{ width: 240, height: 360, borderRadius: 16, background: "#2a3045" }} className="sk-pulse" />
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ height: 36, width: "60%", borderRadius: 8, background: "#2a3045", marginBottom: 16 }} className="sk-pulse" />
          <div style={{ height: 14, width: "40%", borderRadius: 6, background: "#2a3045", marginBottom: 12 }} className="sk-pulse" />
          <div style={{ height: 14, width: "80%", borderRadius: 6, background: "#2a3045", marginBottom: 8 }} className="sk-pulse" />
          <div style={{ height: 14, width: "70%", borderRadius: 6, background: "#2a3045" }} className="sk-pulse" />
        </div>
      </div>
    </div>
  </div>
);

/* ══════════ MAIN ══════════ */
const MangaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [manga, setManga] = useState<IMangaDetail | null>(null);
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"chapters" | "info">("chapters");
  const [chapterSearch, setChapterSearch] = useState("");
  const [imgErr, setImgErr] = useState(false);

  /* ── Fetch manga detail ── */
  useEffect(() => {
    const fetch1 = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/manga/${id}`);
        const data = await res.json();
        setManga(data);
      } catch {
        /* fallback */
        setManga({
          id: Number(id),
          title: "Solo Leveling",
          image: "https://cdn.myanimelist.net/images/manga/3/222295l.jpg",
          chapter: "Chap 200",
          rating: 4.9,
          category: "ACTION",
          author: "Chugong",
          status: "completed",
          views: 125000,
          description: "Một thợ săn cấp thấp nhất đột nhiên sở hữu sức mạnh cấp cao nhất sau khi tỉnh dậy trong dungeon nguy hiểm nhất thế giới. Hành trình từ yếu nhất đến mạnh nhất đầy kịch tính và hồi hộp.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetch1();
  }, [id]);

  /* ── Fetch chapters ── */
  useEffect(() => {
    const fetch2 = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/manga/${id}/chapters`);
        const data = await res.json();
        setChapters(data);
      } catch {
        setChapters(
          Array.from({ length: 12 }, (_, i) => ({
            id: i + 1,
            title: `Chương ${i + 1}`,
            createdAt: `2024-0${(i % 9) + 1}-01`,
          }))
        );
      }
    };
    fetch2();
  }, [id]);

  if (loading) return <DetailSkeleton />;
  if (!manga) return <div style={{ color: "#fff", textAlign: "center", padding: 60 }}>Không tìm thấy truyện</div>;

  const catColor = catColors[manga.category] || "#6b7280";
  const st = manga.status ? statusMeta[manga.status] : null;

  const filteredChapters = chapterSearch
    ? chapters.filter(c => c.title.toLowerCase().includes(chapterSearch.toLowerCase()))
    : chapters;

  const formatDate = (d?: string) => {
    if (!d) return "";
    const date = new Date(d);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* ── HERO BLUR BACKGROUND ── */}
      <div style={s.heroBg}>
        <img
          src={imgErr ? "" : manga.image}
          alt=""
          style={s.heroBgImg}
          onError={() => setImgErr(true)}
        />
        <div style={s.heroBgOverlay} />
      </div>

      {/* ── BACK BUTTON ── */}
      <div style={s.backBar}>
        <button onClick={() => navigate(-1)} style={s.backBtn} className="det-back-btn">
          ← Quay lại
        </button>
      </div>

      {/* ── HERO CONTENT ── */}
      <div style={s.container}>
        <div style={s.heroRow}>

          {/* Cover */}
          <div style={s.coverWrap}>
            <img
              src={imgErr ? "https://picsum.photos/300/420" : manga.image}
              alt={manga.title}
              style={s.coverImg}
              onError={() => setImgErr(true)}
              className="det-cover"
            />
            {/* Glow */}
            <div style={{ ...s.coverGlow, background: catColor }} />
          </div>

          {/* Info */}
          <div style={s.infoCol}>

            {/* Category + Status */}
            <div style={s.tagRow}>
              <span style={{ ...s.catTag, background: catColor }}>{manga.category}</span>
              {st && (
                <span style={{ ...s.statusTag, color: st.color, border: `1px solid ${st.color}` }}>
                  {st.label}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 style={s.title}>{manga.title}</h1>

            {/* Author */}
            {manga.author && (
              <p style={s.author}>✍️ Tác giả: <strong style={{ color: "#e2e8f0" }}>{manga.author}</strong></p>
            )}

            {/* Stats row */}
            <div style={s.statsRow}>
              <div style={s.statBox}>
                <span style={s.statVal}>⭐ {manga.rating.toFixed(1)}</span>
                <span style={s.statLabel}>Đánh giá</span>
              </div>
              <div style={s.statDivider} />
              <div style={s.statBox}>
                <span style={s.statVal}>
                  {manga.views !== undefined
                    ? manga.views >= 1000 ? `${(manga.views / 1000).toFixed(0)}K` : manga.views
                    : "—"}
                </span>
                <span style={s.statLabel}>Lượt xem</span>
              </div>
              <div style={s.statDivider} />
              <div style={s.statBox}>
                <span style={s.statVal}>{chapters.length}</span>
                <span style={s.statLabel}>Chương</span>
              </div>
              <div style={s.statDivider} />
              <div style={s.statBox}>
                <span style={s.statVal}>{manga.chapter}</span>
                <span style={s.statLabel}>Mới nhất</span>
              </div>
            </div>

            {/* Description */}
            <p style={s.desc}>
              {manga.description || "Một bộ truyện hấp dẫn với hành trình phát triển sức mạnh, chiến đấu và khám phá thế giới đầy bí ẩn."}
            </p>

            {/* Action buttons */}
            <div style={s.btnRow}>
              <button
                onClick={() => navigate(`/manga/${manga.id}/chapter/1`)}
                style={s.btnPrimary}
                className="det-btn-primary"
              >
                📖 Đọc từ đầu
              </button>
              <button
                onClick={() => navigate(`/manga/${manga.id}/chapter/${chapters[chapters.length - 1]?.id || 1}`)}
                style={s.btnSecondary}
                className="det-btn-secondary"
              >
                ⚡ Chương mới nhất
              </button>
              <button style={s.btnIcon} className="det-btn-icon" title="Yêu thích">
                🔖
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── TABS + CHAPTER LIST ── */}
      <div style={s.bottomSection}>
        <div style={s.container}>

          {/* Tabs */}
          <div style={s.tabBar}>
            <button
              onClick={() => setActiveTab("chapters")}
              style={{ ...s.tab, ...(activeTab === "chapters" ? s.tabActive : {}) }}
              className="det-tab"
            >
              📚 Danh sách chương ({chapters.length})
            </button>
            <button
              onClick={() => setActiveTab("info")}
              style={{ ...s.tab, ...(activeTab === "info" ? s.tabActive : {}) }}
              className="det-tab"
            >
              ℹ️ Thông tin
            </button>
          </div>

          {/* ── CHAPTERS TAB ── */}
          {activeTab === "chapters" && (
            <div style={s.chaptersWrap}>
              {/* Search chapters */}
              <div style={s.chapSearch}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>🔍</span>
                <input
                  value={chapterSearch}
                  onChange={e => setChapterSearch(e.target.value)}
                  placeholder="Tìm chương..."
                  style={s.chapSearchInput}
                  className="det-search"
                />
              </div>

              {/* Chapter grid */}
              <div style={s.chapGrid}>
                {filteredChapters.length === 0 ? (
                  <p style={{ color: "#64748b", gridColumn: "1/-1", textAlign: "center", padding: "20px 0" }}>
                    Không tìm thấy chương nào
                  </p>
                ) : (
                  filteredChapters.map((c, idx) => (
                    <div
                      key={c.id}
                      onClick={() => navigate(`/manga/${id}/chapter/${c.id}`)}
                      style={s.chapItem}
                      className="det-chap"
                    >
                      <div style={s.chapLeft}>
                        <span style={s.chapNum}>{String(idx + 1).padStart(2, "0")}</span>
                        <span style={s.chapTitle}>{c.title}</span>
                      </div>
                      {c.createdAt && (
                        <span style={s.chapDate}>{formatDate(c.createdAt)}</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ── INFO TAB ── */}
          {activeTab === "info" && (
            <div style={s.infoTab}>
              {[
                { label: "Tên truyện", value: manga.title },
                { label: "Tác giả", value: manga.author || "Đang cập nhật" },
                { label: "Thể loại", value: manga.category },
                { label: "Trạng thái", value: st?.label || "Đang cập nhật" },
                { label: "Lượt xem", value: manga.views ? `${manga.views.toLocaleString()}` : "Đang cập nhật" },
                { label: "Đánh giá", value: `⭐ ${manga.rating.toFixed(1)} / 5.0` },
                { label: "Chương mới nhất", value: manga.chapter },
                { label: "Tổng số chương", value: `${chapters.length} chương` },
              ].map(row => (
                <div key={row.label} style={s.infoRow}>
                  <span style={s.infoLabel}>{row.label}</span>
                  <span style={s.infoValue}>{row.value}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

/* ══════════ STYLES ══════════ */
const s: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "#090b10",
    fontFamily: "'Inter','Segoe UI',sans-serif",
    color: "#f1f5f9",
    position: "relative",
  },

  /* Hero blur BG */
  heroBg: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 520,
    overflow: "hidden",
    zIndex: 0,
  },
  heroBgImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "blur(28px) brightness(0.25) saturate(1.4)",
    transform: "scale(1.1)",
  },
  heroBgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(9,11,16,0.3) 0%, rgba(9,11,16,0.7) 60%, #090b10 100%)",
  },

  /* Layout */
  backBar: {
    position: "relative",
    zIndex: 10,
    maxWidth: 1100,
    margin: "0 auto",
    padding: "20px 24px 0",
  },
  backBtn: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#94a3b8",
    borderRadius: 30,
    padding: "8px 18px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  container: {
    position: "relative",
    zIndex: 10,
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px",
  },
  heroRow: {
    display: "flex",
    gap: 36,
    paddingTop: 28,
    paddingBottom: 48,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },

  /* Cover */
  coverWrap: {
    position: "relative",
    flexShrink: 0,
    width: 220,
  },
  coverImg: {
    width: 220,
    height: 320,
    objectFit: "cover",
    borderRadius: 16,
    boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
    display: "block",
    transition: "transform 0.3s ease",
  },
  coverGlow: {
    position: "absolute",
    bottom: -20,
    left: "50%",
    transform: "translateX(-50%)",
    width: "70%",
    height: 40,
    borderRadius: "50%",
    filter: "blur(20px)",
    opacity: 0.5,
    zIndex: -1,
  },

  /* Info */
  infoCol: {
    flex: 1,
    minWidth: 260,
    paddingTop: 8,
  },
  tagRow: {
    display: "flex",
    gap: 8,
    marginBottom: 14,
    flexWrap: "wrap",
  },
  catTag: {
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: 20,
    textTransform: "uppercase",
    letterSpacing: "0.6px",
  },
  statusTag: {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 11px",
    borderRadius: 20,
    background: "transparent",
  },
  title: {
    fontSize: "clamp(24px,4vw,40px)",
    fontWeight: 800,
    margin: "0 0 8px",
    lineHeight: 1.2,
    letterSpacing: "-0.5px",
  },
  author: {
    color: "#64748b",
    fontSize: 14,
    margin: "0 0 20px",
  },

  /* Stats */
  statsRow: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: "14px 20px",
    gap: 0,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  statBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    minWidth: 70,
    gap: 4,
  },
  statVal: {
    color: "#f1f5f9",
    fontWeight: 700,
    fontSize: 16,
  },
  statLabel: {
    color: "#64748b",
    fontSize: 11,
  },
  statDivider: {
    width: 1,
    height: 36,
    background: "rgba(255,255,255,0.08)",
    flexShrink: 0,
  },

  /* Desc */
  desc: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 1.75,
    margin: "0 0 24px",
    maxWidth: 560,
  },

  /* Buttons */
  btnRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "center",
  },
  btnPrimary: {
    background: "linear-gradient(135deg,#e63946,#c1121f)",
    color: "#fff",
    border: "none",
    borderRadius: 30,
    padding: "11px 28px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 20px rgba(230,57,70,0.35)",
  },
  btnSecondary: {
    background: "rgba(255,255,255,0.08)",
    color: "#f1f5f9",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 30,
    padding: "10px 22px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  btnIcon: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "50%",
    width: 44,
    height: 44,
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },

  /* Bottom section */
  bottomSection: {
    position: "relative",
    zIndex: 10,
    background: "#0f1117",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    paddingTop: 0,
    paddingBottom: 60,
  },

  /* Tabs */
  tabBar: {
    display: "flex",
    gap: 0,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    marginBottom: 24,
  },
  tab: {
    background: "none",
    border: "none",
    color: "#64748b",
    fontSize: 14,
    fontWeight: 600,
    padding: "16px 24px",
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  tabActive: {
    color: "#e63946",
    borderBottom: "2px solid #e63946",
  },

  /* Chapters */
  chaptersWrap: { paddingTop: 4 },
  chapSearch: {
    position: "relative",
    marginBottom: 16,
    maxWidth: 320,
  },
  chapSearchInput: {
    width: "100%",
    background: "#1a1f2e",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 30,
    padding: "9px 14px 9px 36px",
    color: "#f1f5f9",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
  },
  chapGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
    gap: 8,
  },
  chapItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#1a1f2e",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 10,
    padding: "12px 16px",
    cursor: "pointer",
    transition: "all 0.18s ease",
    gap: 12,
  },
  chapLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flex: 1,
    minWidth: 0,
  },
  chapNum: {
    color: "#e63946",
    fontWeight: 800,
    fontSize: 13,
    flexShrink: 0,
    fontVariantNumeric: "tabular-nums",
  },
  chapTitle: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: 500,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  chapDate: {
    color: "#475569",
    fontSize: 11,
    flexShrink: 0,
  },

  /* Info tab */
  infoTab: {
    background: "#1a1f2e",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 14,
    overflow: "hidden",
    maxWidth: 560,
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    gap: 16,
  },
  infoLabel: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: 500,
    flexShrink: 0,
  },
  infoValue: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: 600,
    textAlign: "right",
  },
};

/* ── CSS ── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .det-back-btn:hover { background: rgba(255,255,255,0.15) !important; color: #f1f5f9 !important; }
  .det-cover:hover { transform: scale(1.04) !important; }
  .det-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(230,57,70,0.5) !important; }
  .det-btn-secondary:hover { background: rgba(255,255,255,0.14) !important; }
  .det-btn-icon:hover { background: rgba(230,57,70,0.2) !important; border-color: rgba(230,57,70,0.4) !important; }
  .det-tab:hover { color: #f1f5f9 !important; }
  .det-chap:hover { background: rgba(230,57,70,0.1) !important; border-color: rgba(230,57,70,0.3) !important; transform: translateX(3px); }
  .det-search:focus { border-color: #e63946 !important; box-shadow: 0 0 0 3px rgba(230,57,70,0.15); }

  .sk-pulse { animation: skPulse 1.5s ease-in-out infinite; }
  @keyframes skPulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
`;

export default MangaDetail;