import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="min-h-screen">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
      <Toaster position="top-right"></Toaster>
    </div>
  );
};

export default MainLayout;
