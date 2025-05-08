package dat.nx.quizsystem.dto;
import lombok.*;

@Data
public class LoginResponse {
    private String token;
    private String username;
    private String role;
}
