import React, { useState } from "react";
import axios from "axios";
import "../../styles/CreateCoachPage.css";

const CreateCoachPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [expertise, setExpertise] = useState("");
  const [maxClassesPerWeek, setMaxClassesPerWeek] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) {
        throw new Error("Bạn chưa đăng nhập!");
      }

      const response = await axios.post(
        "http://localhost:8080/api/admin/addCoach",
        {
          fullName,
          email,
          password,
          phone,
          avatar: "example.jpg", // Đặt giá trị mặc định cho avatar
          expertise,
          maxClassesPerWeek,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm header Authorization
          },
        }
      );

      setSuccess("Coach đã được tạo thành công!");
      setFullName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setExpertise("");
      setMaxClassesPerWeek("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể tạo Coach!");
    }
  };

  return (
    <div className="create-coach-container">
      <h1>Tạo Coach</h1>
      <form className="create-coach-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="form-group">
          <label htmlFor="fullName">Họ và tên</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expertise">Chuyên môn</label>
          <input
            type="text"
            id="expertise"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxClassesPerWeek">Số lớp tối đa mỗi tuần</label>
          <input
            type="number"
            id="maxClassesPerWeek"
            value={maxClassesPerWeek}
            onChange={(e) => setMaxClassesPerWeek(Number(e.target.value))}
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Tạo Coach
        </button>
      </form>
    </div>
  );
};

export default CreateCoachPage;
