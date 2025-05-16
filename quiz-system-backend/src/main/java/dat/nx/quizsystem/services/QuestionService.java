package dat.nx.quizsystem.services;

import dat.nx.quizsystem.dto.QuestionDTO;
import dat.nx.quizsystem.models.Question;

import java.util.List;
import java.util.Optional;

public interface QuestionService {

    Question createQuestion(QuestionDTO dto);  // Tạo câu hỏi mới

    List<Question> getAllQuestions();  // Lấy tất cả câu hỏi

    Optional<Question> getQuestionById(Long id);  // Lấy câu hỏi theo ID

    Question updateQuestion(Long id, Question question);  // Cập nhật câu hỏi

    void deleteQuestion(Long id);  // Xóa câu hỏi

    List<Question> getQuestionsByExamId(Long examId);  // Lấy câu hỏi của một bài thi
}
