import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Props, statusMeta, catColors } from "./manga.interface";

/* ─── Grid Card ─── */
const GridCard = ({ item }: { item: Props["item"] }) => {
  const navigate = useNavigate();
  const [imgErr, setImgErr] = useState(false);
  const catColor = catColors[item.category] || "#6b7280";
  const st = item.status ? statusMeta[item.status] : null;

  return (
    <div onClick={() => navigate(`/manga/${item.id}`)} style={g.card} className="ml-card">
      {/* Image */}
      <div style={g.imgBox}>
        <img
          src={imgErr ? "https://picsum.photos/300/420" : item.image}
          alt={item.title}
          style={g.img}
          onError={() => setImgErr(true)}
        />
        <div style={g.gradientOverlay} className="ml-overlay" />

        {/* Badges top-left */}
        <div style={g.badgeStack}>
          {item.isHot && <span style={{ ...g.badge, background: "#ef4444" }}>🔥 HOT</span>}
          {item.isNew && <span style={{ ...g.badge, background: "#22c55e" }}>✨ MỚI</span>}
        </div>

        {/* Cat tag bottom-right */}
        <span style={{ ...g.catTag, background: catColor }}>{item.category}</span>

        {/* Hover layer */}
        <div style={g.hoverLayer} className="ml-hover">
          <p style={g.hoverDesc}>{item.description || "Nhấn để xem chi tiết"}</p>
          <span style={g.hoverBtn}>📖 Đọc ngay</span>
        </div>
      </div>

      {/* Body */}
      <div style={g.body}>
        <p style={g.title} title={item.title}>{item.title}</p>
        <p style={g.chapter}>{item.chapter}</p>

        <div style={g.meta}>
          <span style={g.rating}>⭐ {item.rating.toFixed(1)}</span>
          {item.views !== undefined && (
            <span style={g.views}>
              👁 {item.views >= 1000 ? `${(item.views / 1000).toFixed(1)}K` : item.views}
            </span>
          )}
          {st && (
            <span style={{ ...g.status, color: st.color, background: st.bg }}>
              {st.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── List Row ─── */
const ListRow = ({ item }: { item: Props["item"] }) => {
  const navigate = useNavigate();
  const [imgErr, setImgErr] = useState(false);
  const catColor = catColors[item.category] || "#6b7280";
  const st = item.status ? statusMeta[item.status] : null;

  return (
    <div onClick={() => navigate(`/manga/${item.id}`)} style={l.row} className="ml-row">
      {/* Thumb */}
      <div style={l.thumb}>
        <img
          src={imgErr ? "https://picsum.photos/80/110" : item.image}
          alt={item.title}
          style={l.thumbImg}
          onError={() => setImgErr(true)}
        />
        {item.isHot && <span style={l.hotDot} title="Hot">🔥</span>}
      </div>

      {/* Info */}
      <div style={l.info}>
        <div style={l.titleRow}>
          <h3 style={l.title}>{item.title}</h3>
          {item.isNew && <span style={{ ...l.badge, background: "#22c55e" }}>MỚI</span>}
        </div>

        {item.author && <p style={l.author}>✍️ {item.author}</p>}

        <p style={l.desc}>
          {item.description || "Một bộ truyện hấp dẫn đang chờ bạn khám phá..."}
        </p>

        {/* Tags */}
        {item.tags && (
          <div style={l.tags}>
            {item.tags.slice(0, 3).map(t => (
              <span key={t} style={l.tag}>{t}</span>
            ))}
          </div>
        )}
      </div>

      {/* Right side */}
      <div style={l.right}>
        <span style={{ ...l.catBadge, background: catColor }}>{item.category}</span>
        <div style={l.chapterLine}>
          <span style={l.chapterIcon}>📄</span>
          <span style={l.chapterText}>{item.chapter}</span>
        </div>
        <div style={l.ratingLine}>
          <span style={l.starIcon}>⭐</span>
          <span style={l.ratingNum}>{item.rating.toFixed(1)}</span>
        </div>
        {item.views !== undefined && (
          <div style={l.viewsLine}>
            <span>👁 {item.views >= 1000 ? `${(item.views / 1000).toFixed(1)}K` : item.views}</span>
          </div>
        )}
        {st && (
          <span style={{ ...l.statusBadge, color: st.color, background: st.bg }}>
            {st.label}
          </span>
        )}
        <button style={l.readBtn}>Đọc ngay →</button>
      </div>
    </div>
  );
};

/* ─── Export wrapper ─── */
const MangaCard = ({ item, viewMode = "grid" }: Props) => {
  return viewMode === "list" ? <ListRow item={item} /> : <GridCard item={item} />;
};

/* ══════════════════ STYLES ══════════════════ */

/* Grid Card styles */
const g: Record<string, React.CSSProperties> = {
  card: {
    background: "#1a1f2e",
    borderRadius: 12,
    overflow: "hidden",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.07)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },
  imgBox: {
    position: "relative",
    width: "100%",
    paddingTop: "145%",
    overflow: "hidden",
    background: "#0f1117",
  },
  img: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.35s ease",
  },
  gradientOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(10,12,18,0.9) 0%, transparent 60%)",
    zIndex: 1,
  },
  badgeStack: {
    position: "absolute",
    top: 8,
    left: 8,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    zIndex: 3,
  },
  badge: {
    fontSize: 10,
    fontWeight: 700,
    color: "#fff",
    padding: "2px 8px",
    borderRadius: 20,
    letterSpacing: "0.5px",
  },
  catTag: {
    position: "absolute",
    bottom: 8,
    right: 8,
    fontSize: 10,
    fontWeight: 700,
    color: "#fff",
    padding: "3px 9px",
    borderRadius: 20,
    textTransform: "uppercase",
    zIndex: 3,
  },
  hoverLayer: {
    position: "absolute",
    inset: 0,
    background: "rgba(10,12,18,0.85)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    zIndex: 4,
    opacity: 0,
    transition: "opacity 0.3s ease",
    textAlign: "center",
  },
  hoverDesc: {
    color: "#cbd5e1",
    fontSize: 12,
    lineHeight: 1.6,
    marginBottom: 12,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
  },
  hoverBtn: {
    background: "linear-gradient(135deg, #e63946, #c1121f)",
    color: "#fff",
    padding: "7px 18px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
  },
  body: {
    padding: "12px 12px 14px",
  },
  title: {
    color: "#f1f5f9",
    fontSize: 13,
    fontWeight: 700,
    margin: 0,
    marginBottom: 3,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  chapter: {
    color: "#64748b",
    fontSize: 12,
    margin: "0 0 8px",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  rating: {
    color: "#fbbf24",
    fontWeight: 700,
    fontSize: 12,
  },
  views: {
    color: "#475569",
    fontSize: 11,
  },
  status: {
    marginLeft: "auto",
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: 20,
  },
};

/* List Row styles */
const l: Record<string, React.CSSProperties> = {
  row: {
    display: "flex",
    gap: 16,
    background: "#1a1f2e",
    borderRadius: 12,
    padding: 14,
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.07)",
    transition: "border-color 0.2s ease, background 0.2s ease",
    alignItems: "flex-start",
  },
  thumb: {
    position: "relative",
    flexShrink: 0,
    width: 80,
    height: 110,
    borderRadius: 8,
    overflow: "hidden",
    background: "#0f1117",
  },
  thumbImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  hotDot: {
    position: "absolute",
    top: 4,
    right: 4,
    fontSize: 12,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  title: {
    color: "#f1f5f9",
    fontSize: 15,
    fontWeight: 700,
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  badge: {
    flexShrink: 0,
    fontSize: 9,
    fontWeight: 700,
    color: "#fff",
    padding: "2px 7px",
    borderRadius: 20,
  },
  author: {
    color: "#64748b",
    fontSize: 12,
    margin: "0 0 6px",
  },
  desc: {
    color: "#94a3b8",
    fontSize: 12,
    lineHeight: 1.6,
    margin: "0 0 8px",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  tags: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  tag: {
    background: "rgba(255,255,255,0.06)",
    color: "#64748b",
    fontSize: 10,
    padding: "2px 8px",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.08)",
  },
  right: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 6,
    minWidth: 100,
  },
  catBadge: {
    fontSize: 10,
    fontWeight: 700,
    color: "#fff",
    padding: "3px 10px",
    borderRadius: 20,
    textTransform: "uppercase",
  },
  chapterLine: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    color: "#64748b",
    fontSize: 12,
  },
  chapterIcon: { fontSize: 12 },
  chapterText: { color: "#94a3b8", fontSize: 12 },
  ratingLine: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  starIcon: { fontSize: 12 },
  ratingNum: { color: "#fbbf24", fontWeight: 700, fontSize: 13 },
  viewsLine: {
    color: "#475569",
    fontSize: 11,
  },
  statusBadge: {
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: 20,
  },
  readBtn: {
    marginTop: 4,
    background: "linear-gradient(135deg, #e63946, #c1121f)",
    color: "#fff",
    border: "none",
    borderRadius: 20,
    padding: "5px 14px",
    fontSize: 11,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};

/* ─── Inject hover CSS once ─── */
if (typeof document !== "undefined" && !document.getElementById("ml-card-style")) {
  const style = document.createElement("style");
  style.id = "ml-card-style";
  style.innerHTML = `
    .ml-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .ml-card:hover img { transform: scale(1.07); }
    .ml-card:hover .ml-hover { opacity: 1 !important; }
    .ml-row:hover { border-color: rgba(230,57,70,0.35) !important; background: #1e2435 !important; }
  `;
  document.head.appendChild(style);
}

export default MangaCard;