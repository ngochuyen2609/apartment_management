package com.example.Project.entity;

import com.example.Project.enums.Enums;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Apartment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String apartmentName;
    private Integer floorNumber;
    private Integer apartmentNumber;
    private BigDecimal area;
    private String ownerId;
    @Enumerated(EnumType.STRING)
    private Enums.ApartmentStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updateAt = LocalDateTime.now();
    }
}
