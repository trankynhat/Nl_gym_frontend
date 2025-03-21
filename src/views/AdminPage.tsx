import { useAuth } from "../context/AuthContext";

const AdminPage = () => {
  const { role } = useAuth();

  if (role !== "ADMIN") {
    return <p>Bạn không có quyền truy cập trang này!</p>;
  }

  return <div>Chào mừng Admin!</div>;
};

export default AdminPage;
