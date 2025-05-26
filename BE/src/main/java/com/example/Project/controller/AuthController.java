package com.example.Project.controller;

import com.example.Project.dto.request.auth.LoginRequest;
import com.example.Project.dto.request.auth.RegisterRequest;
import com.example.Project.dto.response.ApiResponse;
import com.example.Project.security.JwtService;
import com.example.Project.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/project/auth")
@RequiredArgsConstructor
public class AuthController {//quan ly mapping
    @Autowired
    AuthService authService;
    @Autowired
    private JwtService jwtService;
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return authService.register(registerRequest);
    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<?> login(@Valid  @RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @GetMapping("/verify")
    public ApiResponse<?> verify() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
            String userId = authentication.getName();
            return authService.get(userId);
        } else {
            throw new BadCredentialsException("User is not authenticated");
        }
    }

    @PostMapping("/logout")
    public ApiResponse<String> logout(HttpServletRequest request) {
        // Lấy token từ header Authorization
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            // Không tìm thấy token hoặc không hợp lệ
            return new ApiResponse<>(HttpStatus.OK.value(), "logout failure", null);
        }

        String token = authorizationHeader.substring(7); // Bỏ "Bearer " ra khỏi chuỗi token

        // Thêm token vào blacklist
        jwtService.logout(token);

        // Trả về phản hồi thành công
        return new ApiResponse<>(HttpStatus.OK.value(), "logout successful", null);
    }

}
