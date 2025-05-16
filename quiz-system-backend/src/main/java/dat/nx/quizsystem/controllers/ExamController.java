package dat.nx.quizsystem.controllers;

import dat.nx.quizsystem.dto.ExamDTO;
import dat.nx.quizsystem.models.Exam;
import dat.nx.quizsystem.models.Question;
import dat.nx.quizsystem.services.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    @Autowired
    private ExamService examService;

    // Tạo exam
    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        return ResponseEntity.ok(examService.createExam(exam));
    }

    // Lấy tất cả exams
    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {
        return ResponseEntity.ok(examService.getAllExams());
    }

    //  Lấy chi tiết exam theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getExamById(@PathVariable Long id) {
        Exam exam = examService.getExamWithQuestions(id);
        if (exam == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exam not found");
        }
        return ResponseEntity.ok(exam);
    }

    // Cập nhật exam
    @PutMapping("/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable Long id, @RequestBody Exam exam) {
        return ResponseEntity.ok(examService.updateExam(id, exam));
    }

    // Xóa exam
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
        return ResponseEntity.ok().build();
    }

    // Lấy danh sách câu hỏi từ exam
    @GetMapping("/{id}/questions")
    public ResponseEntity<List<Question>> getQuestionsInExam(@PathVariable Long id) {
        return ResponseEntity.ok(examService.getQuestionsInExam(id));
    }
}
