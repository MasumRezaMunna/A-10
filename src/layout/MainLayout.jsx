import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

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
    </div>
  );
};

export default MainLayout;