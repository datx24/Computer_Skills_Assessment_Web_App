package dat.nx.quizsystem.services;

public interface ResultService {
    void saveResult(Long examId, Long userId, int score);
}
