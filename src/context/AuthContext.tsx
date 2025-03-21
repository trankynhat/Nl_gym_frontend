import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserInfo } from "../api/auth";

interface AuthContextType {
  user: any;
  role: string | null; // 👉 Thêm role global
  isAuthenticated: boolean;
  login: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null); // 👉 Biến role riêng
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInfo(token)
        .then((userData) => {
          setUser(userData);
          setRole(userData.role); // 👉 Cập nhật role ngay khi lấy user
        })
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    setRole(userData.role); // 👉 Set role khi đăng nhập
  };

  const logout = () => {
    setUser(null);
    setRole(null); // 👉 Xóa role khi logout
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, role, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
