package com.example.Project.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)//UUID ,AUTO
    private String userId;//danh dau day la id

    @Column(unique = true, nullable = false, length = 64)
    private String username;
    @Column(length = 512)
    private String password;
    @Column(length = 512)
    private String refreshToken;
    private Long refreshTokenExpired;
}
