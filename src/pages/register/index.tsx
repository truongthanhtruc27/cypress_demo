import { Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e?: any) => {
    if (e) e.preventDefault();

    // ✅ Validate
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/manga/register", // ✅ FIX URL
        {
          username,
          email,
          password,
        }
      );

      // ✅ Lưu luôn nếu backend trả token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      toast.success(res.data.message || "Đăng ký thành công!");

      // 👉 Có thể chuyển về home hoặc login
      navigate("/login");
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-black via-gray-900 to-indigo-900">

      <div className="w-full max-w-md p-8 rounded-2xl
                      bg-black/60 backdrop-blur-xl
                      border border-indigo-500/30
                      shadow-[0_0_40px_rgba(99,102,241,0.5)]">

        <h2 className="text-4xl text-center mb-8 font-bold
                       text-transparent bg-clip-text
                       bg-gradient-to-r from-indigo-400 to-purple-500 tracking-widest">
          ✦ REGISTER ✦
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="text-gray-300 text-sm">Tên đăng nhập</label>
          <div className="mb-4 mt-1">
            <Input
              placeholder="Nhập tên..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="!bg-black/40 !text-white !border-indigo-400/30 !p-3"
            />
          </div>

          <label className="text-gray-300 text-sm">Email</label>
          <div className="mb-4 mt-1">
            <Input
              placeholder="Nhập email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!bg-black/40 !text-white !border-indigo-400/30 !p-3"
            />
          </div>

          <label className="text-gray-300 text-sm">Mật khẩu</label>
          <div className="mb-4 mt-1">
            <Input.Password
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!bg-black/40 !text-white !border-indigo-400/30 !p-3"
            />
          </div>

          <label className="text-gray-300 text-sm">Xác nhận mật khẩu</label>
          <div className="mb-6 mt-1">
            <Input.Password
              placeholder="Nhập lại mật khẩu..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="!bg-black/40 !text-white !border-indigo-400/30 !p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-lg font-bold
                       bg-gradient-to-r from-indigo-500 to-purple-600
                       hover:from-purple-600 hover:to-indigo-500
                       text-white shadow-lg transition duration-300
                       hover:scale-[1.03] disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <div className="border-b border-indigo-400/30 mt-6"></div>

        <div className="text-center mt-6 text-sm text-indigo-300">
          Đã có tài khoản?{" "}
          <a href="/login" className="hover:underline">
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;