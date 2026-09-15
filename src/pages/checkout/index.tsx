import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../store/useCart";

const PRICE_PER_ITEM = 29000;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const [step, setStep] = useState<"info" | "payment" | "success">("info");
  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = items.reduce((acc, item) => acc + PRICE_PER_ITEM * item.quantity, 0);
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Vui lòng nhập họ tên";
    if (!form.phone.trim() || !/^[0-9]{9,11}$/.test(form.phone.trim())) e.phone = "Số điện thoại không hợp lệ";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email không hợp lệ";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirmInfo = () => {
    if (validate()) setStep("payment");
  };

  const handleConfirmPayment = () => {
    clearCart();
    setStep("success");
  };

  if (items.length === 0 && step !== "success") {
    return (
      <div style={s.emptyRoot}>
        <h2 style={{ color: "#f1f5f9", fontSize: 24, fontWeight: 800, marginBottom: 12 }}>
          Giỏ hàng trống
        </h2>
        <p style={{ color: "#64748b", marginBottom: 32 }}>Hãy thêm sản phẩm vào giỏ hàng trước!</p>
        <button onClick={() => navigate("/products")} style={s.btnPrimary} className="ck-btn-primary">
          Mua sắm ngay
        </button>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div style={s.emptyRoot}>
        <div className="success-bounce" style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
        <h2 style={{ color: "#22c55e", fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
          Đặt hàng thành công!
        </h2>
        <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 8 }}>
          Cảm ơn <span style={{ color: "#f1f5f9", fontWeight: 700 }}>{form.name}</span> đã mua hàng!
        </p>
        <p style={{ color: "#64748b", fontSize: 14, marginBottom: 32 }}>
          Chúng tôi sẽ liên hệ qua <span style={{ color: "#ef4444" }}>{form.phone}</span> để xác nhận đơn hàng.
        </p>
        <button onClick={() => navigate("/products")} style={s.btnPrimary} className="ck-btn-primary">
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  /* Checkout form */
  if (step !== "info" && step !== "payment") {
    return null;
  }

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* Header */}
      <div style={s.container}>
        <div style={s.header}>
          <button onClick={() => navigate("/cart")} style={s.backBtn} className="ck-back-btn">
            ← Quay lại giỏ hàng
          </button>
          <h1 style={s.pageTitle}>💳 Thanh toán</h1>
        </div>

        {/* Stepper */}
        <div style={s.stepper}>
          {["info", "payment"].map((st, i) => (
            <React.Fragment key={st}>
              <div style={s.stepItem}>
                <div
                  style={{
                    ...s.stepCircle,
                    background: step === st || (st === "info" && step === "payment")
                      ? "linear-gradient(135deg,#ef4444,#b91c1c)"
                      : "#1e2433",
                    boxShadow: step === st ? "0 0 16px rgba(239,68,68,0.5)" : "none",
                  }}
                >
                  {i === 0 ? "1" : "2"}
                </div>
                <span style={{ fontSize: 12, color: step === st ? "#ef4444" : "#64748b", marginTop: 4, fontWeight: 600 }}>
                  {i === 0 ? "Thông tin" : "Thanh toán"}
                </span>
              </div>
              {i === 0 && <div style={s.stepLine} />}
            </React.Fragment>
          ))}
        </div>

        <div style={s.layout}>
          {/* ── Left Col ── */}
          <div style={s.leftCol}>
            {step === "info" && (
              <div style={s.card} className="ck-card">
                <h2 style={s.cardTitle}>📋 Thông tin giao hàng</h2>

                {[
                  { key: "name", label: "Họ và tên *", placeholder: "Nguyễn Văn A", type: "text" },
                  { key: "phone", label: "Số điện thoại *", placeholder: "0912 345 678", type: "tel" },
                  { key: "email", label: "Email *", placeholder: "email@example.com", type: "email" },
                  { key: "note", label: "Ghi chú", placeholder: "Ghi chú cho đơn hàng (nếu có)...", type: "text" },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key} style={s.formGroup}>
                    <label style={s.label}>{label}</label>
                    {key === "note" ? (
                      <textarea
                        rows={3}
                        placeholder={placeholder}
                        value={(form as any)[key]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        style={{ ...s.input, resize: "none" as const, height: "auto" }}
                        className="ck-input"
                      />
                    ) : (
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={(form as any)[key]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        style={{
                          ...s.input,
                          borderColor: errors[key] ? "#ef4444" : "rgba(255,255,255,0.1)",
                        }}
                        className="ck-input"
                      />
                    )}
                    {errors[key] && <span style={s.errorText}>{errors[key]}</span>}
                  </div>
                ))}

                <button onClick={handleConfirmInfo} style={s.btnNext} className="ck-btn-next">
                  Tiếp tục thanh toán →
                </button>
              </div>
            )}

            {step === "payment" && (
              <div style={s.card} className="ck-card">
                <h2 style={s.cardTitle}>📱 Quét mã QR để thanh toán</h2>

                <div style={s.qrSection}>
                  {/* Bank info */}
                  <div style={s.bankInfo}>
                    <div style={s.bankBadge}>
                      <span style={{ color: "#ef4444", fontWeight: 800, fontSize: 16 }}>VIET</span>
                      <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>QR</span>
                      <span style={{ marginLeft: 8, color: "#1d4ed8", fontWeight: 800, fontSize: 16 }}>MB</span>
                    </div>
                    <p style={s.bankDesc}>
                      Mở ứng dụng <strong>MBBank</strong> hoặc bất kỳ ứng dụng ngân hàng nào hỗ trợ <strong>VietQR</strong> để quét mã
                    </p>
                  </div>

                  {/* QR Code */}
                  <div style={s.qrWrapper} className="qr-glow">
                    <img
                      src="/images/QR.jpg"
                      alt="Mã QR thanh toán VietQR MB Bank"
                      style={s.qrImg}
                      onError={(e) => {
                        // Fallback: show placeholder QR
                        (e.target as HTMLImageElement).style.display = "none";
                        const parent = (e.target as HTMLImageElement).parentElement!;
                        const placeholder = document.createElement("div");
                        placeholder.style.cssText = "width:220px;height:220px;display:flex;align-items:center;justify-content:center;background:#1e2433;border-radius:12px;color:#ef4444;font-size:48px;";
                        placeholder.textContent = "📱";
                        parent.appendChild(placeholder);
                      }}
                    />
                  </div>

                  {/* Amount badge */}
                  <div style={s.amountBadge}>
                    <span style={{ color: "#94a3b8", fontSize: 13 }}>Số tiền cần thanh toán</span>
                    <span style={{ color: "#ef4444", fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px" }}>
                      {total.toLocaleString("vi-VN")}đ
                    </span>
                  </div>

                  {/* Steps */}
                  <div style={s.instructionBox}>
                    <p style={s.instructionTitle}>📌 Hướng dẫn thanh toán</p>
                    {[
                      "Mở ứng dụng ngân hàng hỗ trợ VietQR (MB, Vietcombank, BIDV...)",
                      "Chọn chức năng Chuyển tiền / Quét mã QR",
                      `Nhập đúng số tiền: ${total.toLocaleString("vi-VN")}đ`,
                      "Nội dung chuyển khoản: GDT + Số điện thoại của bạn",
                      "Xác nhận và hoàn tất giao dịch",
                    ].map((step, i) => (
                      <div key={i} style={s.instructionItem}>
                        <div style={s.instructionNum}>{i + 1}</div>
                        <span style={{ fontSize: 13, color: "#94a3b8", flex: 1 }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={s.btnRow}>
                  <button onClick={() => setStep("info")} style={s.btnBack} className="ck-btn-back">
                    ← Quay lại
                  </button>
                  <button onClick={handleConfirmPayment} style={s.btnConfirm} className="ck-btn-confirm">
                    ✅ Xác nhận đã thanh toán
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Right Col: Order Summary ── */}
          <div style={s.rightCol}>
            <div style={s.summaryCard}>
              <h3 style={s.summaryTitle}>🧾 Đơn hàng của bạn</h3>

              <div style={s.itemList}>
                {items.map(item => (
                  <div key={item.id} style={s.orderItem}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={s.orderImg}
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://picsum.photos/48/68"; }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={s.orderTitle}>{item.title}</p>
                      <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>x{item.quantity}</p>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9", flexShrink: 0 }}>
                      {(PRICE_PER_ITEM * item.quantity).toLocaleString()}đ
                    </span>
                  </div>
                ))}
              </div>

              <div style={s.divider} />

              <div style={s.sumRow}>
                <span>Tạm tính</span>
                <span>{subtotal.toLocaleString()}đ</span>
              </div>
              <div style={s.sumRow}>
                <span>Phí vận chuyển</span>
                <span>{shipping.toLocaleString()}đ</span>
              </div>
              <div style={s.divider} />
              <div style={{ ...s.sumRow, fontSize: 18, fontWeight: 800, color: "#ef4444", marginBottom: 0 }}>
                <span>Tổng cộng</span>
                <span>{total.toLocaleString()}đ</span>
              </div>

              {/* Secure badges */}
              <div style={s.secureBadges}>
                <span style={s.badge}>🔒 Bảo mật SSL</span>
                <span style={s.badge}>🏦 VietQR</span>
                <span style={s.badge}>⚡ Napas 247</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Styles ── */
const s: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "#090b10",
    color: "#f1f5f9",
    paddingTop: 40,
    paddingBottom: 80,
    fontFamily: "'Inter', sans-serif",
  },
  container: { maxWidth: 1100, margin: "0 auto", padding: "0 20px" },
  header: { display: "flex", alignItems: "center", gap: 20, marginBottom: 32, flexWrap: "wrap" as const },
  backBtn: {
    background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
    color: "#94a3b8", borderRadius: 20, padding: "6px 16px", fontSize: 13,
    cursor: "pointer", transition: "all 0.2s",
  },
  pageTitle: { fontSize: 28, fontWeight: 800, margin: 0 },

  /* Stepper */
  stepper: { display: "flex", alignItems: "flex-start", justifyContent: "center", marginBottom: 40, gap: 0 },
  stepItem: { display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 4 },
  stepCircle: {
    width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center",
    justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#fff", transition: "all 0.3s",
  },
  stepLine: { width: 80, height: 2, background: "#d6e0e7", marginTop: 18, flex: 1 },

  layout: { display: "flex", gap: 32, flexWrap: "wrap" as const },
  leftCol: { flex: 2, minWidth: 320 },
  rightCol: { flex: 1, minWidth: 300 },

  card: {
    background: "#121620", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 20, padding: 28, marginBottom: 20,
  },
  cardTitle: { fontSize: 18, fontWeight: 800, marginBottom: 24, color: "#f1f5f9" },

  /* Form */
  formGroup: { marginBottom: 18 },
  label: { display: "block", fontSize: 13, color: "#52616d", fontWeight: 600, marginBottom: 6 },
  input: {
    width: "100%", background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10, padding: "10px 14px", color: "#f1f5f9", fontSize: 14,
    outline: "none", boxSizing: "border-box" as const, transition: "border-color 0.2s",
  },
  errorText: { color: "#ef4444", fontSize: 12, marginTop: 4, display: "block" },

  btnNext: {
    width: "100%", background: "linear-gradient(135deg,#ef4444,#b91c1c)",
    color: "#fff", border: "none", borderRadius: 12, padding: "14px",
    fontSize: 15, fontWeight: 800, cursor: "pointer", marginTop: 8,
    boxShadow: "0 8px 24px rgba(239,68,68,0.25)", transition: "all 0.2s",
  },

  /* QR Section */
  qrSection: { display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 20 },
  bankInfo: { textAlign: "center" as const },
  bankBadge: {
    display: "inline-flex", alignItems: "center", background: "#1e2433",
    borderRadius: 12, padding: "8px 20px", marginBottom: 12,
    border: "1px solid rgba(255,255,255,0.08)",
  },
  bankDesc: { fontSize: 13, color: "#64748b", lineHeight: 1.6, maxWidth: 320, margin: 0 },

  qrWrapper: {
    background: "#fff", padding: 16, borderRadius: 20,
    boxShadow: "0 0 0 1px rgba(255,255,255,0.1)",
  },
  qrImg: { width: 220, height: 220, display: "block", borderRadius: 8 },

  amountBadge: {
    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
    borderRadius: 16, padding: "16px 32px", textAlign: "center" as const,
    display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 4,
  },

  instructionBox: {
    width: "100%", background: "#f6f8fb", borderRadius: 14,
    padding: 20, border: "1px solid #e4e9ef",
  },
  instructionTitle: { color: "#16202a", fontWeight: 700, fontSize: 14, marginBottom: 12, margin: "0 0 12px" },
  instructionItem: { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 },
  instructionNum: {
    width: 22, height: 22, borderRadius: "50%", background: "rgba(239,68,68,0.15)",
    color: "#ef4444", fontSize: 11, fontWeight: 700, display: "flex",
    alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
  },

  btnRow: { display: "flex", gap: 12, marginTop: 24 },
  btnBack: {
    flex: 1, background: "#ffffff", border: "1px solid #d6e0e7",
    color: "#52616d", borderRadius: 12, padding: "12px",
    fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
  },
  btnConfirm: {
    flex: 2, background: "linear-gradient(135deg,#22c55e,#16a34a)",
    color: "#fff", border: "none", borderRadius: 12, padding: "12px",
    fontSize: 14, fontWeight: 800, cursor: "pointer",
    boxShadow: "0 8px 24px rgba(34,197,94,0.25)", transition: "all 0.2s",
  },

  /* Summary */
  summaryCard: {
    background: "#ffffff", border: "1px solid #e4e9ef",
    borderRadius: 20, padding: 24, position: "sticky" as const, top: 100,
  },
  summaryTitle: { fontSize: 18, fontWeight: 800, marginBottom: 20, color: "#16202a" },
  itemList: { display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 20 },
  orderItem: { display: "flex", alignItems: "center", gap: 12 },
  orderImg: { width: 48, height: 68, objectFit: "cover" as const, borderRadius: 6, flexShrink: 0 },
  orderTitle: { fontSize: 13, fontWeight: 600, color: "#16202a", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const },
  divider: { height: 1, background: "#e4e9ef", margin: "16px 0" },
  sumRow: { display: "flex", justifyContent: "space-between", fontSize: 14, color: "#52616d", marginBottom: 10 },
  secureBadges: { display: "flex", gap: 8, flexWrap: "wrap" as const, marginTop: 20 },
  badge: {
    fontSize: 11, fontWeight: 600, color: "#52616d", background: "#f0f4f7",
    borderRadius: 20, padding: "4px 10px", border: "1px solid #e4e9ef",
  },

  /* Empty */
  emptyRoot: {
    minHeight: "70vh", display: "flex", flexDirection: "column" as const,
    alignItems: "center", justifyContent: "center", padding: 40,
    textAlign: "center" as const, color: "#64748b", fontFamily: "'Inter', sans-serif",
  },
  btnPrimary: {
    background: "#ef4444", color: "#fff", border: "none", borderRadius: 30,
    padding: "12px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer",
    boxShadow: "0 10px 20px rgba(239,68,68,0.2)", transition: "all 0.2s",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  .ck-btn-next:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 12px 32px rgba(239,68,68,0.4) !important; }
  .ck-btn-confirm:hover { transform: translateY(-2px); filter: brightness(1.1); }
  .ck-btn-back:hover { border-color: rgba(255,255,255,0.3) !important; color: #f1f5f9 !important; }
  .ck-back-btn:hover { border-color: rgba(239,68,68,0.4) !important; color: #ef4444 !important; }
  .ck-btn-primary:hover { transform: translateY(-2px); filter: brightness(1.1); }
  .ck-card { transition: box-shadow 0.3s; }
  .ck-input:focus { border-color: #ef4444 !important; outline: none; box-shadow: 0 0 0 2px rgba(239,68,68,0.15); }
  .qr-glow { box-shadow: 0 0 40px rgba(239,68,68,0.15), 0 0 80px rgba(239,68,68,0.08); }
  .success-bounce { animation: bounce 0.8s ease; }
  @keyframes bounce {
    0%   { transform: scale(0.3); opacity: 0; }
    50%  { transform: scale(1.1); }
    70%  { transform: scale(0.95); }
    100% { transform: scale(1); opacity: 1; }
  }
`;

export default CheckoutPage;
