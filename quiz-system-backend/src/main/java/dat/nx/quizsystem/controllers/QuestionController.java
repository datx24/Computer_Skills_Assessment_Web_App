package dat.nx.quizsystem.controllers;

import dat.nx.quizsystem.models.Question;
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

    //Tạo mới câu hỏi
    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(questionService.createQuestion(question));
    }

    //Lấy tất cả câu hỏi
    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    //Lọc câu hỏi theo chủ đề (topic)
    @GetMapping(params = "topic")
    public ResponseEntity<List<Question>> getQuestionsByTopic(@RequestParam String topic) {
        return ResponseEntity.ok(questionService.getQuestionsByTopic(topic));
    }

    //Lấy thông tin câu hỏi dựa vào id
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        return questionService.getQuestionById(id)
                .map(ResponseEntity::ok)// Nếu id đúng trả về 200 OK và dữ liệu
                .orElseGet(() -> ResponseEntity.notFound().build()); //Nếu id sai trả về 404
    }

    //Cập nhật thông tin câu hỏi dựa vào id
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question question) {
        return ResponseEntity.ok(questionService.updateQuestion(id, question));
    }

    //Xóa câu hỏi dựa vào id
    @DeleteMapping("/{id}")
    public ResponseEntity<Question> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok().build(); //Trả về 200 OK không có nội dung
    }
}
