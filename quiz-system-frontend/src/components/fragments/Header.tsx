import React from 'react';
import { useAuth } from "../../context/AuthContext";
import { Button, Card, Divider, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-800 text-white py-4 shadow-2xl">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-14 rounded-full shadow-md" />
          <div className="flex-1 flex justify-center">
          <h1 className="text-white text-xl font-bold tracking-wide m-0 text-center">
            Web Trắc Nghiệm Tin Học
          </h1>
        </div>
        </div>
        <div className="flex items-center space-x-6">
          <Typography.Text className="text-gray-200 font-medium">
            Xin chào, Nguyễn Xuân Đạt (64.CNTT_CLC2)
          </Typography.Text>
          <Button
            type="primary"
            danger
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-6 py-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;