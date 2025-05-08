package dat.nx.quizsystem.DTO;
import lombok.*;

@Data
public class LoginResponse {
    private String token;
    private String username;
    private String role;
}
