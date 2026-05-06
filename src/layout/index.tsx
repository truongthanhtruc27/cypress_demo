import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />  {/* 🔥 BẮT BUỘC */}
      <Footer />
    </div>
  );
};

export default Layout;