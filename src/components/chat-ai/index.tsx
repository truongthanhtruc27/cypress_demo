import React, { useState, useRef, useEffect } from "react";
import {
  CloseOutlined,
  SendOutlined,
  CustomerServiceFilled,
  RobotOutlined
} from "@ant-design/icons";

interface IMessage {
  id: number;
  text: string;
  sender: "user" | "ai";
  time: string;
}

const ChatAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: 1,
      text: "Xin chào! Mình là Chatnox AI, trợ lý ảo của Góc Đọc Truyện. Mình có thể giúp gì cho bạn?",
      sender: "ai",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // ✅ CALL API THẬT (POSTMAN BACKEND)
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: IMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: input
        })
      });

      const data = await res.json();

      const aiMsg: IMessage = {
        id: Date.now() + 1,
        text: data.reply || "Bot không phản hồi 😢",
        sender: "ai",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);

    } catch (err) {
      const aiMsg: IMessage = {
        id: Date.now() + 1,
        text: "Lỗi kết nối server 😢",
        sender: "ai",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    }

    setIsTyping(false);
  };

  return (
    <>
      <style>{css}</style>

      {/* FLOAT BUTTON */}
      <div
        style={s.floatBtn}
        className={`chat-float-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseOutlined /> : <CustomerServiceFilled />}
      </div>

      {/* CHAT WINDOW */}
      <div style={{ ...s.window, display: isOpen ? 'flex' : 'none' }} className="chat-window">
        {/* Header */}
        <div style={s.header}>
          <div style={s.headerInfo}>
            <div style={s.avatar}>
              <RobotOutlined />
              <div style={s.onlineBadge} />
            </div>
            <div>
              <div style={s.headerTitle}>Chatnox AI</div>
              <div style={s.headerStatus}>Trực tuyến</div>
            </div>
          </div>
          <CloseOutlined onClick={() => setIsOpen(false)} style={{ cursor: 'pointer', opacity: 0.7 }} />
        </div>

        {/* Body */}
        <div style={s.body} ref={scrollRef}>
          {messages.map(m => (
            <div key={m.id} style={{ ...s.msgRow, justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ ...s.bubble, ...(m.sender === 'user' ? s.userBubble : s.aiBubble) }}>
                {m.text}
                <div style={s.time}>{m.time}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={s.msgRow}>
              <div style={{ ...s.bubble, ...s.aiBubble }}>
                <div className="typing-dots">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={s.footer}>
          <input
            style={s.input}
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button style={s.sendBtn} onClick={handleSend}>
            <SendOutlined />
          </button>
        </div>
      </div>
    </>
  );
};

/* STYLE */
const s: Record<string, React.CSSProperties> = {
  floatBtn: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #e05252, #b93642)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    cursor: 'pointer',
    boxShadow: '0 8px 32px rgba(239, 68, 68, 0.4)',
    zIndex: 9999,
  },
  window: {
    position: 'fixed',
    bottom: 100,
    right: 24,
    width: 380,
    height: 520,
    background: '#ffffff',
    borderRadius: 24,
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    zIndex: 9998,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#16202a',
    background: '#16202a'
  },
  headerInfo: { display: 'flex', alignItems: 'center', gap: 10 },
  avatar: { width: 40, height: 40, background: '#ef4444', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  onlineBadge: { width: 10, height: 10, background: 'green', borderRadius: '50%', position: 'absolute' },
  headerTitle: { fontWeight: 'bold' },
  headerStatus: { fontSize: 12 },
  body: { flex: 1, padding: 16, overflowY: 'auto' },
  msgRow: { display: 'flex', marginBottom: 10 },
  bubble: { padding: 10, borderRadius: 10, maxWidth: '70%' },
  aiBubble: { background: '#f0f4f7', color: '#263440' },
  userBubble: { background: '#e05252', color: '#fff' },
  time: { fontSize: 10, opacity: 0.6 },
  footer: { display: 'flex', padding: 12, gap: 8, borderTop: '1px solid #e4e9ef' },
  input: { flex: 1, padding: 10, border: '1px solid #e4e9ef', borderRadius: 10, outline: 'none' },
  sendBtn: { width: 40, border: 0, borderRadius: 10, background: '#e05252', color: '#fff' }
};

const css = ``;

export default ChatAI;