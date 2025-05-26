package com.example.Project.dto.response;

import com.example.Project.enums.Enums;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResidentResponse {
    String id;
    String apartmentId;
    String apartmentName;
    String residentName;
    Enums.ResidentRole role;
    String phoneNumber;
    LocalDate birthday;
    String permanentAddress;
    String temporaryAddress;
    LocalDateTime createAt;
    LocalDateTime updateAt;
    Number identityNumber; // Căn cước công dân
    String placeOfBirth; // Nơi sinh
    String nationality; // Quốc tịch
    String ethnicLanguage; // Ngôn ngữ
    String ethnicity; // Dân tộc   
    String educationLevel; // Trình độ học vấn
    String languageProficiency; // Trình độ ngoại ngữ
    String occupation; // Nghề nghiệp
    String aliasName; // Tên khác
    Enums.ResidentGender gender; // Giói tính
    String hometown; // Quê quán
    String religion; // Tôn giáo
    String passportNumber; // Số hộ chiếu
    String professionalQualification; // Trình độ chuyên môn
    String workplace; // Nơi làm việc
}
