import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Types ─── */
interface ICartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
}

const MOCK_CART: ICartItem[] = [
  {
    id: 1,
    title: "Solo Leveling - Tập 1",
    image: "https://cdn.myanimelist.net/images/manga/3/222295l.jpg",
    price: 150000,
    quantity: 1,
    category: "Manga",
  },
  {
    id: 2,
    title: "One Piece - Volume 100",
    image: "https://cdn.myanimelist.net/images/manga/2/253146l.jpg",
    price: 25000,
    quantity: 2,
    category: "Manga",
  },
];

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<ICartItem[]>(MOCK_CART);

  const updateQty = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    if (window.confirm("Xóa sản phẩm này khỏi giỏ hàng?")) {
      setCart(prev => prev.filter(item => item.id !== id));
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div style={s.emptyRoot}>
        <div style={s.emptyIcon}>🛒</div>
        <h2 style={s.emptyTitle}>Giỏ hàng của bạn đang trống</h2>
        <p style={s.emptyDesc}>Hãy chọn cho mình những bộ truyện yêu thích nhé!</p>
        <button onClick={() => navigate("/products")} style={s.btnPrimary}>
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  return (
    <div style={s.root}>
      <style>{css}</style>
      <div style={s.container}>
        <h1 style={s.pageTitle}>🛒 Giỏ hàng của bạn</h1>

        <div style={s.layout}>
          {/* Left: List */}
          <div style={s.listCol}>
            {cart.map(item => (
              <div key={item.id} style={s.itemCard} className="cart-item">
                <img src={item.image} alt={item.title} style={s.itemImg} />
                <div style={s.itemInfo}>
                  <span style={s.itemCat}>{item.category}</span>
                  <h3 style={s.itemTitle}>{item.title}</h3>
                  <div style={s.itemPrice}>{item.price.toLocaleString()}đ</div>
                </div>
                <div style={s.itemControl}>
                  <div style={s.qtyRow}>
                    <button onClick={() => updateQty(item.id, -1)} style={s.qtyBtn}>-</button>
                    <span style={s.qtyVal}>{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={s.qtyBtn}>+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} style={s.removeBtn} className="remove-btn">
                    🗑️
                  </button>
                </div>
                <div style={s.itemSubtotal}>
                  {(item.price * item.quantity).toLocaleString()}đ
                </div>
              </div>
            ))}
          </div>

          {/* Right: Summary */}
          <div style={s.summaryCol}>
            <div style={s.summaryCard}>
              <h3 style={s.summaryTitle}>Tổng cộng</h3>
              <div style={s.sumRow}>
                <span>Tạm tính:</span>
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

              <button style={s.btnCheckout} className="btn-checkout">
                THANH TOÁN NGAY
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
    minHeight: "100vh",
    background: "#090b10",
    color: "#f1f5f9",
    paddingTop: 40,
    paddingBottom: 80,
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 20px",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 32,
    letterSpacing: "-0.5px",
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
    background: "#121620",
    border: "1px solid rgba(255,255,255,0.06)",
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
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "block",
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 700,
    margin: "0 0 4px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  itemPrice: {
    fontSize: 14,
    color: "#94a3b8",
  },
  itemControl: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    background: "#1e2433",
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
  },
  qtyVal: {
    width: 32,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 600,
  },
  removeBtn: {
    background: "transparent",
    border: "none",
    fontSize: 16,
    cursor: "pointer",
    opacity: 0.5,
    transition: "opacity 0.2s",
  },
  itemSubtotal: {
    width: 100,
    textAlign: "right",
    fontSize: 16,
    fontWeight: 700,
    color: "#f1f5f9",
  },

  /* Summary */
  summaryCol: {
    flex: 1,
    minWidth: 300,
  },
  summaryCard: {
    background: "#121620",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 24,
    position: "sticky",
    top: 100,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 800,
    marginBottom: 20,
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    paddingBottom: 12,
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
    background: "#090b10",
    border: "1px solid rgba(255,255,255,0.1)",
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
    textAlign: "center",
  },

  /* Empty State */
  emptyRoot: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    textAlign: "center",
    color: "#64748b",
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
  },
};

const css = `
  .cart-item:hover { transform: translateX(5px); border-color: rgba(239,68,68,0.3) !important; }
  .remove-btn:hover { opacity: 1 !important; color: #ef4444; }
  .btn-checkout:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 12px 30px rgba(239,68,68,0.4) !important; }
  .btn-checkout:active { transform: translateY(0); }
`;

export default CartPage;
