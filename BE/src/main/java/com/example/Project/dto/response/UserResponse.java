package com.example.Project.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String userId;
    private String username;
    private String refreshToken;
    private long refreshTokenExpired;
    private String accessToken;
    private long accessTokenExpired;
}
