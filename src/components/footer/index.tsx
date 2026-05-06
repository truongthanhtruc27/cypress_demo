const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 border-t border-white/5">

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {/* LOGO + DESC */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            📚 MangaWeb
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Website đọc truyện online miễn phí. Cập nhật nhanh các bộ truyện hot,
            giao diện mượt mà, trải nghiệm tốt trên mọi thiết bị.
          </p>
        </div>

        {/* MENU */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Điều hướng
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-400 cursor-pointer transition">
              Trang chủ
            </li>
            <li className="hover:text-red-400 cursor-pointer transition">
              Danh sách truyện
            </li>
            <li className="hover:text-red-400 cursor-pointer transition">
              Thể loại
            </li>
            <li className="hover:text-red-400 cursor-pointer transition">
              Liên hệ
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Kết nối
          </h3>

          <div className="flex flex-wrap gap-3">
            <span className="bg-[#1f2937] px-3 py-2 rounded hover:bg-red-500 transition cursor-pointer">
              Facebook
            </span>
            <span className="bg-[#1f2937] px-3 py-2 rounded hover:bg-red-500 transition cursor-pointer">
              YouTube
            </span>
            <span className="bg-[#1f2937] px-3 py-2 rounded hover:bg-red-500 transition cursor-pointer">
              TikTok
            </span>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-sm text-gray-500 border-t border-white/5 py-4">
        © 2026 MangaWeb. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;