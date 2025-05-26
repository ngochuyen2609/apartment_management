package com.example.Project.entity;

import com.example.Project.enums.Enums;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Charge {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String chargeName;
    @Enumerated(EnumType.STRING)
    Enums.ChargeType type;
    String description;
    BigDecimal unitAmount; // Phí/Đơn vị
    String unitMeasurement; // Đơn vị đo lường
    LocalDateTime chargeDate;
    LocalDateTime dueDate;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
