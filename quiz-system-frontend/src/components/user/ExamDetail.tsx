import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Space, Typography } from 'antd';
import { ClockCircleOutlined, QuestionCircleOutlined, TagOutlined, CalendarOutlined, QuestionCircleOutlined as QIcon } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../fragments/Header';
import Footer from '../fragments/Footer';

interface Question {
  id: number;
  content: string;
}

interface Exam {
  id: number;
  title: string;
  duration: number; // phút
  topic: string;
  createdAt: string;
  questions: Question[];
}

const ExamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exam, setExam] = useState<Exam | null>(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/exams/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setExam(response.data);
      } catch (error) {
        console.error('Error fetching exam details:', error);
      }
    };
    fetchExam();
  }, [id]);

  if (!exam) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <Card className="shadow-lg rounded-xl">
            <div className="text-center text-gray-600 text-lg font-medium">Đang tải thông tin bài thi...</div>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const handleStart = () => {
    const startTime = Date.now();
    localStorage.setItem(`exam_${exam.id}_startTime`, startTime.toString());
    navigate(`/exam/start?id=${exam.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <div className="flex-grow max-w-xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <Card
          className="shadow-2xl rounded-2xl overflow-hidden border-none bg-white/95 backdrop-blur-md transform hover:scale-[1.02] transition-transform duration-300"
          cover={
            <div className="h-32 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-400 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 rounded-t-2xl flex items-center justify-center">
                <Typography.Title level={2} className="text-white mb-0 tracking-wide font-semibold text-center">
                  {exam.title}
                </Typography.Title>
              </div>
            </div>
          }
        >
          <div className="p-6">
            <Space direction="vertical" size="middle" className="w-full">
              <div className="flex items-center space-x-3">
                <TagOutlined className="text-indigo-600 text-lg" />
                <div>
                  <Typography.Text className="text-gray-500 font-medium text-sm">Chủ đề</Typography.Text>
                  <Typography.Text className="block text-gray-800 font-semibold">{exam.topic}</Typography.Text>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <ClockCircleOutlined className="text-indigo-600 text-lg" />
                <div>
                  <Typography.Text className="text-gray-500 font-medium text-sm">Thời gian</Typography.Text>
                  <Typography.Text className="block text-gray-800 font-semibold">{exam.duration} phút</Typography.Text>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <QIcon className="text-indigo-600 text-lg" />
                <div>
                  <Typography.Text className="text-gray-500 font-medium text-sm">Số câu hỏi</Typography.Text>
                  <Typography.Text className="block text-gray-800 font-semibold">{exam.questions.length}</Typography.Text>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CalendarOutlined className="text-indigo-600 text-lg" />
                <div>
                  <Typography.Text className="text-gray-500 font-medium text-sm">Ngày tạo</Typography.Text>
                  <Typography.Text className="block text-gray-800 font-semibold">
                    {new Date(exam.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </Typography.Text>
                </div>
              </div>
            </Space>

            <Divider className="my-6 border-gray-200" />

            <div className="flex justify-center">
              <Button
                type="primary"
                size="large"
                icon={<QuestionCircleOutlined />}
                onClick={handleStart}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-none text-white font-bold px-8 py-5 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Bắt đầu làm bài
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ExamDetail;
