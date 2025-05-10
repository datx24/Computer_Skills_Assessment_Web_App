import React from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer'; 

// Component Home sử dụng TypeScript
const Home: React.FC = () => {
  const { logout } = useAuth(); // Lấy hàm logout từ context xác thực
  const navigate = useNavigate(); // Hook để điều hướng giữa các trang

  // Hàm xử lý khi người dùng nhấn nút đăng xuất
  const handleLogout = () => {
    logout(); // Thực hiện đăng xuất
    navigate('/login'); // Điều hướng về trang đăng nhập
  };

  // Danh sách các chủ đề thi dựa trên yêu cầu dự án
  const topics = [
    'Microsoft Word',
    'Microsoft Excel',
    'Microsoft PowerPoint',
    'Internet and Email',
    'Windows OS',
    'Basic Computer Security',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Sử dụng component Header */}
      <Header />

      {/* Phần nội dung chính, chiếm phần còn lại của màn hình */}
      <main className="flex-grow container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center transform hover:scale-105 transition duration-300">
          <h2 className="text-4xl font-bold mb-6 text-indigo-700">Trang chủ</h2>
          <p className="text-xl mb-6 text-gray-600">Chào mừng bạn đã đăng nhập!</p>

          {/* Phần hướng dẫn sử dụng */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-teal-600">Hướng dẫn sử dụng</h3>
            <p className="text-gray-700 leading-relaxed">
              - Chọn một chủ đề bên dưới để bắt đầu bài thi.<br />
              - Mỗi bài thi có thời gian giới hạn và tự động chấm điểm.<br />
              - Kiểm tra lịch sử điểm số trong mục "Lịch sử".<br />
              - (Admin) Quản lý câu hỏi tại trang quản lý.
            </p>
          </section>

          {/* Phần chọn chủ đề thi */}
          <section className="mt-8">
            <h3 className="text-2xl font-semibold mb-6 text-teal-600">Chọn chủ đề thi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {topics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => navigate(`/exams/start?topic=${topic.toLowerCase().replace(/ /g, '-')}`)}
                  className="bg-gradient-to-r from-red-400 to-orange-500 text-white p-6 rounded-lg hover:from-red-500 hover:to-orange-600 transform hover:scale-105 transition duration-300 shadow-md"
                >
                  {topic}
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Sử dụng component Footer */}
      <Footer />
    </div>
  );
};

export default Home;