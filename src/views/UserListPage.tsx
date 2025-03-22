import "../styles/UserListPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UserListPage = () => {
  const navigate = useNavigate(); // Hook để điều hướng
  const [users, setUsers] = useState([]); // State để lưu danh sách người dùng
  const [loading, setLoading] = useState(true); // State để hiển thị trạng thái loading
  const [error, setError] = useState<string | null>(null); // State để lưu lỗi nếu có
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null); // State để lưu trạng thái sắp xếp

  // Hàm lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) {
        throw new Error("Bạn chưa đăng nhập!");
      }

      const response = await axios.get(
        "http://localhost:8080/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm header Authorization
          },
        }
      );

      setUsers(response.data); // Cập nhật danh sách người dùng
      setLoading(false); // Tắt trạng thái loading
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể tải dữ liệu!");
      setLoading(false); // Tắt trạng thái loading
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm xử lý sắp xếp
  const handleSort = (key: string) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    const sortedUsers = [...users].sort((a: any, b: any) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
    setSortConfig({ key, direction });
  };

  // Hàm xử lý đổi mật khẩu
  const handleChangePassword = (userId: number) => {
    alert(`Đổi mật khẩu cho người dùng có ID: ${userId}`);
    // Thêm logic xử lý đổi mật khẩu tại đây
  };

  // Hàm xử lý xóa người dùng
  const handleDeleteUser = (userId: number) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa người dùng có ID: ${userId}?`
    );
    if (confirmDelete) {
      alert(`Đã xóa người dùng có ID: ${userId}`);
      // Thêm logic xử lý xóa người dùng tại đây
    }
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="user-list-container">
      <button className="btn-back" onClick={() => navigate(-1)}>
        Trở lại
      </button>
      <h1>Danh sách người dùng</h1>
      <table className="user-list-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID{" "}
              {sortConfig?.key === "id" &&
                (sortConfig.direction === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("full_name")}>
              Họ và tên{" "}
              {sortConfig?.key === "full_name" &&
                (sortConfig.direction === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("email")}>
              Email{" "}
              {sortConfig?.key === "email" &&
                (sortConfig.direction === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("role")}>
              Vai trò{" "}
              {sortConfig?.key === "role" &&
                (sortConfig.direction === "asc" ? "▲" : "▼")}
            </th>
            <th>Số điện thoại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  className="btn-change-password"
                  onClick={() => handleChangePassword(user.id)}
                >
                  Đổi mật khẩu
                </button>
                <button
                  className="btn-delete-user"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
