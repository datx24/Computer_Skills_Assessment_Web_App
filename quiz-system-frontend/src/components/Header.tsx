import React from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Header: React.FC = () => {
  const { logout } = useAuth(); // Lấy hàm logout từ context xác thực
  const navigate = useNavigate(); // Hook để điều hướng giữa các trang

  // Hàm xử lý khi người dùng nhấn nút đăng xuất
  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 mr-4" />
          <h1 className="text-2xl font-bold">Web Trắc Nghiệm Tin Học</h1>
        </div>
        <div>
          <span className="mr-4">Xin chào, Nguyễn Xuân Đạt (64.CNTT_CLC2)</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;