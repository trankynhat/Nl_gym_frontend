import React, { useState } from "react";
import axios from "axios";
import "../styles/CreateClassTemplatePage.css";

const CreateClassTemplatePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [defaultDuration, setDefaultDuration] = useState<number | "">("");
  const [maxParticipants, setMaxParticipants] = useState<number | "">("");
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
        "http://localhost:8080/api/admin/class-templates",
        {
          name,
          description,
          default_duration: defaultDuration,
          max_participants: maxParticipants,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm header Authorization
          },
        }
      );

      setSuccess("Lớp học mẫu đã được tạo thành công!");
      setName("");
      setDescription("");
      setDefaultDuration("");
      setMaxParticipants("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể tạo lớp học mẫu!");
    }
  };

  return (
    <div className="create-class-template-container">
      <h1>Tạo Lớp Học Mẫu</h1>
      <form className="create-class-template-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="form-group">
          <label htmlFor="name">Tên lớp học</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="defaultDuration">Thời lượng mặc định (phút)</label>
          <input
            type="number"
            id="defaultDuration"
            value={defaultDuration}
            onChange={(e) => setDefaultDuration(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxParticipants">
            Số lượng người tham gia tối đa
          </label>
          <input
            type="number"
            id="maxParticipants"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(Number(e.target.value))}
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Tạo lớp học mẫu
        </button>
      </form>
    </div>
  );
};

export default CreateClassTemplatePage;
