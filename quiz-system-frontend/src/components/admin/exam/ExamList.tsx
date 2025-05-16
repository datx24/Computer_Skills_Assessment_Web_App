import React, { useEffect, useState } from 'react';
import { getAllExams, deleteExam } from '../../../services/ExamService';  // Các service xử lý bài thi
import { Exam } from '../../../types/Exam';

const ExamList: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      const data = await getAllExams();
      setExams(data);
    };

    fetchExams();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteExam(id);
    setExams(exams.filter((exam) => exam.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Danh sách Bài Thi</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Tên Bài Thi</th>
            <th className="px-4 py-2 border">Mô Tả</th>
            <th className="px-4 py-2 border">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td className="px-4 py-2 border">{exam.id}</td>
              <td className="px-4 py-2 border">{exam.title}</td>
              <td className="px-4 py-2 border">{exam.description}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleDelete(exam.id!)}
                  className="text-red-500 hover:text-red-700"
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

export default ExamList;
