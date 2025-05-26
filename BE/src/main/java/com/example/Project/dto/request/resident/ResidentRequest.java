package com.example.Project.dto.request.resident;

import com.example.Project.enums.Enums;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResidentRequest {

    @NotNull(message = "Căn hộ không được để trống")
    String apartmentId;

    @NotNull(message = "Tên cư dân không được để trống")
    String residentName;

    @Builder.Default
    Enums.ResidentRole role = Enums.ResidentRole.NON_OWNER;

    @Pattern(regexp = "^[0-9]{10}$", message = "Định dạng số điện thoại không hợp lệ")
    String phoneNumber;

    @NotNull(message = "Ngày sinh không được để trống")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate birthday;

    @NotNull(message = "Địa chỉ thường trú không được để trống")
    String permanentAddress;

    String temporaryAddress;

    @NotNull(message = "Căn cước không được để trống")
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
