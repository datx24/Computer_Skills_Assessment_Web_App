import { Exam } from '../types/Exam';

const API_URL = 'http://localhost:8080/api/exams'

// Tạo bài thi mới
export const createExam = async (exam: Exam) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exam),
  });

  return await response.json();
};

// Lấy danh sách tất cả các bài thi
export const getAllExams = async (): Promise<Exam[]> => {
  const response = await fetch(API_URL);
  return await response.json();
};

// Xóa bài thi
export const deleteExam = async (id: number) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
