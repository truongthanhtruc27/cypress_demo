import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div style={s.root}>
      <style>{css}</style>
      <div style={s.container}>

        {/* Header Section */}
        <div style={s.header}>
          <h1 style={s.pageTitle}>📬 Liên hệ với chúng tôi</h1>
          <p style={s.pageDesc}>
            Bạn có câu hỏi, góp ý hay muốn hợp tác? Hãy để lại lời nhắn,
            đội ngũ <strong style={{ color: "#ef4444" }}>Góc Đọc Truyện</strong> sẽ phản hồi bạn sớm nhất!
          </p>
        </div>

        <div style={s.layout}>

          {/* Left: Info & Form */}
          <div style={s.leftCol}>

            {/* Info Cards */}
            <div style={s.infoGrid}>
              <div style={s.infoCard} className="info-card">
                <div style={{ ...s.iconWrap, background: "rgba(59,130,246,0.15)", color: "#3b82f6" }}>📞</div>
                <div>
                  <div style={s.infoLabel}>Điện thoại</div>
                  <div style={s.infoVal}>012.345.6789</div>
                </div>
              </div>
              <div style={s.infoCard} className="info-card">
                <div style={{ ...s.iconWrap, background: "rgba(236,72,153,0.15)", color: "#ec4899" }}>✉️</div>
                <div>
                  <div style={s.infoLabel}>Email</div>
                  <div style={s.infoVal}>admin@gmail.com</div>
                </div>
              </div>
            </div>

            <div style={s.infoCardFull} className="info-card">
              <div style={{ ...s.iconWrap, background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>📍</div>
              <div>
                <div style={s.infoLabel}>Địa chỉ</div>
                <div style={s.infoVal}>Tòa nhà FPT Polytechnic, P. Trịnh Văn Bô, Nam Từ Liêm, Hà Nội</div>
              </div>
            </div>

            {/* Form */}
            <div style={s.formWrap}>
              <h3 style={s.formTitle}>Gửi tin nhắn cho chúng tôi</h3>
              <form onSubmit={handleSubmit} style={s.form}>
                <div style={s.formRow}>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Họ Tên *</label>
                    <input
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nhập họ tên..."
                      style={s.input}
                      className="contact-input"
                    />
                  </div>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Email *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="admin@gmail.com"
                      style={s.input}
                      className="contact-input"
                    />
                  </div>
                </div>

                <div style={s.inputGroup}>
                  <label style={s.label}>Góp ý / Nội dung *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Bạn muốn nhắn nhủ điều gì..."
                    style={{ ...s.input, height: 120, resize: "none" }}
                    className="contact-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status !== "idle"}
                  style={{
                    ...s.btnSubmit,
                    background: status === "success" ? "#22c55e" : s.btnSubmit.background
                  }}
                  className="btn-send"
                >
                  {status === "idle" && "Gửi ngay 🚀"}
                  {status === "sending" && "Đang gửi..."}
                  {status === "success" && "Đã gửi thành công! ✓"}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Map */}
          <div style={s.rightCol}>
            <div style={s.mapCard}>
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.863981044334!2d105.7445984153319!3d21.037600592834724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x536c053158220993!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1672322525145!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 20 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
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
    paddingTop: 60,
    paddingBottom: 80,
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    maxWidth: 1140,
    margin: "0 auto",
    padding: "0 24px",
  },
  header: {
    textAlign: "center",
    marginBottom: 50,
  },
  pageTitle: {
    fontSize: "clamp(28px, 5vw, 40px)",
    fontWeight: 900,
    marginBottom: 16,
    letterSpacing: "-1px",
    background: "linear-gradient(to right, #fff, #94a3b8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  pageDesc: {
    fontSize: 16,
    color: "#94a3b8",
    maxWidth: 600,
    margin: "0 auto",
    lineHeight: 1.6,
  },
  layout: {
    display: "flex",
    gap: 32,
    flexWrap: "wrap",
  },
  leftCol: {
    flex: 1.2,
    minWidth: 320,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  rightCol: {
    flex: 1,
    minWidth: 320,
  },

  /* Info Cards */
  infoGrid: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },
  infoCard: {
    flex: 1,
    minWidth: 200,
    background: "#121620",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    transition: "all 0.3s ease",
  },
  infoCardFull: {
    background: "#121620",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    transition: "all 0.3s ease",
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    flexShrink: 0,
  },
  infoLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 4,
    fontWeight: 600,
  },
  infoVal: {
    fontSize: 14,
    fontWeight: 700,
    color: "#f1f5f9",
  },

  /* Form */
  formWrap: {
    background: "#121620",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 24,
    padding: "32px",
    marginTop: 16,
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 24,
    color: "#f1f5f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  formRow: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
  },
  inputGroup: {
    flex: 1,
    minWidth: 200,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#94a3b8",
  },
  input: {
    background: "#090b10",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: "12px 16px",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    transition: "all 0.2s ease",
  },
  btnSubmit: {
    background: "linear-gradient(135deg, #ef4444, #b91c1c)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "16px",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(239,68,68,0.3)",
    transition: "all 0.3s ease",
    marginTop: 10,
  },

  /* Map */
  mapCard: {
    height: "100%",
    minHeight: 450,
    background: "#121620",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: "8px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  },
};

const css = `
  .info-card:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.15) !important; background: #161c2b !important; }
  .contact-input:focus { border-color: #ef4444 !important; box-shadow: 0 0 0 4px rgba(239,68,68,0.1); }
  .btn-send:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 15px 40px rgba(239,68,68,0.5) !important; }
  .btn-send:active { transform: translateY(0); }
  @media (max-width: 768px) {
    .form-row { flex-direction: column; gap: 20px; }
  }
`;

export default ContactPage;