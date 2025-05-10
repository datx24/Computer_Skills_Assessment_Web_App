package dat.nx.quizsystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Cấu hình CORS cho tất cả các API trong ứng dụng
        registry.addMapping("/**") // Áp dụng CORS cho tất cả các endpoint
                .allowedOrigins("http://localhost:3000") // Chỉ cho phép yêu cầu từ frontend (localhost:3000)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Các phương thức HTTP được phép
                .allowedHeaders("Content-Type", "Authorization") // Các headers được phép
                .allowCredentials(true); // Cho phép cookies hoặc thông tin đăng nhập
    }
}


