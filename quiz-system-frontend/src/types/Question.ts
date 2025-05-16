export interface Question {
  id?: number;
  content: string;
  options: string[];
  correct_answer: string;
  examId: number;
}
