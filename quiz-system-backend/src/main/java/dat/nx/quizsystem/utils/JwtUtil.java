package dat.nx.quizsystem.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(String username, String role, Long userId) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .claim("userId", userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS512)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public Long extractUserIdFromToken(String token) {
        try {
            System.out.println("Đang phân tích token: " + token.substring(0, Math.min(token.length(), 20)) + "...");
            Object userIdObj = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .get("userId");
            if (userIdObj == null) {
                System.err.println("Không tìm thấy userId trong token");
                throw new RuntimeException("userId missing in token");
            }
            if (userIdObj instanceof Integer) {
                System.out.println("userId type: Integer, giá trị: " + userIdObj);
                return ((Integer) userIdObj).longValue();
            } else if (userIdObj instanceof Long) {
                System.out.println("userId type: Long, giá trị: " + userIdObj);
                return (Long) userIdObj;
            } else if (userIdObj instanceof String) {
                System.out.println("userId type: String, giá trị: " + userIdObj);
                return Long.parseLong((String) userIdObj);
            } else {
                System.err.println("Kiểu userId không mong đợi: " + (userIdObj != null ? userIdObj.getClass() : "null"));
                throw new RuntimeException("Unexpected userId type: " + (userIdObj != null ? userIdObj.getClass() : "null"));
            }
        } catch (ExpiredJwtException e) {
            System.err.println("Token hết hạn: " + e.getMessage());
            throw new RuntimeException("Invalid token or userId missing: Token expired", e);
        } catch (SignatureException e) {
            System.err.println("Chữ ký token không hợp lệ: " + e.getMessage());
            throw new RuntimeException("Invalid token or userId missing: Invalid signature", e);
        } catch (MalformedJwtException e) {
            System.err.println("Token sai định dạng: " + e.getMessage());
            throw new RuntimeException("Invalid token or userId missing: Malformed token", e);
        } catch (Exception e) {
            System.err.println("Lỗi phân tích token: " + e.getMessage());
            throw new RuntimeException("Invalid token or userId missing: " + e.getMessage(), e);
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.err.println("Token hết hạn: " + e.getMessage());
            return false;
        } catch (SignatureException e) {
            System.err.println("Chữ ký token không hợp lệ: " + e.getMessage());
            return false;
        } catch (MalformedJwtException e) {
            System.err.println("Token sai định dạng: " + e.getMessage());
            return false;
        } catch (Exception e) {
            System.err.println("Lỗi xác thực token: " + e.getMessage());
            return false;
        }
    }
}