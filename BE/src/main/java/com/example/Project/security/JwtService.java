package com.example.Project.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import com.example.Project.dto.response.UserResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class JwtService {

    @Value("${token.jwt.secret}") // Load secret from application.properties
    private String secretKey;

    @Value("${token.jwt.expiration}") // Load token expiration from config
    private long expirationTime;

    @Bean
    public Key signingKey() {
        return new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS256.getJcaName());
    }

    // Generate JWT token
    public void generateToken(UserResponse userResponse) {
        Claims claims = Jwts.claims().setSubject(userResponse.getUserId());
        Instant now = Instant.now();
        Instant expired = now.plusSeconds(expirationTime);

        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(expired))
                .signWith(signingKey(), SignatureAlgorithm.HS256) // Use the signingKey() method
                .compact();

        userResponse.setAccessToken(accessToken);
        userResponse.setAccessTokenExpired(expired.toEpochMilli());
    }

    public String extractSubject(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(signingKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } catch (Exception e) {
            return null; // Consider logging the exception for better debugging
        }
    }

    private final Set<String> tokenBlacklist = new HashSet<>(); // Danh sách đen token

    // Thêm token vào blacklist
    public void invalidateToken(String token) {
        tokenBlacklist.add(token); // Thêm token vào danh sách blacklist
    }

    // Kiểm tra token có bị vô hiệu hóa không
    public boolean isTokenBlacklisted(String token) {
        return tokenBlacklist.contains(token); // Kiểm tra token có bị vô hiệu hóa không
    }

    // Phương thức logout
    public void logout(String token) {
            invalidateToken(token); // Thêm token vào blacklist
        }
}
