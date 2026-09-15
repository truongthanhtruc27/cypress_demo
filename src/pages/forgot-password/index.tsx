import { Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<"email" | "reset">("email");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (step === "email") {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
          toast.error("Vui lòng nhập email hợp lệ!");
          return;
        }
        const res = await axios.post("/api/manga/forgot-password", { email });
        toast.success(res.data?.message || "Mã xác nhận đã được gửi!");
        setStep("reset");
      } else {
        if (!/^\d{6}$/.test(code)) {
          toast.error("Mã xác nhận phải gồm 6 chữ số!");
          return;
        }
        if (newPassword.length < 6) {
          toast.error("Mật khẩu mới cần ít nhất 6 ký tự!");
          return;
        }
        if (newPassword !== confirmPassword) {
          toast.error("Mật khẩu xác nhận không khớp!");
          return;
        }
        await axios.post("/api/manga/reset-password", { email, code, password: newPassword });
        toast.success("Đổi mật khẩu thành công!");
        navigate("/login");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb] px-4 py-10">

      <div className="w-full max-w-md rounded-3xl border border-[#e4e9ef] bg-white p-8 shadow-[0_22px_60px_rgba(31,49,66,0.12)] sm:p-10">

        <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#e05252]">Khôi phục tài khoản</p>
        <h2 className="mb-4 text-center font-['Space_Grotesk'] text-3xl font-bold text-[#16202a]">
          Góc Đọc Truyện
        </h2>
        
        <p className="mb-8 text-center text-sm text-[#66727f]">
          {step === "email" ? "Nhập email để nhận mã xác nhận khôi phục." : "Nhập mã 6 số và tạo mật khẩu mới."}
        </p>

        <form onSubmit={handleSubmit}>
          <label className="text-sm font-semibold text-[#52616d]">Email</label>
          <div className="mb-8 mt-1">
            <Input
              placeholder="Nhập email đã đăng ký..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={step === "reset"}
              className="!rounded-xl !border-[#d6e0e7] !bg-[#f6f8fb] !p-3 !text-[#16202a] focus:!border-[#e05252]"
            />
          </div>

          {step === "reset" && (
            <>
              <label className="text-sm font-semibold text-[#52616d]">Mã xác nhận</label>
              <div className="mb-4 mt-1">
                <Input value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="Nhập mã 6 số" maxLength={6} className="!rounded-xl !border-[#d6e0e7] !bg-[#f6f8fb] !p-3 !text-[#16202a]" />
              </div>
              <label className="text-sm font-semibold text-[#52616d]">Mật khẩu mới</label>
              <div className="mb-4 mt-1">
                <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Ít nhất 6 ký tự" className="!rounded-xl !border-[#d6e0e7] !bg-[#f6f8fb] !p-3 !text-[#16202a]" />
              </div>
              <label className="text-sm font-semibold text-[#52616d]">Xác nhận mật khẩu mới</label>
              <div className="mb-8 mt-1">
                <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu mới" className="!rounded-xl !border-[#d6e0e7] !bg-[#f6f8fb] !p-3 !text-[#16202a]" />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-lg font-bold
                       bg-[#e05252] hover:bg-[#c43d48] text-white shadow-lg shadow-red-100 transition duration-300
                       hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Đang xử lý..." : step === "email" ? "Gửi mã xác nhận" : "Đổi mật khẩu"}
          </button>
        </form>

        <div className="border-b border-indigo-400/30 mt-6"></div>

        <div className="mt-6 text-center text-sm text-[#e05252]">
          <Link to="/login" className="hover:underline">
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
