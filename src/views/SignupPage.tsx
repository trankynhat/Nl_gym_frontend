import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthForm.css"; // Import CSS chung

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
    address: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/customers/register", {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        birthDate: formData.birthDate,
        address: formData.address,
      });
      setSuccess("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Đăng ký tài khoản</h2>
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Họ và tên</label>
            <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Xác nhận mật khẩu</label>
            <input type="password" name="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Số điện thoại</label>
            <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Ngày sinh</label>
            <input type="date" name="birthDate" className="form-control" value={formData.birthDate} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Địa chỉ</label>
            <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Đăng ký</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
