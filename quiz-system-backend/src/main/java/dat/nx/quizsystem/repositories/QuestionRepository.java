package dat.nx.quizsystem.repositories;

import dat.nx.quizsystem.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByExamId(Long examId);  // Lấy câu hỏi từ exam dựa trên examId
}
