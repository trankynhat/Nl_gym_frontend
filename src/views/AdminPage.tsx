import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/AdminPage.css"; // Import file CSS

const AdminPage = () => {
  const { role } = useAuth();

  if (role !== "ADMIN") {
    return (
      <p className="error-message">Bạn không có quyền truy cập trang này!</p>
    );
  }

  return (
    <div className="admin-page-container">
      <h1 className="admin-page-title">Chào mừng Admin!</h1>
      <div className="admin-sections">
        {/* Khu vực Quản lý danh sách */}
        <div className="admin-section">
          <h2>Quản lý danh sách</h2>
          <ul className="admin-nav-list">
            <li className="admin-nav-item">
              <Link to="../admin/users" className="admin-nav-link">
                Quản lý Người dùng
              </Link>
            </li>
            <li className="admin-nav-item">
              <Link to="../admin/classes" className="admin-nav-link">
                Quản lý Lớp học
              </Link>
            </li>
            <li className="admin-nav-item">
              <Link to="../admin/coaches" className="admin-nav-link">
                Quản lý Huấn luyện viên
              </Link>
            </li>
          </ul>
        </div>

        {/* Khu vực Tạo mới */}
        <div className="admin-section">
          <h2>Tạo mới</h2>
          <ul className="admin-nav-list">
            <li className="admin-nav-item">
              <Link to="../admin/class-template" className="admin-nav-link">
                Tạo template class
              </Link>
            </li>
            <li className="admin-nav-item">
              <Link to="../admin/add-coach" className="admin-nav-link">
                Tạo tài khoản HLV mới
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
