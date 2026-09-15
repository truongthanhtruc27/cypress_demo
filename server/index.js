require("dotenv").config();

const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT || 5000);
const JWT_SECRET = process.env.JWT_SECRET || "goc-doc-truyen-development-secret";
const DATA_FILE = path.join(__dirname, "data.json");

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

const fallbackMangas = [
  { id: 1, title: "Solo Leveling", image: "/images/Tranh1/Chuong1/1.jpg", chapter: "Chương 10", rating: 4.9, category: "ACTION", author: "Chugong", status: "completed", views: 125000, description: "Một thợ săn yếu nhất bước vào hành trình vượt qua giới hạn của chính mình.", isHot: true },
  { id: 2, title: "Thám tử Conan", image: "/images/Conan/Chuong1/1.jpg", chapter: "Chương 5", rating: 4.8, category: "HORROR", author: "Gosho Aoyama", status: "ongoing", views: 98000, description: "Những vụ án bí ẩn và cuộc truy tìm sự thật không ngừng nghỉ.", isNew: true },
  { id: 3, title: "One Punch Man", image: "/images/OnepunchMan/Chuong1/1.jpeg", chapter: "Chương 10", rating: 4.7, category: "COMEDY", author: "ONE", status: "ongoing", views: 210000, description: "Một cú đấm đủ mạnh để kết thúc mọi trận chiến, nhưng không đủ để hết buồn chán.", isHot: true },
  { id: 4, title: "Vua Hải Tặc", image: "/images/VuaHaiTac/Chuong1/1.jpg", chapter: "Chương 10", rating: 4.9, category: "ADVENTURE", author: "Eiichiro Oda", status: "ongoing", views: 500000, description: "Hành trình vượt đại dương để tìm kho báu huyền thoại.", isHot: true },
  { id: 5, title: "Doraemon", image: "/images/Doraemon/1.jpg", chapter: "Chương 8", rating: 4.6, category: "SLICE", author: "Fujiko F. Fujio", status: "completed", views: 76000, description: "Những chuyến phiêu lưu đời thường đầy bất ngờ của Nobita và Doraemon.", isNew: true },
  { id: 6, title: "Kyochuu Rettou", image: "/images/KyochuuRettou/1.jpg", chapter: "Chương 10", rating: 4.5, category: "HORROR", author: "Yasutaka Fujimi", status: "ongoing", views: 53000, description: "Sinh tồn giữa hòn đảo nơi những sinh vật khổng lồ thống trị.", isNew: true }
];

function readData() {
  if (!fs.existsSync(DATA_FILE)) return { users: [], mangas: fallbackMangas };
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    return { users: Array.isArray(data.users) ? data.users : [], mangas: Array.isArray(data.mangas) && data.mangas.length ? data.mangas : fallbackMangas };
  } catch { return { users: [], mangas: fallbackMangas }; }
}
function writeData(data) { fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); }
function tokenFor(user) { return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "7d" }); }
function publicUser(user) { return { id: user.id, username: user.username, name: user.name, email: user.email, role: user.role }; }

const resetCodes = new Map();
const mailer = process.env.SMTP_HOST ? nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === "true", auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } }) : null;

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "goc-doc-truyen-api" }));

app.get("/api/manga", (req, res) => {
  const data = readData();
  const query = String(req.query.q || "").toLowerCase();
  const mangas = (data.mangas || fallbackMangas).filter(m => !query || m.title.toLowerCase().includes(query) || String(m.author || "").toLowerCase().includes(query));
  res.json({ data: mangas });
});

app.get("/api/manga/home_type_products", (_req, res) => {
  const mangas = readData().mangas || fallbackMangas;
  const grouped = { hot: mangas.filter(m => m.isHot), action: mangas.filter(m => m.category === "ACTION"), adventure: mangas.filter(m => m.category === "ADVENTURE"), fantasy: mangas.filter(m => m.category === "FANTASY") };
  res.json(grouped);
});

app.get("/api/manga/:id", (req, res) => {
  const manga = (readData().mangas || fallbackMangas).find(m => m.id === Number(req.params.id));
  if (!manga) return res.status(404).json({ message: "Không tìm thấy truyện" });
  res.json(manga);
});

app.get("/api/manga/:id/chapters", (req, res) => {
  const manga = (readData().mangas || fallbackMangas).find(m => m.id === Number(req.params.id));
  if (!manga) return res.status(404).json({ message: "Không tìm thấy truyện" });
  const total = Math.max(1, Number(manga.chapter.match(/\d+/)?.[0] || 1));
  res.json(Array.from({ length: total }, (_, i) => ({ id: i + 1, title: `Chương ${i + 1}`, createdAt: new Date().toISOString() })));
});

app.get("/api/manga/:id/chapter/:chapter", (req, res) => {
  const id = Number(req.params.id); const chapter = Number(req.params.chapter);
  const config = { 1: ["Tranh1", "jpg", 10], 2: ["Conan", "jpg", 5], 3: ["OnepunchMan", "jpeg", 10], 4: ["VuaHaiTac", "jpg", 10], 5: ["Doraemon", "jpg", 8], 6: ["KyochuuRettou", "jpg", 10] }[id] || ["Tranh1", "jpg", 10];
  const folder = [1, 2, 3, 4].includes(id) ? `${config[0]}/Chuong${chapter === 2 ? 2 : 1}` : config[0];
  const pages = Array.from({ length: config[2] }, (_, i) => `/images/${folder}/${i + 1}.${config[1]}`);
  res.json({ chapter: { id: chapter, title: `Chương ${chapter}`, pages } });
});

app.post("/api/manga/register", async (req, res) => {
  const { username, email, password } = req.body || {};
  if (!username || !email || !password) return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  const data = readData();
  if (data.users.some(u => u.username === username || u.email === email)) return res.status(409).json({ message: "Tên đăng nhập hoặc email đã tồn tại" });
  const user = { id: Date.now(), username, name: username, email, password: await bcrypt.hash(password, 10), role: "user" };
  data.users.push(user); writeData(data);
  res.status(201).json({ message: "Đăng ký thành công", user: publicUser(user), token: tokenFor(user) });
});

app.post("/api/manga/login", async (req, res) => {
  const { username, password } = req.body || {}; const user = readData().users.find(u => u.username === username || u.email === username);
  if (!user || !(await bcrypt.compare(password || "", user.password))) return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  res.json({ user: publicUser(user), token: tokenFor(user) });
});

app.post("/api/manga/forgot-password", async (req, res) => {
  const email = String(req.body?.email || "").toLowerCase(); const user = readData().users.find(u => u.email.toLowerCase() === email);
  if (!user) return res.status(404).json({ message: "Email không tồn tại trong hệ thống" });
  const code = crypto.randomInt(100000, 1000000).toString(); resetCodes.set(email, { code, expiresAt: Date.now() + 10 * 60 * 1000 });
  const message = `Mã khôi phục Góc Đọc Truyện của bạn là: ${code}. Mã có hiệu lực trong 10 phút.`;
  if (mailer) await mailer.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to: email, subject: "Mã khôi phục mật khẩu", text: message });
  else if (process.env.NODE_ENV !== "production") console.log(`[DEV] Password reset code for ${email}: ${code}`);
  res.json({ message: "Mã khôi phục đã được gửi đến email của bạn" });
});

app.post("/api/manga/verify-reset-code", (req, res) => {
  const email = String(req.body?.email || "").toLowerCase(); const entry = resetCodes.get(email);
  if (!entry || entry.expiresAt < Date.now() || entry.code !== String(req.body?.code || "")) return res.status(400).json({ message: "Mã xác nhận không đúng hoặc đã hết hạn" });
  res.json({ verified: true });
});

app.post("/api/manga/reset-password", async (req, res) => {
  const email = String(req.body?.email || "").toLowerCase(); const entry = resetCodes.get(email);
  if (!entry || entry.expiresAt < Date.now() || entry.code !== String(req.body?.code || "")) return res.status(400).json({ message: "Mã xác nhận không đúng hoặc đã hết hạn" });
  if (!req.body.password || req.body.password.length < 6) return res.status(400).json({ message: "Mật khẩu mới cần ít nhất 6 ký tự" });
  const data = readData(); const user = data.users.find(u => u.email.toLowerCase() === email);
  if (!user) return res.status(404).json({ message: "Không tìm thấy tài khoản" });
  user.password = await bcrypt.hash(req.body.password, 10); writeData(data); resetCodes.delete(email);
  res.json({ message: "Đổi mật khẩu thành công" });
});

app.post("/api/chat", (req, res) => res.json({ reply: `Mình đã nhận được câu hỏi: ${String(req.body?.message || "").trim() || "Bạn muốn tìm truyện nào?"}` }));

app.listen(PORT, () => console.log(`Góc Đọc Truyện API đang chạy tại http://localhost:${PORT}`));
