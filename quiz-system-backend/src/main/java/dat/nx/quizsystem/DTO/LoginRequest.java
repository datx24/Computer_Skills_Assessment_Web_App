package dat.nx.quizsystem.DTO;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
public class LoginRequest {
    // Tên người dùng không được để trống
    @NotBlank(message = "Username is required")
    private String username;

    // Mật khẩu không được để trống
    @NotBlank(message = "Password is required")
    private String password;
}
