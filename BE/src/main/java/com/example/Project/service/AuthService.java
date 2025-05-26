package com.example.Project.service;

import com.example.Project.dto.request.auth.LoginRequest;
import com.example.Project.dto.request.auth.RegisterRequest;
import com.example.Project.dto.response.ApiResponse;
import com.example.Project.dto.response.UserResponse;
import com.example.Project.entity.User;
import com.example.Project.repository.UserRepository;
import com.example.Project.mapper.UserMapper;
import com.example.Project.security.JwtService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Value("${token.refresh.expiration}") // Load token expiration from config
    private long refreshTokenExpirationTime;

    @Autowired
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public ApiResponse<?> login(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new EntityNotFoundException("Tên đăng nhập không hợp lệ"));

        //password wrong
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), "Mật khẩu sai", null);
        }

        //refreshtoken
        user.setRefreshToken(generateRefreshToken());
        user.setRefreshTokenExpired(
                Instant.now()
                        .plusSeconds(refreshTokenExpirationTime)
                        .toEpochMilli()
        );

        userRepository.save(user);
        UserResponse userResponse = userMapper.toUserDTO(user);
        jwtService.generateToken(userResponse);
        return new ApiResponse<>(HttpStatus.OK.value(), "Login Success", userResponse);
    }

    public ApiResponse<?> register(RegisterRequest registerRequest) {
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            return new ApiResponse<>(HttpStatus.CONFLICT.value(), "Tên đăng nhập đã tồn tại", null);
        }
        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        newUser.setRefreshToken(generateRefreshToken());
        newUser.setRefreshTokenExpired(
                Instant.now()
                        .plusSeconds(refreshTokenExpirationTime)
                        .toEpochMilli()
        );
        userRepository.save(newUser);
        UserResponse userResponse = userMapper.toUserDTO(newUser);
        jwtService.generateToken(userResponse);
        return new ApiResponse<>(HttpStatus.OK.value(), "Đăng ký thành công", userResponse);
    }
    public String generateRefreshToken() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] token = new byte[64]; // 64 bytes = 512 bits
        secureRandom.nextBytes(token);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(token);
    }

    public ApiResponse<?> get(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy tài khoản"));

        UserResponse userInfo = userMapper.toUserDTO(user);

        return new ApiResponse<>(HttpStatus.OK.value(), "Thành công", userInfo);
    }
}
