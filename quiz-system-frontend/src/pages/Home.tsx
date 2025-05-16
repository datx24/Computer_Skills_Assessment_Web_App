import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Space, Typography } from 'antd';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/fragments/Header';
import Footer from '../components/fragments/Footer';
import axios from 'axios';

interface Exam {
  id: number;
  title: string;
  duration: number;
  topic: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/exams', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setExams(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bài thi:', error);
      }
    };

    fetchExams();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100">
      <Header />

      <main className="flex-grow container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card
          className="shadow-2xl rounded-2xl overflow-hidden border-none bg-white/95 backdrop-blur-md transform hover:shadow-3xl transition-shadow duration-300"
          bodyStyle={{ padding: '40px' }}
        >
          <Typography.Title level={1} className="text-center text-indigo-800 font-extrabold mb-6">
            Trang chủ
          </Typography.Title>
          <Typography.Text className="block text-center text-xl text-gray-600 font-medium mb-10">
            Chào mừng bạn đến với hành trình học tập thú vị!
          </Typography.Text>

          <section className="mb-12">
            <Typography.Title level={3} className="text-center text-teal-600 font-semibold mb-6">
              Hướng dẫn sử dụng
            </Typography.Title>
            <div className="flex justify-center">
              <Space direction="vertical" size="large" className="text-left">
                <Typography.Text className="text-gray-700 leading-relaxed text-lg">
                  - Chọn một bài thi bên dưới để bắt đầu khám phá kiến thức.
                </Typography.Text>
                <Typography.Text className="text-gray-700 leading-relaxed text-lg">
                  - Mỗi bài thi có thời gian giới hạn và tự động chấm điểm chính xác.
                </Typography.Text>
                <Typography.Text className="text-gray-700 leading-relaxed text-lg">
                  - Kiểm tra lịch sử điểm số trong mục "Lịch sử" để theo dõi tiến độ.
                </Typography.Text>
                <Typography.Text className="text-gray-700 leading-relaxed text-lg">
                  - (Admin) Quản lý câu hỏi tại trang quản lý để tối ưu hóa nội dung.
                </Typography.Text>
              </Space>
            </div>
          </section>

          <Divider className="my-10 border-gray-200" />

          <section>
            <Typography.Title level={3} className="text-center text-teal-600 font-semibold mb-8">
              Khám phá các bài thi
            </Typography.Title>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map((exam) => (
                <Card
                  key={exam.id}
                  hoverable
                  className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300"
                  onClick={() => navigate(`/exam/detail/${exam.id}`)}
                >
                  <Card.Meta
                    title={<Typography.Text className="text-xl font-bold text-indigo-800">{exam.title}</Typography.Text>}
                    description={
                      <Space direction="vertical" size="small">
                        <Typography.Text className="text-gray-600">Thời gian: {exam.duration} phút</Typography.Text>
                        <Typography.Text className="text-gray-600">Chủ đề: {exam.topic}</Typography.Text>
                        <Typography.Text className="text-gray-600">
                          Ngày tạo: {new Date(exam.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </Typography.Text>
                      </Space>
                    }
                  />
                </Card>
              ))}
            </div>
          </section>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Home;