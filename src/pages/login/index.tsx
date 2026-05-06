import { Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserInfo } from "../../store/useUserInfo";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useUserInfo();

  const handleSubmit = (e?: any) => {
    if (e) e.preventDefault();

    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    axios
      .post("http://localhost:5000/api/manga/login", { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUserInfo(res.data.user);
        toast.success("Đăng nhập thành công!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Sai tài khoản hoặc mật khẩu!");
      });
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
          ✦ LAPSHOP ✦
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="text-gray-300 text-sm">Tên đăng nhập</label>
          <div className="mb-6 mt-1">
            <Input
              placeholder="Nhập tên..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="!bg-black/40 !text-white !border-indigo-400/30
                         !rounded-lg !p-3 focus:!border-indigo-500"
            />
          </div>

          <label className="text-gray-300 text-sm">Mật khẩu</label>
          <div className="mb-8 mt-1">
            <Input.Password
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!bg-black/40 !text-white !border-indigo-400/30
                         !rounded-lg !p-3 focus:!border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded-lg font-bold
                       bg-gradient-to-r from-indigo-500 to-purple-600
                       hover:from-purple-600 hover:to-indigo-500
                       text-white shadow-lg transition duration-300
                       hover:scale-[1.03]"
          >
            Đăng nhập
          </button>
        </form>

        <div className="border-b border-indigo-400/30 mt-6"></div>

        <div className="flex justify-between mt-6 text-sm text-indigo-300">
          <a href="/register" className="hover:underline">
            Đăng ký
          </a>
          <a href="/forgot-password" className="hover:underline">
            Quên mật khẩu?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;