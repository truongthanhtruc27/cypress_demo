import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../layout";

// Pages
import Home from "../pages/home";
import Contact from "../pages/contact";
import MangaDetail from "../pages/manga-detail";
import Reader from "../pages/reader";
import MangaList from "../pages/manga-list/MangaList";
import Login from "../pages/login";
import Register from "../pages/register";
import ForgotPassword from "../pages/forgot-password";
import Products from "../pages/products";
import AdminPage from "../pages/admin";
import Cart from "../pages/cart";
import History from "../pages/history";
import Profile from "../pages/profile";
import CheckoutPage from "../pages/checkout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 Layout bọc toàn bộ */}
        <Route path="/" element={<Layout />}>

          {/* ===== HOME ===== */}
          <Route index element={<Home />} />

          {/* ===== AUTH ===== */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          {/* ===== STATIC ===== */}
          <Route path="contact" element={<Contact />} />

          {/* ===== LIST ===== */}
          <Route path="products" element={<Products />} />
          <Route path="manga-list" element={<MangaList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<CheckoutPage />} />

          {/* ===== MANGA ===== */}
          <Route path="manga/:id" element={<MangaDetail />} />
          <Route path="manga/:id/chapter/:chapter" element={<Reader />} />

          {/* ===== 404 ===== */}
          <Route
            path="*"
            element={
              <div className="text-center mt-20 text-xl">
                🚫 404 - Trang không tồn tại
              </div>
            }
          />

        </Route>

        {/* ===== ADMIN (no layout wrapper) ===== */}
        <Route path="admin/*" element={<AdminPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;