import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import MangaCard from "./MangaCard";
import { genres, sorting, IManga } from "./manga.interface";

/* ── Skeleton ── */
const Skeleton = ({ mode }: { mode: "grid" | "list" }) => {
  if (mode === "list") {
    return (
      <div style={{ display: "flex", gap: 16, background: "#1a1f2e", borderRadius: 12, padding: 14, border: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ width: 80, height: 110, borderRadius: 8, background: "#2a3045" }} className="sk-pulse" />
        <div style={{ flex: 1 }}>
          <div style={{ height: 16, width: "60%", borderRadius: 8, background: "#2a3045", marginBottom: 10 }} className="sk-pulse" />
          <div style={{ height: 12, width: "40%", borderRadius: 8, background: "#2a3045", marginBottom: 8 }} className="sk-pulse" />
          <div style={{ height: 12, width: "80%", borderRadius: 8, background: "#2a3045" }} className="sk-pulse" />
        </div>
      </div>
    );
  }
  return (
    <div style={{ background: "#1a1f2e", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ width: "100%", paddingTop: "145%", background: "#2a3045" }} className="sk-pulse" />
      <div style={{ padding: "12px 12px 14px" }}>
        <div style={{ height: 13, width: "75%", borderRadius: 6, background: "#2a3045", marginBottom: 8 }} className="sk-pulse" />
        <div style={{ height: 11, width: "50%", borderRadius: 6, background: "#2a3045" }} className="sk-pulse" />
      </div>
    </div>
  );
};

/* ── Fake fallback data ── */
const FAKE: IManga[] = [
  { id: 1, title: "Solo Leveling", image: "https://cdn.myanimelist.net/images/manga/3/222295l.jpg", chapter: "Chap 200", rating: 4.9, category: "ACTION", views: 125000, status: "completed", isHot: true, author: "Chugong", description: "Một thợ săn cấp thấp đột nhiên sở hữu sức mạnh vô song.", tags: ["Hành động", "Hệ thống", "Nhân vật mạnh"] },
  { id: 2, title: "Demon Slayer", image: "https://cdn.myanimelist.net/images/manga/3/179023l.jpg", chapter: "Chap 205", rating: 4.8, category: "ACTION", views: 98000, status: "completed", isHot: true, author: "Koyoharu Gotouge", description: "Tanjiro lên đường tiêu diệt quỷ để cứu em gái.", tags: ["Hành động", "Quỷ", "Gia đình"] },
  { id: 3, title: "Attack on Titan", image: "https://cdn.myanimelist.net/images/manga/2/37846l.jpg", chapter: "Chap 139", rating: 4.9, category: "ACTION", views: 210000, status: "completed", author: "Hajime Isayama", description: "Nhân loại chiến đấu sinh tồn chống người khổng lồ.", tags: ["Hành động", "Bi kịch", "Hậu tận thế"] },
  { id: 4, title: "One Piece", image: "https://cdn.myanimelist.net/images/manga/2/253146l.jpg", chapter: "Chap 1100", rating: 4.8, category: "ADVENTURE", views: 500000, status: "ongoing", isHot: true, author: "Oda Eiichiro", description: "Luffy hành trình tìm kho báu One Piece vĩ đại.", tags: ["Phiêu lưu", "Hải tặc", "Hành động"] },
  { id: 5, title: "Naruto", image: "https://cdn.myanimelist.net/images/manga/3/249658l.jpg", chapter: "Chap 700", rating: 4.7, category: "ACTION", views: 380000, status: "completed", author: "Masashi Kishimoto", description: "Ninja trẻ ước mơ trở thành Hokage vĩ đại nhất.", tags: ["Ninja", "Hành động", "Tình bạn"] },
  { id: 6, title: "Overlord", image: "https://cdn.myanimelist.net/images/manga/3/188311l.jpg", chapter: "Chap 70", rating: 4.6, category: "FANTASY", views: 65000, status: "ongoing", isNew: true, author: "Maruyama Kugane", description: "Game thủ mắc kẹt trong thế giới ảo với sức mạnh tối thượng.", tags: ["Isekai", "Ma thuật", "Nhân vật mạnh"] },
  { id: 7, title: "The Beginning After the End", image: "https://cdn.myanimelist.net/images/manga/3/254739l.jpg", chapter: "Chap 170", rating: 4.7, category: "FANTASY", views: 89000, status: "ongoing", isNew: true, isHot: true, author: "TurtleMe", description: "Vị vua hùng mạnh tái sinh vào thế giới phép thuật mới.", tags: ["Isekai", "Phép thuật", "Tái sinh"] },
  { id: 8, title: "Tower of God", image: "https://cdn.myanimelist.net/images/manga/2/164009l.jpg", chapter: "Chap 570", rating: 4.6, category: "FANTASY", views: 110000, status: "ongoing", author: "SIU", description: "Bam leo tháp để tìm người bạn gái Rachel.", tags: ["Tháp", "Phép thuật", "Bí ẩn"] },
  { id: 9, title: "Your Lie in April", image: "https://cdn.myanimelist.net/images/manga/3/80222l.jpg", chapter: "Chap 44", rating: 4.8, category: "ROMANCE", views: 42000, status: "completed", author: "Naoshi Arakawa", description: "Thiên tài piano tìm lại âm nhạc nhờ cô gái violin.", tags: ["Âm nhạc", "Tình cảm", "Bi kịch"] },
  { id: 10, title: "ReZero", image: "https://cdn.myanimelist.net/images/manga/3/188913l.jpg", chapter: "Chap 84", rating: 4.6, category: "FANTASY", views: 76000, status: "ongoing", author: "Nagatsuki Tappei", description: "Subaru bị triệu hồi sang thế giới khác với khả năng Return by Death.", tags: ["Isekai", "Giả tưởng", "Tâm lý"] },
  { id: 11, title: "Sword Art Online", image: "https://cdn.myanimelist.net/images/manga/3/188896l.jpg", chapter: "Chap 48", rating: 4.5, category: "SCIFI", views: 72000, status: "completed", author: "Kawahara Reki", description: "Kirito bị mắc kẹt trong game VRMMORPG nguy hiểm.", tags: ["Game", "Ảo giác", "Hành động"] },
  { id: 12, title: "Vinland Saga", image: "https://cdn.myanimelist.net/images/manga/2/188925l.jpg", chapter: "Chap 195", rating: 4.7, category: "ADVENTURE", views: 55000, status: "ongoing", author: "Makoto Yukimura", description: "Câu chuyện về cuộc đời của chiến binh Viking Thorfinn.", tags: ["Lịch sử", "Hành động", "Triết học"] },
];

/* ══════════ MAIN PAGE ══════════ */
const MangaList = () => {
  const [mangas, setMangas] = useState<IManga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const queryQ = searchParams.get("q") || "";

  const [search, setSearch] = useState(queryQ);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [genreSelected, setGenreSelected] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = viewMode === "grid" ? 12 : 8;
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  /* ── Fetch ── */
  const fetchMangas = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:5000/api/manga");
      if (!res.ok) throw new Error();
      const result = await res.json();
      setMangas(result.data || []);
    } catch {
      setError("Không thể kết nối server. Đang hiển thị dữ liệu mẫu.");
      setMangas(FAKE);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMangas(); }, [fetchMangas]);

  // Sync search state if URL changes
  useEffect(() => {
    if (queryQ) setSearch(queryQ);
  }, [queryQ]);

  /* ── Debounce search ── */
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  useEffect(() => { setPage(1); }, [genreSelected, sortType, viewMode]);

  /* ── Filter & Sort ── */
  let data = [...mangas];
  if (genreSelected) data = data.filter(m => m.category === genreSelected);
  if (debouncedSearch) {
    const q = debouncedSearch.toLowerCase();
    data = data.filter(m =>
      m.title.toLowerCase().includes(q) || (m.author || "").toLowerCase().includes(q)
    );
  }
  if (sortType === "rating-desc") data.sort((a, b) => b.rating - a.rating);
  else if (sortType === "rating-asc") data.sort((a, b) => a.rating - b.rating);
  else if (sortType === "views-desc") data.sort((a, b) => (b.views || 0) - (a.views || 0));
  else if (sortType === "title-asc") data.sort((a, b) => a.title.localeCompare(b.title));
  else data.sort((a, b) => b.id - a.id);

  /* ── Pagination ── */
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const pageData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const pageNums = (): (number | "...")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* ── HEADER ── */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div>
            <h1 style={s.title}>📖 Danh Sách Manga</h1>
            <p style={s.subtitle}>Khám phá hàng nghìn bộ truyện hấp dẫn</p>
          </div>
          <div style={s.searchBox}>
            <span style={s.searchIcon}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm tên truyện, tác giả..."
              style={s.searchInput}
              className="ml-search"
            />
            {search && (
              <button onClick={() => setSearch("")} style={s.clearBtn}>✕</button>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={s.container}>

        {/* ── GENRE TABS (horizontal scroll) ── */}
        <div style={s.genreBar}>
          {genres.map(g => (
            <button
              key={g.id}
              onClick={() => setGenreSelected(g.value)}
              style={{
                ...s.genreBtn,
                ...(genreSelected === g.value ? s.genreBtnActive : {}),
              }}
              className="ml-genre-btn"
            >
              <span>{g.icon}</span>
              <span>{g.name}</span>
              <span style={{
                ...s.genreCount,
                ...(genreSelected === g.value ? s.genreCountActive : {}),
              }}>
                {mangas.filter(m => g.value === "" ? true : m.category === g.value).length}
              </span>
            </button>
          ))}
        </div>

        {/* ── TOOLBAR ── */}
        <div style={s.toolbar}>
          <span style={s.resultText}>
            <span style={s.resultNum}>{data.length}</span> truyện
            {genreSelected && <span style={s.resultCat}> · {genres.find(g => g.value === genreSelected)?.name}</span>}
          </span>

          <div style={s.toolRight}>
            {/* View toggle */}
            <div style={s.viewToggle}>
              <button
                onClick={() => setViewMode("grid")}
                style={{ ...s.viewBtn, ...(viewMode === "grid" ? s.viewBtnActive : {}) }}
                title="Dạng lưới"
              >⊞</button>
              <button
                onClick={() => setViewMode("list")}
                style={{ ...s.viewBtn, ...(viewMode === "list" ? s.viewBtnActive : {}) }}
                title="Dạng danh sách"
              >☰</button>
            </div>

            {/* Sort */}
            <select
              value={sortType}
              onChange={e => setSortType(e.target.value)}
              style={s.sortSelect}
              className="ml-select"
            >
              {sorting.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── ERROR ── */}
        {error && (
          <div style={s.errorBar}>⚠️ {error}</div>
        )}

        {/* ── CONTENT ── */}
        {loading ? (
          <div style={viewMode === "grid" ? s.grid : s.listCol}>
            {Array.from({ length: viewMode === "grid" ? 12 : 6 }).map((_, i) => (
              <Skeleton key={i} mode={viewMode} />
            ))}
          </div>
        ) : pageData.length === 0 ? (
          <div style={s.empty}>
            <p style={{ fontSize: 56 }}>😔</p>
            <h3 style={{ color: "#f1f5f9", margin: "8px 0" }}>Không tìm thấy truyện</h3>
            <p style={{ color: "#64748b", fontSize: 14 }}>Thử thay đổi bộ lọc hoặc tìm từ khóa khác nhé!</p>
            <button
              onClick={() => { setGenreSelected(""); setSearch(""); setSortType("newest"); }}
              style={s.resetBtn}
            >
              🔄 Reset bộ lọc
            </button>
          </div>
        ) : (
          <div style={viewMode === "grid" ? s.grid : s.listCol}>
            {pageData.map(item => (
              <MangaCard key={item.id} item={item} viewMode={viewMode} />
            ))}
          </div>
        )}

        {/* ── PAGINATION ── */}
        {!loading && totalPages > 1 && (
          <div style={s.pagination}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{ ...s.pgBtn, ...(page === 1 ? s.pgDisabled : {}) }}
              className="ml-pgbtn"
            >‹ Trước</button>

            {pageNums().map((p, i) =>
              p === "..." ? (
                <span key={`d${i}`} style={s.pgDots}>…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(Number(p))}
                  style={{ ...s.pgBtn, ...(page === p ? s.pgActive : {}) }}
                  className="ml-pgbtn"
                >{p}</button>
              )
            )}

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{ ...s.pgBtn, ...(page === totalPages ? s.pgDisabled : {}) }}
              className="ml-pgbtn"
            >Sau ›</button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ══════════ STYLES ══════════ */
const s: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(160deg,#090b10 0%,#0f1117 60%,#0d1520 100%)",
    fontFamily: "'Inter','Segoe UI',sans-serif",
  },
  header: {
    background: "linear-gradient(135deg,#0f1117 0%,#1a1f2e 100%)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "26px 0 20px",
  },
  headerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  title: {
    color: "#f1f5f9",
    fontSize: "clamp(20px,3vw,30px)",
    fontWeight: 800,
    margin: 0,
    letterSpacing: "-0.4px",
  },
  subtitle: { color: "#64748b", fontSize: 13, margin: "4px 0 0" },
  searchBox: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "clamp(220px,32vw,380px)",
  },
  searchIcon: { position: "absolute", left: 13, fontSize: 15, pointerEvents: "none" },
  searchInput: {
    width: "100%",
    background: "#1e2435",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 30,
    padding: "9px 38px 9px 40px",
    color: "#f1f5f9",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
  },
  clearBtn: {
    position: "absolute",
    right: 13,
    background: "none",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
    fontSize: 13,
    padding: 0,
  },
  container: { maxWidth: 1200, margin: "0 auto", padding: "24px 24px 60px" },

  /* Genre tabs */
  genreBar: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    paddingBottom: 4,
    marginBottom: 20,
    scrollbarWidth: "none",
  },
  genreBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#1a1f2e",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#94a3b8",
    borderRadius: 30,
    padding: "7px 14px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.18s ease",
    flexShrink: 0,
  },
  genreBtnActive: {
    background: "linear-gradient(135deg,rgba(230,57,70,0.25),rgba(193,18,31,0.15))",
    borderColor: "rgba(230,57,70,0.4)",
    color: "#e63946",
    fontWeight: 700,
  },
  genreCount: {
    background: "rgba(255,255,255,0.07)",
    borderRadius: 10,
    padding: "1px 7px",
    fontSize: 11,
    color: "#475569",
  },
  genreCountActive: { background: "rgba(230,57,70,0.2)", color: "#e63946" },

  /* Toolbar */
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    flexWrap: "wrap",
    gap: 12,
  },
  resultText: { color: "#64748b", fontSize: 13 },
  resultNum: { color: "#e63946", fontWeight: 700, fontSize: 15 },
  resultCat: { color: "#94a3b8" },
  toolRight: { display: "flex", alignItems: "center", gap: 10 },

  /* View toggle */
  viewToggle: {
    display: "flex",
    background: "#1a1f2e",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    overflow: "hidden",
  },
  viewBtn: {
    background: "transparent",
    border: "none",
    color: "#64748b",
    padding: "7px 12px",
    fontSize: 16,
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  viewBtnActive: { background: "#2a3045", color: "#f1f5f9" },

  sortSelect: {
    background: "#1a1f2e",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#f1f5f9",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 13,
    cursor: "pointer",
    outline: "none",
  },

  errorBar: {
    background: "rgba(251,191,36,0.1)",
    border: "1px solid rgba(251,191,36,0.25)",
    color: "#fbbf24",
    borderRadius: 10,
    padding: "10px 16px",
    fontSize: 13,
    marginBottom: 16,
  },

  /* Grids */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(165px,1fr))",
    gap: 16,
  },
  listCol: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  /* Empty */
  empty: {
    textAlign: "center",
    padding: "80px 20px",
  },
  resetBtn: {
    marginTop: 16,
    background: "linear-gradient(135deg,#e63946,#c1121f)",
    color: "#fff",
    border: "none",
    borderRadius: 20,
    padding: "10px 24px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },

  /* Pagination */
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 36,
    flexWrap: "wrap",
  },
  pgBtn: {
    background: "#1a1f2e",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#94a3b8",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    minWidth: 40,
    transition: "all 0.15s ease",
  },
  pgActive: {
    background: "linear-gradient(135deg,#e63946,#c1121f)",
    color: "#fff",
    borderColor: "#e63946",
  },
  pgDisabled: { opacity: 0.35, cursor: "not-allowed" },
  pgDots: { color: "#475569", fontSize: 14, padding: "0 4px" },
};

/* ── Inline CSS ── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  .ml-search:focus { border-color: #e63946 !important; box-shadow: 0 0 0 3px rgba(230,57,70,0.15); }
  .ml-genre-btn:hover { background: rgba(255,255,255,0.06) !important; color: #f1f5f9 !important; }
  .ml-select option { background: #1a1f2e; color: #f1f5f9; }
  .ml-pgbtn:hover:not(:disabled) { background: #2a3045 !important; color: #f1f5f9 !important; }
  .sk-pulse { animation: skPulse 1.5s ease-in-out infinite; }
  @keyframes skPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .genreBar::-webkit-scrollbar { display:none; }
`;

export default MangaList;