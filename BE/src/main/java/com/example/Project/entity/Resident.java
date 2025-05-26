package com.example.Project.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.Project.enums.Enums;
import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Resident {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "apartment_id", referencedColumnName = "id")
    Apartment apartment;

    String residentName;

    @Enumerated(EnumType.STRING)
    Enums.ResidentRole role;

    String phoneNumber;
    LocalDate birthday; 
    Number identityNumber; // Căn cước công dân
    String placeOfBirth; // Nơi sinh
    String nationality; // Quốc tịch
    String ethnicLanguage; // Ngôn ngữ
    String ethnicity; // Dân tộc   
    String educationLevel; // Trình độ học vấn
    String languageProficiency; // Trình độ ngoại ngữ
    String occupation; // Nghề nghiệp
    String aliasName; // Tên khác
    
    @Enumerated(EnumType.STRING)
    Enums.ResidentGender gender; // Giói tính

    String hometown; // Quê quán
    String religion; // Tôn giáo
    String passportNumber; // Số hộ chiếu
    String professionalQualification; // Trình độ chuyên môn
    String workplace; // Nơi làm việc
    String permanentAddress; // Địa chỉ thường trú
    String temporaryAddress; // Địa chỉ tạm trú
    LocalDateTime createAt;
    LocalDateTime updateAt;

    @PrePersist
    protected void onCreate() { createAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updateAt = LocalDateTime.now();
    }
}
