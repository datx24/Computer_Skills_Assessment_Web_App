import React from 'react';
import { Button, Space, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  className?: string;  // <-- thêm dấu hỏi để className không bắt buộc
}

const Navbar: React.FC<NavbarProps> = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4 z-20 shadow-md">
      <div className="container mx-auto flex justify-end items-center">
        <Space>
          <Typography.Text className="text-white font-medium">
            Nguyễn Xuân Đạt (64.CNTT_CLC2)
          </Typography.Text>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 border-none rounded-lg"
          >
            Đăng xuất
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Navbar;
