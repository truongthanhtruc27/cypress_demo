import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-[#e4e9ef] bg-white text-[#66727f]">

      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-3">

        {/* LOGO + DESC */}
        <div>
          <h2 className="mb-3 font-['Space_Grotesk'] text-xl font-bold text-[#16202a]">
            Góc Đọc Truyện
          </h2>
          <p className="text-sm leading-relaxed">
            Website đọc truyện online miễn phí. Cập nhật nhanh các bộ truyện hot,
            giao diện mượt mà, trải nghiệm tốt trên mọi thiết bị.
          </p>
        </div>

      
        <div>
          <h3 className="mb-3 font-semibold text-[#16202a]">
            Điều hướng
          </h3>

          <ul className="space-y-2 text-sm">
            <li onClick={() => navigate("/")} className="cursor-pointer transition hover:text-[#e05252]">
              Trang chủ
            </li>
            <li onClick={() => navigate("/products")} className="cursor-pointer transition hover:text-[#e05252]">
              Danh sách truyện
            </li>
            <li onClick={() => navigate("/products")} className="cursor-pointer transition hover:text-[#e05252]">
              Thể loại
            </li>
            <li onClick={() => navigate("/contact")} className="cursor-pointer transition hover:text-[#e05252]">
              Liên hệ
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="mb-3 font-semibold text-[#16202a]">
            Kết nối
          </h3>

          <div className="flex flex-wrap gap-3">
            <span className="cursor-pointer rounded-lg border border-[#e4e9ef] bg-[#f6f8fb] px-3 py-2 transition hover:border-[#e05252] hover:text-[#e05252]">
              Facebook
            </span>
            <span className="cursor-pointer rounded-lg border border-[#e4e9ef] bg-[#f6f8fb] px-3 py-2 transition hover:border-[#e05252] hover:text-[#e05252]">
              YouTube
            </span>
            <span className="cursor-pointer rounded-lg border border-[#e4e9ef] bg-[#f6f8fb] px-3 py-2 transition hover:border-[#e05252] hover:text-[#e05252]">
              TikTok
            </span>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-[#e4e9ef] py-4 text-center text-sm text-[#8b98a5]">
        © 2026 MangaWeb. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;