import { Question } from "../types/Question";

// Base URL của API
const API_URL = "http://localhost:8080/api/questions";

// Lấy tất cả câu hỏi
export const getAllQuestions = async (): Promise<Question[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

// Tạo câu hỏi mới
export const createQuestion = async (question: Question): Promise<Question> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });
  const data = await response.json();
  return data;
};

// Lấy câu hỏi theo ID
export const getQuestionById = async (id: number): Promise<Question> => {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data;
};

// Cập nhật câu hỏi
export const updateQuestion = async (id: number, question: Question): Promise<Question> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });
  const data = await response.json();
  return data;
};

// Xóa câu hỏi
export const deleteQuestion = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
