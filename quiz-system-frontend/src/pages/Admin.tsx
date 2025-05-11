import React, { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuestionManagement from '../components/QuestionManagement';

const Admin: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  //State để kiểm soát hiển thị section quản lý câu hỏi
  const [showQuestionManagement, setShowQuestionManagement] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-grow container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">Trang Quản lý (Admin)</h2>

          {/* Các nút điều hướng đến các section quản lý */}
          <div className="mb-6">
            <button
              onClick={() => setShowQuestionManagement(true)}
              className="bg-indigo-500 text-white px-4 py-2 rounded mr-2 hover:bg-indigo-600 transition duration-200"
            >
              Quản lý Câu hỏi
            </button>
            {/* Thêm các button khác cho các chức năng quản lý khác trong tương lai */}
            <button
              onClick={() => alert('Chức năng quản lý người dùng sẽ được triển khai')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Quản lý Người dùng
            </button>
            <button
              onClick={() => alert('Chức năng quản lý lịch sử sẽ được triển khai')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
            >
              Quản lý Lịch sử
            </button>
          </div>

          {/* Hiển thị section quản lý câu hỏi khi nhấn nút */}
          {showQuestionManagement && (
            <QuestionManagement onUpdate={() => {
              setShowQuestionManagement(false); // Ẩn sau khi cập nhật
              setShowQuestionManagement(true); // Hiển thị lại để làm mới
            }} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;