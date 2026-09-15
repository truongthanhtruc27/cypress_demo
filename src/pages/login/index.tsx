import { Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserInfo } from "../../store/useUserInfo";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useUserInfo();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Vui lòng nhập đầy đủ thông tin!");
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post("/api/manga/login", { username, password });
      if (!res.data?.token || !res.data?.user) throw new Error("Invalid login response");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUserInfo(res.data.user);
        toast.success("Đăng nhập thành công!");
        navigate("/");
    } catch {
      setMessage("Sai tài khoản hoặc mật khẩu!");
      toast.error("Sai tài khoản hoặc mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb] px-4 py-10">

      <div className="w-full max-w-md rounded-3xl border border-[#e4e9ef] bg-white p-8 shadow-[0_22px_60px_rgba(31,49,66,0.12)] sm:p-10">

        <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#e05252]">Chào mừng trở lại</p>
        <h2 className="mb-8 text-center font-['Space_Grotesk'] text-3xl font-bold text-[#16202a]">
          Góc Đọc Truyện
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="text-sm font-semibold text-[#52616d]">Tên đăng nhập</label>
          <div className="mb-6 mt-1">
            <Input
              placeholder="Nhập tên..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="!rounded-xl !border-[#d6e0e7] !bg-[#f6f8fb] !p-3 !text-[#16202a] focus:!border-[#e05252]"
            />
          </div>

          <label className="text-sm font-semibold text-[#52616d]">Mật khẩu</label>
          <div className="mb-8 mt-1">
            <Input.Password
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!rounded-xl !border-[#d6e0e7] !bg-[#f6f8fb] !p-3 !text-[#16202a] focus:!border-[#e05252]"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded-lg font-bold
                       bg-[#e05252] hover:bg-[#c43d48] text-white shadow-lg shadow-red-100 transition duration-300
                       hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          {message && (
            <div role="alert" className="mt-3 text-center text-sm font-semibold text-[#e05252]">
              {message}
            </div>
          )}
        </form>

        <div className="border-b border-indigo-400/30 mt-6"></div>

        <div className="mt-6 flex justify-between text-sm text-[#e05252]">
          <Link to="/register" className="hover:underline">
            Đăng ký
          </Link>
          <Link to="/forgot-password" className="hover:underline">
            Quên mật khẩu?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;