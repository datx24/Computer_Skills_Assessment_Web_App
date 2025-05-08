package dat.nx.quizsystem.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

public class LoginRequest {
    // Tên người dùng không được để trống
    @NotBlank(message = "Username is required")
    private String username;

    // Mật khẩu không được để trống
    @NotBlank(message = "Password is required")
    private String password;

    public @NotBlank(message = "Username is required") String getUsername() {
        return username;
    }

    public @NotBlank(message = "Password is required") String getPassword() {
        return password;
    }
}
