package dat.nx.quizsystem.services.impl;

import dat.nx.quizsystem.dto.QuestionDTO;
import dat.nx.quizsystem.models.Exam;
import dat.nx.quizsystem.models.Question;
import dat.nx.quizsystem.repositories.ExamRepository;
import dat.nx.quizsystem.repositories.QuestionRepository;
import dat.nx.quizsystem.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ExamRepository examRepository;

    @Override
    public Question createQuestion(QuestionDTO dto) {
        Exam exam = examRepository.findById(dto.getExamId())
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        Question question = new Question();
        question.setContent(dto.getContent());
        question.setOptions(dto.getOptions());
        question.setExam(exam);

        return questionRepository.save(question);
    }


    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();  // Lấy tất cả câu hỏi
    }

    @Override
    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);  // Lấy câu hỏi theo ID
    }

    @Override
    public Question updateQuestion(Long id, Question question) {
        if (questionRepository.existsById(id)) {
            question.setId(id);
            return questionRepository.save(question);  // Cập nhật câu hỏi
        }
        return null;  // Nếu không tồn tại câu hỏi, trả về null
    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);  // Xóa câu hỏi
    }

    @Override
    public List<Question> getQuestionsByExamId(Long examId) {
        return questionRepository.findByExamId(examId);  // Lấy các câu hỏi thuộc bài thi với examId
    }
}
