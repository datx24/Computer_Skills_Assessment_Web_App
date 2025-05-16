import React from 'react';
import { Typography } from 'antd';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-800 text-white py-6 border-t border-gray-800">
      <div className="container mx-auto text-center">
        <Typography.Text className="block text-sm text-white font-medium">
          © 2025 Nguyễn Xuân Đạt - Dự án Báo cáo Môn Phát Triển Ứng Dụng Web 2
        </Typography.Text>
        <Typography.Text className="block mt-2 text-white text-sm">
          Github:{' '}
          <a
            href="https://github.com/datx24/Computer_Skills_Assessment_Web_App"
            className="text-black hover:text-blue-100 transition-colors duration-200"
            style={{ color: 'white' }}
          >
            https://github.com/datx24/Computer_Skills_Assessment_Web_App
          </a>
        </Typography.Text>
        <Typography.Text className="block mt-2 text-sm text-white font-medium">
          Công nghệ: Spring Boot RESTful (Backend) & ReactJS (Frontend)
        </Typography.Text>
      </div>
    </footer>
  );
};
export default Footer;