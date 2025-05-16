package dat.nx.quizsystem.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import dat.nx.quizsystem.converter.StringListConverter;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @Lob
    @Column(name = "options", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> options; // JSON string or plain format

    private String correct_answer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;  // Mỗi câu hỏi thuộc về một bài thi

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public String getCorrect_answer() {
        return correct_answer;
    }

    public void setCorrect_answer(String correct_answer) {
        this.correct_answer = correct_answer;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }
}
