package dat.nx.quizsystem.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
public class RegisterRequest {

    // Username không được để trống
    // Độ dài phải từ 3 đến 50 ký tự
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;

    // Password không được để trống
    // Độ dài tối thiểu 6 ký tự
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    // Email không được để trống
    // Phải đúng định dạng email
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    // Thuộc tính xác định vai trò người dùng
    private String role;
}
