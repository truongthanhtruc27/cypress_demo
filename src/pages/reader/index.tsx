import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

/* ─── Types ─── */
type Manga = { id: number; title: string; image?: string };
type Chapter = { id?: number; title: string; pages: string[] };
type ChapterMeta = { id: number; title: string };

const localChapterConfig: Record<number, { folder: string; extension: string; count: number; hasChapters?: boolean }> = {
  1: { folder: "Tranh1", extension: "jpg", count: 10, hasChapters: true },
  2: { folder: "Conan", extension: "jpg", count: 5, hasChapters: true },
  3: { folder: "OnepunchMan", extension: "jpeg", count: 10, hasChapters: true },
  4: { folder: "VuaHaiTac", extension: "jpg", count: 10, hasChapters: true },
  5: { folder: "Doraemon", extension: "jpg", count: 8 },
  6: { folder: "KyochuuRettou", extension: "jpg", count: 10 },
};

const getLocalPages = (mangaId: number, chapterId: number) => {
  const config = localChapterConfig[mangaId] || localChapterConfig[1];
  const folder = config.hasChapters ? `${config.folder}/Chuong${chapterId === 2 ? 2 : 1}` : config.folder;
  return Array.from({ length: config.count }, (_, index) =>
    `/images/${folder}/${index + 1}.${config.extension}`
  );
};

/* ─── Sticky Top Bar ─── */
const TopBar = ({
  manga,
  chapter,
  chapterData,
  chapterList,
  onPrev,
  onNext,
  onChapterJump,
  hasPrev,
  hasNext,
  currentChapterId,
  scrollPct,
}: {
  manga: Manga | null;
  chapter: string | undefined;
  chapterData: Chapter | null;
  chapterList: ChapterMeta[];
  onPrev: () => void;
  onNext: () => void;
  onChapterJump: (id: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
  currentChapterId: number;
  scrollPct: number;
}) => (
  <div style={s.topBar}>
    <div style={s.topBarInner}>
      {/* Left: back + title */}
      <div style={s.topLeft}>
        <button
          onClick={() => window.history.back()}
          style={s.backBtn}
          className="rd-btn"
          title="Quay lại"
        >←</button>
        <div style={s.topTitle}>
          <span style={s.topManga}>{manga?.title || "..."}</span>
          <span style={s.topChap}>{chapterData?.title || `Chương ${chapter}`}</span>
        </div>
      </div>

      {/* Center: chapter select */}
      <div style={s.topCenter}>
        <button onClick={onPrev} disabled={!hasPrev} style={{ ...s.navBtn, opacity: hasPrev ? 1 : 0.3 }} className="rd-btn">‹</button>
        <select
          value={currentChapterId}
          onChange={e => onChapterJump(Number(e.target.value))}
          style={s.chapSelect}
          className="rd-select"
        >
          {chapterList.map(c => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        <button onClick={onNext} disabled={!hasNext} style={{ ...s.navBtn, opacity: hasNext ? 1 : 0.3 }} className="rd-btn">›</button>
      </div>

      {/* Right: progress */}
      <div style={s.topRight}>
        <span style={s.progressLabel}>{scrollPct}%</span>
      </div>
    </div>

    {/* Progress bar */}
    <div style={s.progressTrack}>
      <div style={{ ...s.progressFill, width: `${scrollPct}%` }} />
    </div>
  </div>
);

/* ─── Bottom Nav ─── */
const BottomNav = ({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  chapterData,
  onScrollTop,
}: {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  chapterData: Chapter | null;
  onScrollTop: () => void;
}) => (
  <div style={s.bottomNav}>
    <button
      onClick={onPrev}
      disabled={!hasPrev}
      style={{ ...s.bigNavBtn, opacity: hasPrev ? 1 : 0.35 }}
      className="rd-big-btn"
    >
      ← Chương trước
    </button>

    <button onClick={onScrollTop} style={s.topBtn} className="rd-btn" title="Lên đầu trang">
      ↑ Đầu trang
    </button>

    <button
      onClick={onNext}
      disabled={!hasNext}
      style={{ ...s.bigNavBtn, ...s.bigNavBtnPrimary, opacity: hasNext ? 1 : 0.35 }}
      className="rd-big-btn-primary"
    >
      Chương tiếp →
    </button>
  </div>
);

/* ══════════ MAIN ══════════ */
const Reader = () => {
  const { id, chapter } = useParams();
  const navigate = useNavigate();

  const [manga, setManga] = useState<Manga | null>(null);
  const [chapterData, setChapterData] = useState<Chapter | null>(null);
  const [chapterList, setChapterList] = useState<ChapterMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollPct, setScrollPct] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  const chapterId = Number(chapter);

  /* ── Scroll tracker ── */
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? Math.round((el.scrollTop / total) * 100) : 0;
      setScrollPct(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Fetch manga info ── */
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/manga/${id}`)
      .then(r => r.json())
      .then(setManga)
      .catch(() => setManga({ id: Number(id), title: "Manga" }));
  }, [id]);

  /* ── Fetch chapter list ── */
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/manga/${id}/chapters`)
      .then(r => r.json())
      .then(data => setChapterList(Array.isArray(data) ? data : []))
      .catch(() => setChapterList([]));
  }, [id]);

  /* ── Fetch chapter pages ── */
  useEffect(() => {
    if (!id || !chapter) return;
    setLoading(true);
    setChapterData(null);
    window.scrollTo({ top: 0 });

    fetch(`http://localhost:5000/api/manga/${id}/chapter/${chapter}`)
      .then(r => r.json())
      .then(data => {
        if (!data?.chapter || !Array.isArray(data.chapter.pages)) throw new Error("Invalid chapter");
        setChapterData(data.chapter);
        setLoading(false);
      })
      .catch(() => {
        /* fallback: show placeholder pages */
        setChapterData({
          title: `Chương ${chapter}`,
          pages: getLocalPages(Number(id), Number(chapter)),
        });
        setLoading(false);
      });
  }, [id, chapter]);

  /* ── Navigation helpers ── */
  const currentIdx = chapterList.findIndex(c => c.id === chapterId);
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < chapterList.length - 1 && currentIdx !== -1;

  const goChapter = useCallback((cid: number) => {
    navigate(`/manga/${id}/chapter/${cid}`);
  }, [id, navigate]);

  const goPrev = () => {
    if (hasPrev) goChapter(chapterList[currentIdx - 1].id);
  };
  const goNext = () => {
    if (hasNext) goChapter(chapterList[currentIdx + 1].id);
  };
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* ── Loading UI ── */
  if (loading) {
    return (
      <div style={s.loadingScreen}>
        <style>{css}</style>
        <div style={s.loadingSpinner} className="rd-spinner" />
        <p style={s.loadingText}>Đang tải chương...</p>
      </div>
    );
  }

  if (!chapterData) {
    return (
      <div style={s.loadingScreen}>
        <p style={{ color: "#ef4444", fontSize: 16 }}>❌ Không tìm thấy chương này</p>
        <button onClick={() => navigate(-1)} style={s.bigNavBtn}>← Quay lại</button>
      </div>
    );
  }

  return (
    <div style={s.root} ref={topRef}>
      <style>{css}</style>

      {/* ── STICKY TOP BAR ── */}
      <TopBar
        manga={manga}
        chapter={chapter}
        chapterData={chapterData}
        chapterList={chapterList}
        onPrev={goPrev}
        onNext={goNext}
        onChapterJump={goChapter}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentChapterId={chapterId}
        scrollPct={scrollPct}
      />

      {/* ── PAGES ── */}
      <div style={s.pageWrap} key={chapter}>
        {chapterData.pages.map((img, i) => (
          <img
            key={`${chapter}-${i}`}
            src={img}
            alt={`Trang ${i + 1}`}
            loading="lazy"
            style={s.pageImg}
            className="rd-page-img"
          />
        ))}
      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav
        onPrev={goPrev}
        onNext={goNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
        chapterData={chapterData}
        onScrollTop={scrollTop}
      />

      {/* ── END CARD ── */}
      <div style={s.endCard}>
        <p style={s.endTitle}>✅ Bạn đã đọc xong</p>
        <p style={s.endChap}>{chapterData.title}</p>
        <div style={s.endBtnRow}>
          {hasPrev && (
            <button onClick={goPrev} style={s.bigNavBtn} className="rd-big-btn">← Chương trước</button>
          )}
          <button
            onClick={() => navigate(`/manga/${id}`)}
            style={s.endDetailBtn}
            className="rd-btn"
          >
            📚 Trang truyện
          </button>
          {hasNext && (
            <button onClick={goNext} style={{ ...s.bigNavBtn, ...s.bigNavBtnPrimary }} className="rd-big-btn-primary">
              Chương tiếp →
            </button>
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
    background: "#111",
    fontFamily: "'Inter','Segoe UI',sans-serif",
    paddingTop: 56,
  },

  /* Loading */
  loadingScreen: {
    minHeight: "100vh",
    background: "#111",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  loadingSpinner: {
    width: 40,
    height: 40,
    border: "3px solid rgba(255,255,255,0.1)",
    borderTop: "3px solid #e63946",
    borderRadius: "50%",
  },
  loadingText: {
    color: "#64748b",
    fontSize: 14,
  },

  /* Top bar */
  topBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: "rgba(10,12,16,0.96)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  topBarInner: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "0 16px",
    height: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  topLeft: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  backBtn: {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#94a3b8",
    borderRadius: 8,
    width: 34,
    height: 34,
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.15s ease",
  },
  topTitle: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  topManga: {
    color: "#f1f5f9",
    fontSize: 13,
    fontWeight: 700,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  topChap: {
    color: "#64748b",
    fontSize: 11,
  },
  topCenter: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
  },
  navBtn: {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#f1f5f9",
    borderRadius: 8,
    width: 32,
    height: 32,
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s ease",
    lineHeight: 1,
  },
  chapSelect: {
    background: "#1a1f2e",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#f1f5f9",
    borderRadius: 8,
    padding: "5px 10px",
    fontSize: 12,
    cursor: "pointer",
    outline: "none",
    maxWidth: 160,
  },
  topRight: {
    flexShrink: 0,
  },
  progressLabel: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: 700,
    fontVariantNumeric: "tabular-nums",
  },
  progressTrack: {
    height: 2,
    background: "rgba(255,255,255,0.07)",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#e63946,#f97316)",
    transition: "width 0.2s ease",
  },

  /* Pages */
  pageWrap: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "16px 0",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  pageImg: {
    width: "100%",
    height: "auto",
    display: "block",
    userSelect: "none",
  },

  /* Bottom nav */
  bottomNav: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "24px 16px 8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  bigNavBtn: {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#f1f5f9",
    borderRadius: 10,
    padding: "12px 22px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.18s ease",
  },
  bigNavBtnPrimary: {
    background: "linear-gradient(135deg,#e63946,#c1121f)",
    border: "none",
    boxShadow: "0 4px 16px rgba(230,57,70,0.3)",
  },
  topBtn: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#64748b",
    borderRadius: 10,
    padding: "10px 18px",
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.18s ease",
  },

  /* End card */
  endCard: {
    maxWidth: 800,
    margin: "0 auto 60px",
    padding: "36px 24px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 16,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 60,
  },
  endTitle: {
    color: "#4ade80",
    fontSize: 16,
    fontWeight: 700,
    margin: "0 0 6px",
  },
  endChap: {
    color: "#64748b",
    fontSize: 13,
    margin: "0 0 24px",
  },
  endBtnRow: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  endDetailBtn: {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#94a3b8",
    borderRadius: 10,
    padding: "11px 20px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.18s ease",
  },
};

/* ── CSS ── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  body { background: #111 !important; }

  .rd-btn:hover { background: rgba(255,255,255,0.14) !important; color: #f1f5f9 !important; }
  .rd-select option { background: #1a1f2e; }
  .rd-big-btn:hover:not(:disabled) { background: rgba(255,255,255,0.12) !important; }
  .rd-big-btn-primary:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-1px); }
  .rd-page-img { transition: opacity 0.2s ease; }

  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .rd-spinner { animation: spin 0.8s linear infinite; }
`;

export default Reader;