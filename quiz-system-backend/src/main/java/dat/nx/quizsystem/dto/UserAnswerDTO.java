package dat.nx.quizsystem.dto;

import java.util.Map;

public class UserAnswerDTO {
    private Long examId;
    private Map<Long, String> answers;

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public Map<Long, String> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<Long, String> answers) {
        this.answers = answers;
    }
}

