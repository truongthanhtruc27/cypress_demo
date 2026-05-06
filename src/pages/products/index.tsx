import React, { useEffect, useState, useCallback, useRef } from "react";
import ProductCard from "./productCard";
import {
  categories,
  sorting,
  IProduct,
} from "./products.interface";

/* ─── Skeleton Loader ─── */
const SkeletonCard = () => (
  <div style={sk.card}>
    <div style={sk.img} className="skeleton-pulse" />
    <div style={{ padding: "12px 14px 14px" }}>
      <div style={{ ...sk.line, width: "80%" }} className="skeleton-pulse" />
      <div style={{ ...sk.line, width: "50%", marginTop: 8 }} className="skeleton-pulse" />
      <div style={{ ...sk.line, width: "40%", marginTop: 8 }} className="skeleton-pulse" />
    </div>
  </div>
);

const sk: Record<string, React.CSSProperties> = {
  card: {
    background: "#1e2435",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.07)",
  },
  img: {
    width: "100%",
    paddingTop: "140%",
    background: "#2a3045",
  },
  line: {
    height: 12,
    borderRadius: 6,
    background: "#2a3045",
  },
};

/* ─── Stats Bar ─── */
const StatsBar = ({ total, category }: { total: number; category: string }) => (
  <div style={s.statsBar}>
    <span style={s.statsText}>
      {category ? `Thể loại: ${category}` : "Tất cả truyện"}
    </span>
    <span style={s.statsCount}>{total} truyện</span>
  </div>
);

/* ─── Main Page ─── */
const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pageSize = 12;
  const searchTimer = useRef<any>(null);

  /* ── Fetch ── */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://localhost:5000/api/manga");
      if (!res.ok) throw new Error("Server error");
      const result = await res.json();
      setProducts(result.data || []);
    } catch {
      setError("Không thể tải dữ liệu. Đang dùng dữ liệu mẫu.");
      /* fallback fake data */
      setProducts([
        { id: 1, title: "Solo Leveling", image: "https://cdn.myanimelist.net/images/manga/3/222295l.jpg", chapter: "Chap 200", rating: 4.9, category: "ACTION", views: 125000, status: "completed", isHot: true, author: "Chugong", description: "Một thợ săn cấp thấp nhất đột nhiên sở hữu sức mạnh cấp cao nhất." },
        { id: 2, title: "Demon Slayer", image: "https://cdn.myanimelist.net/images/manga/3/179023l.jpg", chapter: "Chap 205", rating: 4.8, category: "ACTION", views: 98000, status: "completed", isHot: true, author: "Koyoharu", description: "Cậu bé Tanjiro lên đường giết quỷ để cứu em gái." },
        { id: 3, title: "Attack on Titan", image: "https://cdn.myanimelist.net/images/manga/2/37846l.jpg", chapter: "Chap 139", rating: 4.9, category: "ACTION", views: 210000, status: "completed", author: "Hajime Isayama", description: "Nhân loại chiến đấu sinh tồn chống lại những người khổng lồ." },
        { id: 4, title: "One Piece", image: "https://cdn.myanimelist.net/images/manga/2/253146l.jpg", chapter: "Chap 1100", rating: 4.8, category: "ADVENTURE", views: 500000, status: "ongoing", isHot: true, author: "Oda Eiichiro", description: "Monkey D. Luffy hành trình tìm kho báu One Piece." },
        { id: 5, title: "Naruto", image: "https://cdn.myanimelist.net/images/manga/3/249658l.jpg", chapter: "Chap 700", rating: 4.7, category: "ACTION", views: 380000, status: "completed", author: "Masashi Kishimoto", description: "Cậu bé ninja ước mơ trở thành Hokage vĩ đại nhất." },
        { id: 6, title: "Sword Art Online", image: "https://cdn.myanimelist.net/images/manga/3/188896l.jpg", chapter: "Chap 48", rating: 4.5, category: "FANTASY", views: 72000, status: "completed", author: "Kawahara Reki", description: "Kirito bị mắc kẹt trong game VRMMORPG nguy hiểm." },
        { id: 7, title: "Overlord", image: "https://cdn.myanimelist.net/images/manga/3/188311l.jpg", chapter: "Chap 70", rating: 4.6, category: "FANTASY", views: 65000, status: "ongoing", isNew: true, author: "Maruyama Kugane", description: "Game thủ bị mắc kẹt trong thế giới ảo với sức mạnh tối thượng." },
        { id: 8, title: "The Beginning After the End", image: "https://cdn.myanimelist.net/images/manga/3/254739l.jpg", chapter: "Chap 170", rating: 4.7, category: "FANTASY", views: 89000, status: "ongoing", isNew: true, isHot: true, author: "TurtleMe", description: "Vị vua hùng mạnh tái sinh vào thế giới phép thuật." },
        { id: 9, title: "Tower of God", image: "https://cdn.myanimelist.net/images/manga/2/164009l.jpg", chapter: "Chap 570", rating: 4.6, category: "FANTASY", views: 110000, status: "ongoing", author: "SIU", description: "Bam leo tháp để tìm người bạn gái Rachel." },
        { id: 10, title: "Mushoku Tensei", image: "https://cdn.myanimelist.net/images/manga/3/167516l.jpg", chapter: "Chap 90", rating: 4.5, category: "FANTASY", views: 53000, status: "completed", author: "Rifujin na Magonote", description: "Người đàn ông 34 tuổi được tái sinh vào thế giới khác." },
        { id: 11, title: "ReZero", image: "https://cdn.myanimelist.net/images/manga/3/188913l.jpg", chapter: "Chap 84", rating: 4.6, category: "FANTASY", views: 76000, status: "ongoing", author: "Nagatsuki Tappei", description: "Subaru bị triệu hồi sang thế giới khác với khả năng Return by Death." },
        { id: 12, title: "Your Lie in April", image: "https://cdn.myanimelist.net/images/manga/3/80222l.jpg", chapter: "Chap 44", rating: 4.8, category: "ROMANCE", views: 42000, status: "completed", author: "Naoshi Arakawa", description: "Thiên tài piano gặp lại âm nhạc nhờ cô gái violin." },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  /* ── Debounce search ── */
  useEffect(() => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(searchTimer.current);
  }, [search]);

  /* ── Reset page on filter/sort change ── */
  useEffect(() => { setPage(1); }, [category, sort]);

  /* ── Filter + Sort ── */
  let data = [...products];
  if (category) data = data.filter(p => p.category === category);
  if (debouncedSearch) {
    const q = debouncedSearch.toLowerCase();
    data = data.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        (p.author && p.author.toLowerCase().includes(q))
    );
  }
  if (sort === "rating-desc") data.sort((a, b) => b.rating - a.rating);
  else if (sort === "rating-asc") data.sort((a, b) => a.rating - b.rating);
  else if (sort === "newest") data.sort((a, b) => b.id - a.id);
  else if (sort === "views-desc") data.sort((a, b) => (b.views || 0) - (a.views || 0));
  else if (sort === "title-asc") data.sort((a, b) => a.title.localeCompare(b.title));

  /* ── Pagination ── */
  const totalPages = Math.ceil(data.length / pageSize);
  const current = data.slice((page - 1) * pageSize, page * pageSize);

  const pageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div style={s.root}>
      <style>{inlineCSS}</style>

      {/* ──── PAGE HEADER ──── */}
      <div style={s.pageHeader}>
        <div style={s.headerContent}>
          <div>
            <h1 style={s.pageTitle}>
              <span style={s.titleAccent}>📚</span> Danh Sách Truyện
            </h1>
            <p style={s.pageSubtitle}>Khám phá kho truyện tranh phong phú</p>
          </div>

          {/* Search */}
          <div style={s.searchWrapper}>
            <span style={s.searchIcon}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm tên truyện, tác giả..."
              style={s.searchInput}
              className="search-input"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={s.clearBtn}
              >✕</button>
            )}
          </div>
        </div>
      </div>

      {/* ──── MAIN LAYOUT ──── */}
      <div style={s.container}>
        <div style={s.layout}>

          {/* ──── SIDEBAR ──── */}
          <aside style={{ ...s.sidebar, width: sidebarOpen ? 220 : 0, overflow: sidebarOpen ? "visible" : "hidden", opacity: sidebarOpen ? 1 : 0 }}>
            <div style={s.sidebarInner}>
              {/* Category filter */}
              <div style={s.sideSection}>
                <h3 style={s.sideTitle}>📂 Thể loại</h3>
                <div style={s.catList}>
                  {categories.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setCategory(c.value)}
                      style={{
                        ...s.catBtn,
                        ...(category === c.value ? s.catBtnActive : {}),
                      }}
                      className="cat-btn"
                    >
                      <span>{c.icon}</span>
                      <span>{c.name}</span>
                      <span style={s.catCount}>
                        {products.filter(p => c.value === "" ? true : p.category === c.value).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status filter */}
              <div style={s.sideSection}>
                <h3 style={s.sideTitle}>📊 Trạng thái</h3>
                <div style={s.catList}>
                  {[
                    { label: "Tất cả", value: "" },
                    { label: "🟢 Đang ra", value: "ongoing" },
                    { label: "🔵 Hoàn thành", value: "completed" },
                    { label: "🟡 Tạm dừng", value: "dropped" },
                  ].map(st => (
                    <button key={st.value} style={s.catBtn} className="cat-btn">
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div style={s.quickStats}>
                <div style={s.statItem}>
                  <span style={s.statNum}>{products.length}</span>
                  <span style={s.statLabel}>Tổng truyện</span>
                </div>
                <div style={s.statItem}>
                  <span style={s.statNum}>{products.filter(p => p.isHot).length}</span>
                  <span style={s.statLabel}>🔥 Hot</span>
                </div>
                <div style={s.statItem}>
                  <span style={s.statNum}>{products.filter(p => p.isNew).length}</span>
                  <span style={s.statLabel}>✨ Mới</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ──── CONTENT ──── */}
          <main style={s.main}>

            {/* Toolbar */}
            <div style={s.toolbar}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={s.menuBtn}
                className="icon-btn"
                title="Ẩn/hiện sidebar"
              >
                {sidebarOpen ? "◀ Ẩn" : "▶ Mở"}
              </button>

              <StatsBar total={data.length} category={categories.find(c => c.value === category)?.name || ""} />

              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={s.sortSelect}
                className="sort-select"
              >
                {sorting.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Error banner */}
            {error && (
              <div style={s.errorBanner}>
                ⚠️ {error}
              </div>
            )}

            {/* Grid */}
            {loading ? (
              <div style={s.grid}>
                {Array.from({ length: pageSize }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : current.length === 0 ? (
              <div style={s.empty}>
                <p style={{ fontSize: 64, margin: 0 }}>😔</p>
                <h3 style={{ color: "#f1f5f9", margin: "12px 0 8px" }}>Không tìm thấy truyện</h3>
                <p style={{ color: "#64748b" }}>Thử thay đổi bộ lọc hoặc tìm kiếm khác nhé!</p>
                <button
                  onClick={() => { setCategory(""); setSearch(""); setSort("newest"); }}
                  style={s.resetBtn}
                >
                  🔄 Reset bộ lọc
                </button>
              </div>
            ) : (
              <div style={s.grid}>
                {current.map(item => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {/* ─ Pagination ─ */}
            {!loading && totalPages > 1 && (
              <div style={s.paginationWrap}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{ ...s.pageBtn, ...(page === 1 ? s.pageBtnDisabled : {}) }}
                  className="page-btn"
                >
                  ‹ Trước
                </button>

                {pageNumbers().map((p, i) =>
                  p === "..." ? (
                    <span key={`dot-${i}`} style={s.pageDots}>…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(Number(p))}
                      style={{
                        ...s.pageBtn,
                        ...(page === p ? s.pageBtnActive : {}),
                      }}
                      className="page-btn"
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{ ...s.pageBtn, ...(page === totalPages ? s.pageBtnDisabled : {}) }}
                  className="page-btn"
                >
                  Sau ›
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

/* ─── Styles ─── */
const s: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0c12 0%, #0f1117 50%, #0d1520 100%)",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  pageHeader: {
    background: "linear-gradient(135deg, #0f1117 0%, #1a1f2e 100%)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "28px 0 22px",
  },
  headerContent: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 20,
  },
  pageTitle: {
    color: "#f1f5f9",
    fontSize: "clamp(22px, 3vw, 32px)",
    fontWeight: 800,
    margin: 0,
    letterSpacing: "-0.5px",
  },
  titleAccent: {
    marginRight: 8,
  },
  pageSubtitle: {
    color: "#64748b",
    fontSize: 14,
    margin: "4px 0 0",
  },
  searchWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "clamp(240px, 35vw, 400px)",
  },
  searchIcon: {
    position: "absolute",
    left: 14,
    fontSize: 16,
    pointerEvents: "none",
    zIndex: 1,
  },
  searchInput: {
    width: "100%",
    background: "#1e2435",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "30px",
    padding: "10px 40px 10px 44px",
    color: "#f1f5f9",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease",
  },
  clearBtn: {
    position: "absolute",
    right: 14,
    background: "none",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
    fontSize: 14,
    padding: 0,
  },
  container: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "28px 24px 60px",
  },
  layout: {
    display: "flex",
    gap: 24,
    alignItems: "flex-start",
  },
  sidebar: {
    flexShrink: 0,
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
  sidebarInner: {
    width: 220,
    background: "#1e2435",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.07)",
    overflow: "hidden",
    position: "sticky",
    top: 16,
  },
  sideSection: {
    padding: "16px 16px 8px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  sideTitle: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: "0 0 10px",
  },
  catList: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  catBtn: {
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    padding: "8px 10px",
    borderRadius: 8,
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    transition: "all 0.15s ease",
    width: "100%",
  },
  catBtnActive: {
    background: "linear-gradient(135deg, rgba(230,57,70,0.2), rgba(193,18,31,0.1))",
    color: "#e63946",
    fontWeight: 700,
  },
  catCount: {
    marginLeft: "auto",
    background: "rgba(255,255,255,0.07)",
    borderRadius: 10,
    padding: "1px 7px",
    fontSize: 11,
    color: "#64748b",
  },
  quickStats: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 8,
    padding: 16,
  },
  statItem: {
    background: "rgba(255,255,255,0.04)",
    borderRadius: 8,
    padding: "8px 4px",
    textAlign: "center",
  },
  statNum: {
    display: "block",
    color: "#f1f5f9",
    fontWeight: 800,
    fontSize: 16,
  },
  statLabel: {
    display: "block",
    color: "#64748b",
    fontSize: 10,
    marginTop: 2,
  },
  main: {
    flex: 1,
    minWidth: 0,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  menuBtn: {
    background: "#1e2435",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#94a3b8",
    borderRadius: 8,
    padding: "7px 12px",
    fontSize: 12,
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  statsBar: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  statsText: {
    color: "#64748b",
    fontSize: 13,
  },
  statsCount: {
    background: "rgba(230,57,70,0.15)",
    color: "#e63946",
    borderRadius: 20,
    padding: "2px 10px",
    fontSize: 12,
    fontWeight: 700,
  },
  sortSelect: {
    background: "#1e2435",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#f1f5f9",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 13,
    cursor: "pointer",
    outline: "none",
  },
  errorBanner: {
    background: "rgba(251,191,36,0.1)",
    border: "1px solid rgba(251,191,36,0.3)",
    color: "#fbbf24",
    borderRadius: 10,
    padding: "10px 16px",
    fontSize: 13,
    marginBottom: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
    gap: 16,
  },
  empty: {
    textAlign: "center",
    padding: "80px 20px",
    color: "#64748b",
  },
  resetBtn: {
    marginTop: 16,
    background: "linear-gradient(135deg, #e63946, #c1121f)",
    color: "#fff",
    border: "none",
    borderRadius: 20,
    padding: "10px 24px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
  paginationWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 36,
    flexWrap: "wrap",
  },
  pageBtn: {
    background: "#1e2435",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#94a3b8",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s ease",
    minWidth: 40,
  },
  pageBtnActive: {
    background: "linear-gradient(135deg, #e63946, #c1121f)",
    color: "#fff",
    border: "1px solid #e63946",
  },
  pageBtnDisabled: {
    opacity: 0.35,
    cursor: "not-allowed",
  },
  pageDots: {
    color: "#475569",
    fontSize: 14,
    padding: "0 4px",
  },
};

/* ─── Inline CSS for hover states ─── */
const inlineCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
  .search-input:focus {
    border-color: #e63946 !important;
    box-shadow: 0 0 0 3px rgba(230,57,70,0.15);
  }
  .cat-btn:hover {
    background: rgba(255,255,255,0.06) !important;
    color: #f1f5f9 !important;
  }
  .page-btn:hover:not(:disabled) {
    background: #2a3045 !important;
    color: #f1f5f9 !important;
    border-color: rgba(255,255,255,0.2) !important;
  }
  .icon-btn:hover {
    background: #2a3045 !important;
    color: #f1f5f9 !important;
  }
  .sort-select:hover {
    border-color: rgba(255,255,255,0.2) !important;
  }
  .sort-select option {
    background: #1e2435;
    color: #f1f5f9;
  }
  .skeleton-pulse {
    animation: pulse 1.5s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  @media (max-width: 768px) {
    .layout { flex-direction: column !important; }
    .sidebar { width: 100% !important; }
  }
`;

export default ProductsPage;