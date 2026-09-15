import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ChatAI from "../components/chat-ai";

const Layout = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
      <ChatAI />
    </div>
  );
};


export default Layout;