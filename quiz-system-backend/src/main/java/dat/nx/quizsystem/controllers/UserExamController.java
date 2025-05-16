package dat.nx.quizsystem.controllers;

import dat.nx.quizsystem.dto.ExamDTO;
import dat.nx.quizsystem.dto.UserAnswerDTO;
import dat.nx.quizsystem.models.Exam;
import dat.nx.quizsystem.services.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user/exams")
public class UserExamController {

    @Autowired
    private ExamService examService;

    // Lấy đề thi cho user
    @GetMapping("/{id}")
    public ResponseEntity<ExamDTO> getExam(@PathVariable Long id) {
        ExamDTO exam = examService.getExamById(id);
        return ResponseEntity.ok(exam);
    }

    // Nhận kết quả làm bài và chấm điểm
    @PostMapping("/{id}/submit")
    public ResponseEntity<Integer> submitExam(@PathVariable Long id, @RequestBody UserAnswerDTO userAnswer) {
        userAnswer.setExamId(id); // gán thủ công nếu cần
        int score = examService.calculateScore(userAnswer);
        return ResponseEntity.ok(score);
    }
}

