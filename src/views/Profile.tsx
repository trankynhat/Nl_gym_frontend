import { useEffect, useState } from "react";
import { getUserInfo } from "../api/auth";
import "../styles/Profile.css";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [avatarUrl, setAvatarUrl] = useState<string>("/default-avatar.png");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userInfo = await getUserInfo(token);
        setUser(userInfo);

        if (userInfo.avatar) {
          fetchAvatar(userInfo.avatar);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const fetchAvatar = async (filename: string) => {
    try {
      if (!filename) return;

      const avatarApiUrl = `http://localhost:8080/api/avatar/${filename}`;
      const response = await fetch(avatarApiUrl, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Không thể tải avatar");

      const blob = await response.blob();
      setAvatarUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Lỗi tải avatar:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setShowConfirm(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("email", user.email);

    try {
      const response = await fetch("http://localhost:8080/api/files/avatar", {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        fetchAvatar(data.url);
        setShowConfirm(false);
      } else {
        console.error("Lỗi khi upload avatar:", data);
      }
    } catch (error) {
      console.error("Lỗi kết nối khi upload avatar:", error);
    }
  };

  if (loading) return <p className="text-center">Đang tải...</p>;
  if (!user)
    return <p className="text-center text-danger">Bạn chưa đăng nhập!</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-container">
            <img src={avatarUrl} alt="User Avatar" className="avatar" />
            <label htmlFor="file-upload" className="upload-icon">
              <FaCamera />
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              hidden
            />
          </div>
          <h2 className="profile-name">{user.full_name}</h2>
          <span className="profile-role">{user.role}</span>
        </div>
        <div className="profile-body">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Điện thoại:</strong> {user.phone}
          </p>
        </div>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Bạn có muốn cập nhật avatar không?</p>
            <div className="modal-buttons">
              <button onClick={handleUpload} className="modal-confirm">
                Xác nhận
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="modal-cancel"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
