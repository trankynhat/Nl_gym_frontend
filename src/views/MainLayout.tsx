import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/main-layout.css";
function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="container">
        <Outlet /> {/* Các trang con sẽ hiển thị ở đây */}
      </div>
    </div>
  );
}

export default MainLayout;
