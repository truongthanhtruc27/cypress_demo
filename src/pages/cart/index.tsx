import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../store/useCart";

/* ─── Price placeholder per manga ─── */
const PRICE_PER_ITEM = 29000; // 29.000đ / truyện

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, addToCart, decreaseQty, clearCart } = useCart();

  /* Tăng qty bằng cách addToCart thêm lần nữa */
  const increaseQty = (id: number) => {
    const item = items.find((i) => i.id === id);
    if (item) addToCart({ id: item.id, title: item.title, image: item.image, category: item.category });
  };

  /* Giảm qty */
  const decreaseQtyHandler = (id: number) => {
    decreaseQty(id);
  };

  const removeItem = (id: number) => {
    if (window.confirm("Xóa truyện này khỏi giỏ hàng?")) {
      removeFromCart(id);
    }
  };

  const subtotal = items.reduce((acc, item) => acc + PRICE_PER_ITEM * item.quantity, 0);
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  /* ── Empty state ── */
  if (items.length === 0) {
    return (
      <div style={s.emptyRoot}>
        <style>{css}</style>
        <div style={s.emptyIcon}>🛒</div>
        <h2 style={s.emptyTitle}>Giỏ hàng của bạn đang trống</h2>
        <p style={s.emptyDesc}>Hãy chọn cho mình những bộ truyện yêu thích nhé!</p>
        <button onClick={() => navigate("/products")} style={s.btnPrimary} className="cart-btn-primary">
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  return (
    <div style={s.root}>
      <style>{css}</style>
      <div style={s.container}>
        <div style={s.headerRow}>
          <h1 style={s.pageTitle}>🛒 Giỏ hàng của bạn</h1>
          <button onClick={() => clearCart()} style={s.clearBtn} className="cart-clear-btn">
            🗑️ Xóa tất cả
          </button>
        </div>

        <div style={s.layout}>
          {/* ── Left: List ── */}
          <div style={s.listCol}>
            {items.map((item) => (
              <div key={item.id} style={s.itemCard} className="cart-item">
                {/* Ảnh */}
                <img
                  src={item.image}
                  alt={item.title}
                  style={s.itemImg}
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://picsum.photos/70/100"; }}
                />

                {/* Info */}
                <div style={s.itemInfo}>
                  <span style={s.itemCat}>{item.category}</span>
                  <h3 style={s.itemTitle}>{item.title}</h3>
                  <div style={s.itemPrice}>{PRICE_PER_ITEM.toLocaleString()}đ / tập</div>
                </div>

                {/* Qty controls */}
                <div style={s.itemControl}>
                  <div style={s.qtyRow}>
                    <button onClick={() => decreaseQtyHandler(item.id)} style={s.qtyBtn} className="cart-qty-btn">-</button>
                    <span style={s.qtyVal}>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)} style={s.qtyBtn} className="cart-qty-btn">+</button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={s.removeBtn}
                    className="remove-btn"
                    title="Xóa"
                  >
                    🗑️
                  </button>
                </div>

                {/* Subtotal */}
                <div style={s.itemSubtotal}>
                  {(PRICE_PER_ITEM * item.quantity).toLocaleString()}đ
                </div>
              </div>
            ))}
          </div>

          {/* ── Right: Summary ── */}
          <div style={s.summaryCol}>
            <div style={s.summaryCard}>
              <h3 style={s.summaryTitle}>Tổng cộng</h3>

              <div style={s.sumRow}>
                <span>Tạm tính ({items.reduce((a, i) => a + i.quantity, 0)} tập):</span>
                <span>{subtotal.toLocaleString()}đ</span>
              </div>
              <div style={s.sumRow}>
                <span>Phí vận chuyển:</span>
                <span>{shipping.toLocaleString()}đ</span>
              </div>
              <div style={s.divider} />
              <div style={{ ...s.sumRow, fontSize: 18, fontWeight: 800, color: "#ef4444" }}>
                <span>Tổng tiền:</span>
                <span>{total.toLocaleString()}đ</span>
              </div>

              <button style={s.btnCheckout} className="btn-checkout" onClick={() => navigate("/checkout")}>
                THANH TOÁN NGAY 💳
              </button>

              <div style={s.promoWrap}>
                <input placeholder="Mã giảm giá..." style={s.promoInput} />
                <button style={s.btnPromo}>Áp dụng</button>
              </div>
            </div>

            <button onClick={() => navigate("/products")} style={s.btnBack}>
              ← Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Styles ─── */
const s: Record<string, React.CSSProperties> = {
  root: {
    background: "#f6f8fb",
    color: "#16202a",
    paddingTop: 40,
    paddingBottom: 80,
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    maxWidth: 1100,
    padding: "0 20px",
    margin: "0 auto",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    flexWrap: "wrap",
    gap: 12,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: "-0.5px",
    margin: 0,
  },
  clearBtn: {
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.25)",
    color: "#ef4444",
    borderRadius: 20,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  layout: {
    display: "flex",
    gap: 32,
    flexWrap: "wrap",
  },
  listCol: {
    flex: 2,
    minWidth: 320,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  itemCard: {
    background: "#ffffff",
    border: "1px solid #e4e9ef",
    borderRadius: 16,
    padding: 16,
    display: "flex",
    alignItems: "center",
    gap: 20,
    transition: "all 0.2s ease",
  },
  itemImg: {
    width: 70,
    height: 100,
    objectFit: "cover",
    borderRadius: 8,
    flexShrink: 0,
  },
  itemInfo: {
    flex: 1,
    minWidth: 0,
  },
  itemCat: {
    fontSize: 10,
    fontWeight: 700,
    color: "#ef4444",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    display: "block",
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 700,
    margin: "0 0 4px",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  itemPrice: {
    fontSize: 13,
    color: "#94a3b8",
  },
  itemControl: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 10,
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    background: "#f0f4f7",
    borderRadius: 8,
    padding: "2px",
  },
  qtyBtn: {
    width: 28,
    height: 28,
    border: "none",
    background: "transparent",
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.2s",
  },
  qtyVal: {
    width: 32,
    textAlign: "center" as const,
    fontSize: 14,
    fontWeight: 600,
  },
  removeBtn: {
    background: "transparent",
    border: "none",
    fontSize: 16,
    cursor: "pointer",
    opacity: 0.45,
    transition: "opacity 0.2s",
  },
  itemSubtotal: {
    width: 100,
    textAlign: "right" as const,
    fontSize: 16,
    fontWeight: 700,
    color: "#f1f5f9",
    flexShrink: 0,
  },

  /* Summary */
  summaryCol: {
    flex: 1,
    minWidth: 300,
  },
  summaryCard: {
    background: "#ffffff",
    border: "1px solid #e4e9ef",
    borderRadius: 20,
    padding: 24,
    position: "sticky" as const,
    top: 100,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 800,
    marginBottom: 20,
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    paddingBottom: 12,
    margin: "0 0 20px",
  },
  sumRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 12,
    fontSize: 14,
    color: "#94a3b8",
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.06)",
    margin: "16px 0",
  },
  btnCheckout: {
    width: "100%",
    background: "linear-gradient(135deg, #ef4444, #b91c1c)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
    marginTop: 20,
    boxShadow: "0 8px 24px rgba(239,68,68,0.25)",
    transition: "all 0.2s ease",
  },
  promoWrap: {
    marginTop: 24,
    display: "flex",
    gap: 8,
  },
  promoInput: {
    flex: 1,
    background: "#f6f8fb",
    border: "1px solid #d6e0e7",
    borderRadius: 8,
    padding: "8px 12px",
    color: "#fff",
    fontSize: 13,
    outline: "none",
  },
  btnPromo: {
    background: "#1e2433",
    color: "#cbd5e1",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: "0 12px",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  },
  btnBack: {
    display: "block",
    width: "100%",
    marginTop: 16,
    background: "transparent",
    border: "none",
    color: "#64748b",
    fontSize: 14,
    cursor: "pointer",
    textAlign: "center" as const,
  },

  /* Empty State */
  emptyRoot: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    textAlign: "center" as const,
    color: "#64748b",
    fontFamily: "'Inter', sans-serif",
  },
  emptyIcon: { fontSize: 64, marginBottom: 20, opacity: 0.3 },
  emptyTitle: { color: "#f1f5f9", fontSize: 24, fontWeight: 800, marginBottom: 12 },
  emptyDesc: { fontSize: 16, marginBottom: 32, maxWidth: 300 },
  btnPrimary: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: 30,
    padding: "12px 32px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(239,68,68,0.2)",
    transition: "all 0.2s ease",
  },
};

const css = `
  .cart-item:hover { transform: translateX(4px); border-color: #e05252 !important; }
  .remove-btn:hover { opacity: 1 !important; color: #ef4444; }
  .btn-checkout:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 12px 30px rgba(239,68,68,0.4) !important; }
  .cart-qty-btn:hover { color: #ef4444 !important; }
  .cart-clear-btn:hover { background: rgba(239,68,68,0.2) !important; }
  .cart-btn-primary:hover { transform: translateY(-2px); filter: brightness(1.1); }
`;

export default CartPage;
