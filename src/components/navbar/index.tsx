import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Popover } from "antd";
import { useUserInfo } from "../../store/useUserInfo";
import { useCart } from "../../store/useCart";
import { UserOutlined, ShoppingCartOutlined, SearchOutlined, MenuOutlined } from "@ant-design/icons";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [navSelected, setNavSelected] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Zustand
  const { user, logout } = useUserInfo();
  const { totalItems } = useCart();
  const cartCount = totalItems();

  useEffect(() => {
    setNavSelected(location.pathname);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/manga-list?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear after search
    }
  };

  const content = (
    <div>
      <p className="font-bold text-center text-red-500 mb-2">
        {user?.name}
      </p>
      <hr />

      <div
        onClick={() => navigate("/history")}
        className="flex gap-2 m-1 cursor-pointer hover:text-red-500"
      >
        Lịch sử đọc
      </div>

      <div
        onClick={() => navigate("/profile")}
        className="flex gap-2 m-1 cursor-pointer hover:text-red-500"
      >
        Trang cá nhân
      </div>

      <div
        onClick={() => navigate("/admin")}
        className="flex gap-2 m-1 cursor-pointer hover:text-blue-500 text-blue-400 font-semibold"
      >
        ⚙️ Quản trị (Admin)
      </div>

      <hr />

      <button
        onClick={handleLogout}
        className="mt-3 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
      >
        Đăng xuất
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#e4e9ef] bg-white/90 text-[#16202a] shadow-[0_4px_20px_rgba(31,49,66,0.06)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-5 px-4 py-3 sm:px-6">

        {/* Logo */}
        <div
          className="flex cursor-pointer items-center gap-2 text-lg font-bold tracking-tight text-[#16202a] sm:text-xl"
          onClick={() => navigate("/")}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e05252] text-lg text-white shadow-md shadow-red-200">M</span>
          <span>Góc Đọc Truyện</span>
        </div>

        {/* Menu */}
        <nav className="hidden items-center gap-1 text-sm font-semibold lg:flex">
          <span
            onClick={() => navigate("/")}
            className={`cursor-pointer rounded-lg px-3 py-2 transition-colors ${navSelected === "/" ? "bg-[#fff0ed] text-[#c43d48]" : "text-[#66727f] hover:bg-[#f6f8fb] hover:text-[#c43d48]"
              }`}
          >
            Trang chủ
          </span>

          <span
            onClick={() => navigate("/products")}
            className={`cursor-pointer rounded-lg px-3 py-2 transition-colors ${navSelected.includes("products") || navSelected.includes("manga-list")
              ? "bg-[#fff0ed] text-[#c43d48]"
              : "text-[#66727f] hover:bg-[#f6f8fb] hover:text-[#c43d48]"
              }`}
          >
            Danh sách
          </span>

          <span
            onClick={() => navigate("/contact")}
            className="cursor-pointer rounded-lg px-3 py-2 text-[#66727f] transition-colors hover:bg-[#f6f8fb] hover:text-[#c43d48]"
          >
            Liên hệ
          </span>

          {/* <span
            onClick={() => navigate("/checkout")}
            className={`cursor-pointer flex items-center gap-1 px-3 py-1 rounded-full text-white font-semibold transition-all ${
              navSelected.includes("checkout")
                ? "bg-red-600 shadow-lg shadow-red-900/40"
                : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 shadow-md shadow-red-900/30 hover:shadow-red-900/50"
            }`}
          >
            <CreditCardOutlined className="text-sm" />
            Thanh Toán
          </span> */}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <div className="relative hidden w-[220px] items-center md:flex">
            <input
              type="text"
              placeholder="Tìm truyện..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-xl border border-[#e4e9ef] bg-[#f6f8fb] px-4 py-2 pr-9 text-sm outline-none transition-colors focus:border-[#e05252] focus:bg-white"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-3 text-[#8b98a5] transition-colors hover:text-[#e05252]"
            >
              <SearchOutlined />
            </button>
          </div>

          {/* User */}
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 text-[#66727f] hover:bg-[#f6f8fb] lg:hidden" aria-label="Mở menu"><MenuOutlined /></button>
            {user ? (
              <>
                {/* User */}
                <Popover content={content} trigger="click">
                  <button>
                    <UserOutlined className="text-lg text-[#66727f]" />
                  </button>
                </Popover>

                {/* Cart */}
                <button
                  onClick={() => navigate("/cart")}
                    className="relative rounded-lg p-2 text-[#66727f] transition hover:bg-[#f6f8fb] hover:text-[#e05252]"
                >
                  <ShoppingCartOutlined className="text-lg hover:text-red-500 transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-[#e05252] text-[10px] font-bold text-white">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/cart")}
                  className="relative rounded-lg p-2 text-[#66727f] transition hover:bg-[#f6f8fb] hover:text-[#e05252]"
                >
                  <ShoppingCartOutlined className="text-lg hover:text-red-500 transition-colors" />
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-xl bg-[#e05252] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-red-100 transition hover:bg-[#c43d48]"
                >
                  Đăng nhập
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;