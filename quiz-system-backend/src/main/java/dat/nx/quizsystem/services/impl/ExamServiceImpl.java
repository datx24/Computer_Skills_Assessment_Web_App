package dat.nx.quizsystem.services.impl;

import dat.nx.quizsystem.dto.ExamDTO;
import dat.nx.quizsystem.dto.QuestionDTO;
import dat.nx.quizsystem.dto.UserAnswerDTO;
import dat.nx.quizsystem.models.Exam;
import dat.nx.quizsystem.models.Question;
import dat.nx.quizsystem.repositories.ExamRepository;
import dat.nx.quizsystem.repositories.QuestionRepository;
import dat.nx.quizsystem.services.ExamService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamServiceImpl implements ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    @Override
    public ExamDTO getExamById(Long id) {
        Optional<Exam> optionalExam = examRepository.findById(id);
        if (optionalExam.isPresent()) {
            Exam exam = optionalExam.get();
            // Tạo DTO từ Exam
            ExamDTO dto = new ExamDTO();
            dto.setId(exam.getId());
            dto.setTitle(exam.getTitle());
            dto.setQuestions(
                    exam.getQuestions().stream().map(question -> {
                        QuestionDTO q = new QuestionDTO();
                        q.setContent(question.getContent());
                        q.setOptions(question.getOptions());
                        // Không set correctAnswer cho user!
                        return q;
                    }).toList()
            );
            return dto;
        } else {
            throw new RuntimeException("Exam not found");
        }
    }

    @Override
    public Exam updateExam(Long id, Exam exam) {
        if (examRepository.existsById(id)) {
            exam.setId(id);
            return examRepository.save(exam);
        }
        return null;
    }

    @Override
    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }

    @Override
    public List<Question> getQuestionsInExam(Long examId) {
        return questionRepository.findByExamId(examId);
    }

    public int calculateScore(UserAnswerDTO userAnswer) {
        int score = 0;

        // Lấy exam từ DB
        Exam exam = examRepository.findById(userAnswer.getExamId()).orElse(null);
        if (exam == null) return 0;

        List<Question> questions = exam.getQuestions();

        for (Map.Entry<Long, String> entry : userAnswer.getAnswers().entrySet()) {
            int index = Math.toIntExact(entry.getKey());
            String userSelectedAnswer = entry.getValue();

            // Kiểm tra index hợp lệ
            if (index >= 0 && index < questions.size()) {
                Question q = questions.get(index);
                if (q.getCorrect_answer() != null && q.getCorrect_answer().equals(userSelectedAnswer)) {
                    score++;
                }
            }
        }
        return score;
    }

    @Override
    public Exam getExamWithQuestions(Long id) {
        Optional<Exam> optionalExam = examRepository.findByIdWithQuestions(id);
        return optionalExam.orElse(null);
    }
}
