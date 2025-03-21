import axios from "axios";

const API_URL = "http://localhost:8080"; // Đổi URL nếu cần

// API Đăng ký
export const registerUser = async (
  fullName: string,
  email: string,
  password: string,
  phone: string,
  birthDate: string,
  address: string
) => {
  try {
    const response = await axios.post(`${API_URL}/api/customers/register`, {
      fullName,
      email,
      password,
      phone,
      birthDate,
      address,
    });
    return response.data; // Trả về message từ server
  } catch (error: any) {
    throw error.response?.data?.error || "Đăng ký thất bại!";
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });

    console.log(">>> Response từ server:", response.data);

    // Kiểm tra token từ response
    const token = response.data.token;
    if (!token) throw new Error("Không tìm thấy token!");

    // Lưu token vào localStorage
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Fetch user info to check role
    const userInfo = await getUserInfo(token);

    // Redirect based on role
    if (userInfo.role === "ADMIN") {
      window.location.href = "/admin"; // Điều hướng tới trang ADMIN
    }

    return token;
  } catch (error: any) {
    console.error("Lỗi đăng nhập:", error.response?.data || error.message);
    throw error.response?.data?.error || "Sai thông tin đăng nhập!";
  }
};

// Hàm lấy thông tin user
export const getUserInfo = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Lỗi khi lấy thông tin user:", error.response?.data || error.message);
    throw error.response?.data?.error || "Không thể lấy thông tin user!";
  }
};

// Đăng xuất user
export const logoutUser = () => {
  localStorage.removeItem("token"); // Xóa token khỏi localStorage
};