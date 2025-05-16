package dat.nx.quizsystem.repositories;

import dat.nx.quizsystem.models.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    @Query("SELECT e FROM Exam e LEFT JOIN FETCH e.questions WHERE e.id = :id")
    Optional<Exam> findByIdWithQuestions(@Param("id") Long id);
}
