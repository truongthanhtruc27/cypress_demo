import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Popover } from "antd";
import { useUserInfo } from "../../store/useUserInfo";
import { UserOutlined, BookOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [navSelected, setNavSelected] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Zustand
  const { user, logout } = useUserInfo();

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
    <div className="w-full bg-slate-800 text-gray-100 shadow">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <div
          className="text-xl font-bold text-red-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Góc Đọc Truyện
        </div>

        {/* Menu */}
        <div className="flex gap-6 text-sm">
          <span
            onClick={() => navigate("/")}
            className={`cursor-pointer ${navSelected === "/" ? "text-red-500" : "hover:text-red-500"
              }`}
          >
            Trang chủ
          </span>

          <span
            onClick={() => navigate("/products")}
            className={`cursor-pointer ${navSelected.includes("products")
                ? "text-red-500"
                : "hover:text-red-500"
              }`}
          >
            Danh sách
          </span>

          <span
            onClick={() => navigate("/contact")}
            className="cursor-pointer hover:text-red-500"
          >
            Liên hệ
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          {/* Search */}
          <div className="hidden md:flex items-center relative w-[220px]">
            <input
              type="text"
              placeholder="Tìm truyện..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-4 py-1.5 rounded-full bg-[#1e293b] border border-gray-600 text-sm outline-none focus:border-red-500 transition-colors"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-3 text-gray-400 hover:text-red-500 transition-colors"
            >
              🔍
            </button>
          </div>

          {/* User */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* User */}
                <Popover content={content} trigger="click">
                  <button>
                    <UserOutlined className="text-lg" />
                  </button>
                </Popover>

                {/* Cart */}
                <button
                  onClick={() => navigate("/cart")}
                  className="relative group"
                >
                  <ShoppingCartOutlined className="text-lg hover:text-red-500 transition-colors" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-slate-800">
                    2
                  </span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/cart")}
                  className="relative mr-2"
                >
                  <ShoppingCartOutlined className="text-lg hover:text-red-500 transition-colors" />
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-red-500 px-4 py-1.5 rounded-full text-sm hover:bg-red-600 transition-colors"
                >
                  Đăng nhập
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;