import React, { useEffect, useState } from 'react';
import { getAllQuestions, deleteQuestion } from '../../../services/QuestionService';
import { Question } from '../../../types/Question';

const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getAllQuestions();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteQuestion(id);
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Danh sách Câu Hỏi</h2>
      <table className="w-full border-collapse table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Nội dung</th>
            <th className="px-4 py-2 text-left">Đáp án đúng</th>
            <th className="px-4 py-2 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{question.id}</td>
              <td className="px-4 py-2">{question.content}</td>
              <td className="px-4 py-2">{question.correct_answer}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(question.id!)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;
