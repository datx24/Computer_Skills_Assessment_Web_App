package dat.nx.quizsystem.services.impl;

import dat.nx.quizsystem.models.Question;
import dat.nx.quizsystem.repositories.QuestionRepository;
import dat.nx.quizsystem.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    //Tạo mới câu hỏi
    @Override
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    //Lấy danh sách tất cả câu hỏi
    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    //Lấy danh sách các câu hỏi theo chủ đề
    @Override
    public List<Question> getQuestionsByTopic(String topic) {
        return questionRepository.findByTopic(topic);
    }

    //Lấy thông tin 1 câu hỏi theo id
    @Override
    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    //Cập nhật thông tin 1 câu hỏi theo id
    @Override
    public Question updateQuestion(Long id, Question updatedQuestion) {
        Optional<Question> existingQuestion = questionRepository.findById(id);
        //Check xem giá trị có tồn tại hay không
        if(existingQuestion.isPresent()) {
            Question question = existingQuestion.get();
            question.setContent(updatedQuestion.getContent());
            question.setOptions(updatedQuestion.getOptions());
            question.setTopic(updatedQuestion.getTopic());
            question.setTopic(updatedQuestion.getTopic());
            return questionRepository.save(question);
        } else {
            throw new RuntimeException("Câu hỏi không tồn tại với ID: " + id);
        }
    }

    //Xóa câu hỏi
    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }
}
