package dat.nx.quizsystem.dto;

import java.util.List;

public class ExamSubmissionDTO {
    private Long examId;
    private List<UserAnswerDTO> userAnswers;

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public List<UserAnswerDTO> getUserAnswers() {
        return userAnswers;
    }

    public void setUserAnswers(List<UserAnswerDTO> userAnswers) {
        this.userAnswers = userAnswers;
    }
}