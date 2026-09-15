import { Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Validate
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email không hợp lệ!");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "/api/manga/register",
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
    <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb] px-4 py-10">

      <div className="w-full max-w-md rounded-3xl border border-[#e4e9ef] bg-white p-8 shadow-[0_22px_60px_rgba(31,49,66,0.12)] sm:p-10">

        <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#168f91]">Tạo tài khoản mới</p>
        <h2 className="mb-8 text-center font-['Space_Grotesk'] text-3xl font-bold text-[#16202a]">
          Góc Đọc Truyện
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="text-sm font-semibold text-[#52616d]">Tên đăng nhập</label>
          <div className="mb-4 mt-1">
            <Input
              placeholder="Nhập tên..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="!rounded-xl !border-[#d6e0e7] !bg-[#f6f8fb] !p-3 !text-[#16202a]"
            />
          </div>

          <label className="text-sm font-semibold text-[#52616d]">Email</label>
          <div className="mb-4 mt-1">
            <Input
              placeholder="Nhập email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!rounded-xl !border-[#d6e0e7] !bg-[#f6f8fb] !p-3 !text-[#16202a]"
            />
          </div>

          <label className="text-sm font-semibold text-[#52616d]">Mật khẩu</label>
          <div className="mb-4 mt-1">
            <Input.Password
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!rounded-xl !border-[#d6e0e7] !bg-[#f6f8fb] !p-3 !text-[#16202a]"
            />
          </div>

          <label className="text-sm font-semibold text-[#52616d]">Xác nhận mật khẩu</label>
          <div className="mb-6 mt-1">
            <Input.Password
              placeholder="Nhập lại mật khẩu..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="!rounded-xl !border-[#d6e0e7] !bg-[#f6f8fb] !p-3 !text-[#16202a]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-lg font-bold
                       bg-[#168f91] hover:bg-[#0f7375] text-white shadow-lg shadow-teal-100 transition duration-300
                       hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <div className="border-b border-indigo-400/30 mt-6"></div>

        <div className="mt-6 text-center text-sm text-[#52616d]">
          Đã có tài khoản?{" "}
          <Link to="/login" className="font-semibold text-[#e05252] hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;