import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../fragments/Header';
import Footer from '../fragments/Footer';
import { Typography, Radio, Button, Card, message, Pagination, Modal } from 'antd';

const { Title, Paragraph } = Typography;

interface Question {
  id: number;
  content: string;
  options: string[];
}

interface ExamDTO {
  id: number;
  title: string;
  duration: number; // phút
  questions: Question[];
}

const ExamPage: React.FC = () => {
  const [exam, setExam] = useState<ExamDTO | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentQuestionPage, setCurrentQuestionPage] = useState(1);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAutoSubmit, setIsAutoSubmit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const examId = searchParams.get('id');

  // Fetch exam
  useEffect(() => {
    const fetchExamById = async () => {
      if (!examId) {
        message.error('Không tìm thấy ID bài thi.');
        navigate('/home');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/api/exams/${examId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Exam data:', response.data); // Debug
        setExam(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy bài thi:', error);
        setError('Không tải được bài thi, vui lòng thử lại sau.');
        message.error('Không tải được bài thi, vui lòng thử lại sau.');
      }
    };

    fetchExamById();
  }, [examId, navigate]);

  // Initialize timer
  useEffect(() => {
    if (!exam) {
      console.log('Exam not loaded yet'); // Debug
      return;
    }

    const startTimeStr = localStorage.getItem(`exam_${exam.id}_startTime`);
    console.log('startTimeStr:', startTimeStr); // Debug
    if (!startTimeStr) {
      message.error('Bạn chưa bắt đầu bài thi. Vui lòng bấm "Bắt đầu làm bài" trước.');
      navigate(`/exam/detail/${examId}`);
      return;
    }

    const startTime = parseInt(startTimeStr, 10);
    const durationSeconds = exam.duration * 60;
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    const remaining = durationSeconds - elapsed;

    console.log('Timer init - startTime:', startTime, 'durationSeconds:', durationSeconds, 'elapsed:', elapsed, 'remaining:', remaining); // Debug

    if (remaining <= 0) {
      setIsAutoSubmit(true);
      handleSubmit(true);
    } else {
      setTimeLeft(remaining);
    }
  }, [exam, examId, navigate]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft === null) {
      console.log('timeLeft is null'); // Debug
      return;
    }

    if (timeLeft <= 0) {
      console.log('Time up, submitting'); // Debug
      setIsAutoSubmit(true);
      handleSubmit(true);
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        console.log('Clearing timer'); // Debug
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft]);

  const handleOptionChange = (questionIndex: number, e: any) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: e.target.value }));
  };

  const handleSubmit = async (autoSubmit = false) => {
    if (!exam) {
      message.error('Bài thi chưa sẵn sàng');
      return;
    }

    if (autoSubmit) {
      await confirmSubmit(true);
    } else {
      setModalVisible(true);
    }
  };

  const confirmSubmit = async (autoSubmit = false) => {
    setModalVisible(false);
    if (!exam) return;

    try {
      const userAnswerDTO = {
        examId: exam.id,
        answers: answers,
      };

      if (timerRef.current) clearTimeout(timerRef.current);
      localStorage.removeItem(`exam_${exam.id}_startTime`);

      const response = await axios.post(
        `http://localhost:8080/api/user/exams/${exam.id}/submit`,
        userAnswerDTO,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      if (autoSubmit) {
        message.info(`Hết giờ! Bài đã được nộp tự động. Điểm: ${response.data}/10`);
      } else {
        message.success(`Bạn đã làm bài xong. Điểm: ${response.data}/10`);
      }

      navigate('/home');
    } catch (error) {
      console.error('Lỗi khi nộp bài thi:', error);
      message.error('Có lỗi xảy ra khi nộp bài, vui lòng thử lại.');
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = exam?.questions[currentQuestionPage - 1];

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
          <Card>
            <p className="text-center text-red-600">{error}</p>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <Title level={2} className="text-center text-indigo-700 mb-2">
          {exam?.title || 'Exam Start'}
        </Title>

        {timeLeft !== null ? (
          <div className="text-center mb-6 text-xl font-semibold text-red-600">
            Thời gian còn lại: {formatTime(timeLeft)}
          </div>
        ) : (
          <div className="text-center mb-6 text-xl font-semibold text-blue-600">
            Đang bắt đầu đếm giờ...
          </div>
        )}

        {exam && currentQuestion ? (
          <Card bordered hoverable className="shadow-md">
            <Paragraph strong className="mb-4">
              Câu {currentQuestionPage}: {currentQuestion.content}
            </Paragraph>

            <Radio.Group
              onChange={(e) => handleOptionChange(currentQuestionPage - 1, e)}
              value={answers[currentQuestionPage - 1]}
              className="flex flex-col space-y-2"
            >
              {currentQuestion.options.map((option, i) => (
                <Radio key={i} value={option}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </Card>
        ) : (
          <p className="text-center">Đang tải câu hỏi...</p>
        )}

        <div className="flex justify-center mt-6">
          <Pagination
            current={currentQuestionPage}
            pageSize={1}
            total={exam?.questions.length || 0}
            onChange={(page) => setCurrentQuestionPage(page)}
            showSizeChanger={false}
          />
        </div>

        <div className="text-center mt-10">
          <Button
            type="primary"
            size="large"
            onClick={() => handleSubmit(false)}
            disabled={!exam || Object.keys(answers).length !== exam.questions.length}
          >
            Nộp bài
          </Button>
        </div>
      </main>

      <Footer />

      <Modal
        title="Xác nhận nộp bài"
        open={modalVisible}
        onOk={() => confirmSubmit(false)}
        onCancel={() => setModalVisible(false)}
        okText="Nộp bài"
        cancelText="Hủy"
      >
        <Typography.Text>Bạn có chắc chắn muốn nộp bài không?</Typography.Text>
      </Modal>
    </div>
  );
};

export default ExamPage;