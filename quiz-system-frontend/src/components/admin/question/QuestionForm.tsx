import React, { useEffect, useState } from 'react';
import { createQuestion } from '../../../services/QuestionService';
import { Question } from '../../../types/Question';
import { getAllExams } from '../../../services/ExamService';
import { Exam } from '../../../types/Exam';

const QuestionForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(''); // store index as string
  const [examId, setExamId] = useState<number>();
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      const data = await getAllExams();
      setExams(data);
      if (data.length > 0) setExamId(data[0].id!);
    };
    fetchExams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const options = [option1, option2, option3, option4];
    const correct_answer = options[parseInt(correctAnswerIndex) - 1]; // convert to 0-based index

    const question: Question = {
      content,
      options,
      correct_answer,
      examId: examId!,
    };

    const newQuestion = await createQuestion(question);
    console.log('Câu hỏi mới:', newQuestion);
    // Optionally: reset form
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Thêm Câu Hỏi Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600">Nội dung câu hỏi:</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">Đáp án 1:</label>
            <input
              type="text"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600">Đáp án 2:</label>
            <input
              type="text"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600">Đáp án 3:</label>
            <input
              type="text"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600">Đáp án 4:</label>
            <input
              type="text"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-600">Chọn đáp án đúng:</label>
          <select
            value={correctAnswerIndex}
            onChange={(e) => setCorrectAnswerIndex(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Chọn đáp án đúng</option>
            <option value="1">{option1 || 'Đáp án 1'}</option>
            <option value="2">{option2 || 'Đáp án 2'}</option>
            <option value="3">{option3 || 'Đáp án 3'}</option>
            <option value="4">{option4 || 'Đáp án 4'}</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600">Bài thi:</label>
          <select
            value={examId}
            onChange={(e) => setExamId(Number(e.target.value))}
            required
            className="w-full p-2 border rounded-lg"
          >
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Thêm câu hỏi
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
