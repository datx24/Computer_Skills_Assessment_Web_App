package dat.nx.quizsystem.controllers;

import dat.nx.quizsystem.dto.ExamDTO;
import dat.nx.quizsystem.dto.UserAnswerDTO;
import dat.nx.quizsystem.models.Exam;
import dat.nx.quizsystem.services.ExamService;
import dat.nx.quizsystem.services.ResultService;
import dat.nx.quizsystem.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user/exams")
public class UserExamController {

    @Autowired
    private ExamService examService;

    @Autowired
    private ResultService resultService;

    @Autowired
    private JwtUtil jwtUtil;

    // Lấy đề thi cho user
    @GetMapping("/{id}")
    public ResponseEntity<ExamDTO> getExam(@PathVariable Long id) {
        ExamDTO exam = examService.getExamById(id);
        return ResponseEntity.ok(exam);
    }

    // Nhận kết quả làm bài và chấm điểm
    @PostMapping("/{id}/submit")
    public ResponseEntity<?> submitExam(@PathVariable Long id, @RequestBody UserAnswerDTO userAnswer, @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        try {
            userAnswer.setExamId(id);
            int score = examService.calculateScore(userAnswer);

            Long userId = 0L; // Mặc định cho người dùng ẩn danh
            System.out.println("Nhận Authorization header: " + authorizationHeader);
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ") && !authorizationHeader.equals("Bearer null")) {
                String token = authorizationHeader.replace("Bearer ", "").trim();
                if (!token.isEmpty()) {
                    userId = jwtUtil.extractUserIdFromToken(token);
                    System.out.println("UserId từ Authorization header: " + userId);
                } else {
                    System.out.println("Token rỗng sau khi xóa Bearer");
                }
            } else {
                System.out.println("Không có Authorization header hợp lệ hoặc token là null");
            }

            resultService.saveResult(id, userId, score);
            return ResponseEntity.ok(score);
        } catch (RuntimeException e) {
            System.err.println("Lỗi token trong submitExam: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token or userId missing: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Lỗi chung trong submitExam: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi nộp bài thi: " + e.getMessage());
        }
    }
}

