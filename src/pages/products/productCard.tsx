import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Props, statusLabel } from "./products.interface";

const categoryColors: Record<string, string> = {
  ACTION: "#ef4444",
  ADVENTURE: "#f59e0b",
  FANTASY: "#8b5cf6",
  ROMANCE: "#ec4899",
  COMEDY: "#22c55e",
  HORROR: "#6b7280",
  SCIFI: "#3b82f6",
};

const ProductCard = ({ item }: Props) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const catColor = categoryColors[item.category] || "#6b7280";
  const status = item.status ? statusLabel[item.status] : null;

  return (
    <div
      onClick={() => navigate(`/manga/${item.id}`)}
      style={styles.card}
      className="product-card"
    >
      {/* Thumbnail */}
      <div style={styles.imgWrapper}>
        <img
          src={imgError ? "https://picsum.photos/300/420?random=99" : item.image}
          alt={item.title}
          style={styles.img}
          onError={() => setImgError(true)}
        />

        {/* Gradient overlay */}
        <div style={styles.overlay} className="card-overlay" />

        {/* Badges */}
        <div style={styles.badges}>
          {item.isHot && (
            <span style={{ ...styles.badge, background: "#ef4444" }}>🔥 HOT</span>
          )}
          {item.isNew && (
            <span style={{ ...styles.badge, background: "#22c55e" }}>✨ MỚI</span>
          )}
        </div>

        {/* Category tag */}
        <div style={{ ...styles.catTag, background: catColor }}>
          {item.category}
        </div>

        {/* Hover info */}
        <div style={styles.hoverInfo} className="card-hover-info">
          <p style={styles.hoverDesc}>
            {item.description || "Nhấn để đọc truyện này ngay!"}
          </p>
          <button style={styles.readBtn}>📖 Đọc ngay</button>
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        <h3 style={styles.title} title={item.title}>
          {item.title}
        </h3>

        <p style={styles.chapter}>{item.chapter}</p>

        {item.author && (
          <p style={styles.author}>✍️ {item.author}</p>
        )}

        <div style={styles.footer}>
          {/* Rating */}
          <div style={styles.rating}>
            <span style={styles.starIcon}>⭐</span>
            <span style={styles.ratingVal}>{item.rating.toFixed(1)}</span>
          </div>

          {/* Views */}
          {item.views !== undefined && (
            <span style={styles.views}>
              👁 {item.views >= 1000
                ? `${(item.views / 1000).toFixed(1)}K`
                : item.views}
            </span>
          )}

          {/* Status */}
          {status && (
            <span style={{ ...styles.statusDot, background: status.color }}>
              {status.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#1e2435",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.07)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    position: "relative",
  },
  imgWrapper: {
    position: "relative",
    width: "100%",
    paddingTop: "140%",
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
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(10,12,18,0.95) 0%, rgba(10,12,18,0.3) 50%, transparent 100%)",
    zIndex: 1,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  badges: {
    position: "absolute",
    top: 8,
    left: 8,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    zIndex: 3,
  },
  badge: {
    fontSize: "10px",
    fontWeight: 700,
    color: "#fff",
    padding: "2px 7px",
    borderRadius: "20px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  catTag: {
    position: "absolute",
    bottom: 8,
    right: 8,
    fontSize: "10px",
    fontWeight: 700,
    color: "#fff",
    padding: "3px 9px",
    borderRadius: "20px",
    textTransform: "uppercase",
    zIndex: 3,
    letterSpacing: "0.5px",
  },
  hoverInfo: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
    zIndex: 4,
    opacity: 0,
    transition: "opacity 0.3s ease",
    textAlign: "center",
  },
  hoverDesc: {
    color: "#e2e8f0",
    fontSize: "12px",
    lineHeight: 1.5,
    marginBottom: "10px",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  readBtn: {
    background: "linear-gradient(135deg, #e63946 0%, #c1121f 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "7px 20px",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "0.5px",
  },
  body: {
    padding: "12px 14px 14px",
  },
  title: {
    color: "#f1f5f9",
    fontSize: "14px",
    fontWeight: 700,
    margin: 0,
    marginBottom: 4,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    letterSpacing: "0.2px",
  },
  chapter: {
    color: "#94a3b8",
    fontSize: "12px",
    margin: 0,
    marginBottom: 4,
  },
  author: {
    color: "#64748b",
    fontSize: "11px",
    margin: 0,
    marginBottom: 8,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: 3,
  },
  starIcon: {
    fontSize: "12px",
  },
  ratingVal: {
    color: "#fbbf24",
    fontWeight: 700,
    fontSize: "13px",
  },
  views: {
    color: "#64748b",
    fontSize: "11px",
  },
  statusDot: {
    fontSize: "10px",
    fontWeight: 600,
    color: "#fff",
    padding: "2px 8px",
    borderRadius: "20px",
    marginLeft: "auto",
  },
};

// Inject hover CSS
const hoverStyle = document.createElement("style");
hoverStyle.innerHTML = `
  .product-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(230,57,70,0.3);
  }
  .product-card:hover .card-overlay {
    opacity: 1 !important;
  }
  .product-card:hover .card-hover-info {
    opacity: 1 !important;
  }
  .product-card:hover img {
    transform: scale(1.08);
  }
`;
if (!document.head.querySelector("#product-card-style")) {
  hoverStyle.id = "product-card-style";
  document.head.appendChild(hoverStyle);
}

export default ProductCard;