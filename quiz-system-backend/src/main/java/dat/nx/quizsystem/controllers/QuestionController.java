package dat.nx.quizsystem.controllers;

import dat.nx.quizsystem.dto.QuestionDTO;
import dat.nx.quizsystem.models.Exam;
import dat.nx.quizsystem.models.Question;
import dat.nx.quizsystem.repositories.ExamRepository;
import dat.nx.quizsystem.repositories.QuestionRepository;
import dat.nx.quizsystem.services.ExamService;
import dat.nx.quizsystem.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private ExamService examService;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private QuestionRepository questionRepository;

    // Tạo câu hỏi
    @PostMapping
    public ResponseEntity<?> createQuestion(@RequestBody QuestionDTO dto) {
        try {
            Question question = new Question();
            question.setContent(dto.getContent());
            question.setOptions(dto.getOptions());
            question.setCorrect_answer(dto.getCorrectAnswer());

            Exam exam = examRepository.findById(dto.getExamId())
                    .orElseThrow(() -> new RuntimeException("Exam not found"));

            question.setExam(exam);

            questionRepository.save(question);
            return ResponseEntity.ok("Question created successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi khi tạo câu hỏi: " + e.getMessage());
        }
    }

    // Lấy tất cả câu hỏi
    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    // Lấy câu hỏi theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        return questionService.getQuestionById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Cập nhật câu hỏi
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question question) {
        return ResponseEntity.ok(questionService.updateQuestion(id, question));
    }

    // Xóa câu hỏi
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok().build();
    }

    // Lấy danh sách câu hỏi từ bài thi (examId)
    @GetMapping("/exam/{examId}")
    public ResponseEntity<List<Question>> getQuestionsByExamId(@PathVariable Long examId) {
        return ResponseEntity.ok(questionService.getQuestionsByExamId(examId));
    }
}
