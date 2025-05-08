package dat.nx.quizsystem.services;
import dat.nx.quizsystem.dto.LoginRequest;
import dat.nx.quizsystem.dto.RegisterRequest;
import dat.nx.quizsystem.dto.LoginResponse;

public interface UserService {
    void register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
}