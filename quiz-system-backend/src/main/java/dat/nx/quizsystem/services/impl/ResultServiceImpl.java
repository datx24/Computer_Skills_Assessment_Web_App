package dat.nx.quizsystem.services.impl;

import dat.nx.quizsystem.models.Result;
import dat.nx.quizsystem.repositories.ResultRepository;
import dat.nx.quizsystem.services.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ResultServiceImpl implements ResultService {
    @Autowired
    private ResultRepository resultRepository;

    @Override
    public void saveResult(Long examId, Long userId, int score) {
        Result result = new Result(examId, userId, score, LocalDateTime.now());
        resultRepository.save(result);
    }
}
