package com.example.Project.dto.request.resident;

import com.example.Project.enums.Enums;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResidentSearchRequest {
    String apartmentId;

    String residentName;

    Enums.ResidentRole role;

    String phoneNumber;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate birthday;

    String permanentAddress;

    String temporaryAddress;

    Number identityNumber; // Căn cước công dân

    String placeOfBirth; // Nơi sinh
    String nationality; // Quốc tịch
    String ethnicLanguage; // Ngôn ngữ
    String ethnicity; // Dân tộc   
    String educationLevel; // Trình độ học vấn
    String languageProficiency; // Trình độ ngoại ngữ
    String occupation; // Nghề nghiệp
    String aliasName; // Tên khác
    
    Enums.ResidentGender gender;

    String hometown; // Quê quán
    String religion; // Tôn giáo
    String passportNumber; // Số hộ chiếu
    String professionalQualification; // Trình độ chuyên môn
    String workplace; // Nơi làm việc
}
