import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-6">
      <div className="container mx-auto text-center">
        <p>© 2025 Nguyễn Xuân Đạt - Dự án Báo cáo Môn Phát Triển Ứng Dụng Web 2</p>
        <p>
          Github: <a href="https://github.com/datx24/Computer_Skills_Assessment_Web_App" className="underline text-blue-300 hover:text-blue-400">https://github.com/datx24/Computer_Skills_Assessment_Web_App</a>
        </p>
        <p>Công nghệ: Spring Boot RESTful (Backend) & ReactJS (Frontend)</p>
      </div>
    </footer>
  );
};

export default Footer;