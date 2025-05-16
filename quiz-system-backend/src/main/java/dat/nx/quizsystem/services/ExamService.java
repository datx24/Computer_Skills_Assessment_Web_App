package dat.nx.quizsystem.services;

import dat.nx.quizsystem.dto.ExamDTO;
import dat.nx.quizsystem.dto.UserAnswerDTO;
import dat.nx.quizsystem.models.Exam;
import dat.nx.quizsystem.models.Question;

import java.util.List;
import java.util.Optional;

public interface ExamService {
    Exam createExam(Exam exam);
    List<Exam> getAllExams();
    Exam updateExam(Long id, Exam exam);
    void deleteExam(Long id);
    List<Question> getQuestionsInExam(Long examId);
    int calculateScore(UserAnswerDTO userAnswer);
    ExamDTO getExamById(Long id);
    Exam getExamWithQuestions(Long id);
}
