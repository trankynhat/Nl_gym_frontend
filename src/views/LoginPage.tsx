import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import "../styles/AuthForm.css"; // Import CSS chung
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser, getUserInfo } from "../api/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Lấy hàm login từ context

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const token = await loginUser(email, password); // Gửi request login
      localStorage.setItem("token", token); // Lưu token vào localStorage

      const user = await getUserInfo(token); // Lấy thông tin user
      login(user); // Cập nhật state đăng nhập

      // Redirect based on role
      if (user.role === "ADMIN") {
        navigate("/admin"); // Chuyển hướng tới trang ADMIN nếu là ADMIN
      } else {
        navigate("/"); // Chuyển hướng về trang chủ nếu không phải ADMIN
      }
    } catch (err: any) {
      setError("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-form">
        <Card.Body>
          <h2>Đăng Nhập</h2>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Đăng nhập
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginPage;
