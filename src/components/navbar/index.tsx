import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/imgs/logo.png";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <NavLink to="/" className="block w-10 h-10">
            <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
          </NavLink>
        </div>

        {/* Main Navigation */}
        <nav className="hidden md:flex flex-1 justify-center space-x-6 text-sm font-medium">
          <NavLink to="/" className="text-blue-600">Trang chủ</NavLink>
          <NavLink to="/products" className="text-gray-700 hover:text-blue-600">Sản phẩm</NavLink>
          <NavLink to="/promotions" className="text-gray-700 hover:text-blue-600">Khuyến mãi</NavLink>
          <NavLink to="/news" className="text-gray-700 hover:text-blue-600">Tin tức</NavLink>
          <NavLink to="/contact" className="text-gray-700 hover:text-blue-600">Liên hệ</NavLink>
        </nav>

        {/* Search + Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block w-56">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Cart */}
          <div className="relative text-gray-700 hover:text-blue-600 cursor-pointer">
            <i className="fas fa-shopping-cart text-xl"></i>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </div>

          {/* User */}
          <div className="text-gray-700 hover:text-blue-600 cursor-pointer">
            <i className="fas fa-user text-xl"></i>
          </div>

          {/* Login */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700">
            Đăng nhập
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
