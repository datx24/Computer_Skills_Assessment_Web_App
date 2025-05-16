package dat.nx.quizsystem.repositories;

import dat.nx.quizsystem.models.Result;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Integer> {
}
