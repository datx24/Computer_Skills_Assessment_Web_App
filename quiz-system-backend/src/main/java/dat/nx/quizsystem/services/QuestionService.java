package dat.nx.quizsystem.services;

import dat.nx.quizsystem.models.Question;

import java.util.List;
import java.util.Optional;

public interface QuestionService {

    Question createQuestion(Question question);

    List<Question> getAllQuestions();

    List<Question> getQuestionsByTopic(String topic);

    Optional<Question> getQuestionById(Long id);

    Question updateQuestion(Long id, Question updatedQuestion);

    void deleteQuestion(Long id);
}
