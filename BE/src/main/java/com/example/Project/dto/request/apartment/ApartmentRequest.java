package com.example.Project.dto.request.apartment;


import com.example.Project.enums.Enums;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApartmentRequest {

    @NotNull(message = "Tên căn hộ không được để trống")
    private String apartmentName;

    @NotNull(message = "Số tầng không được để trống")
    @Positive(message = "Số tầng phải là số dương")
    private Integer floorNumber;

    @NotNull(message = "Mã số căn hộ không được để trống")
    private Integer apartmentNumber;

    @NotNull(message = "Diện tích căn hộ không được để trống")
    @PositiveOrZero(message = "Diện tích phải là số không âm")
    private Double area;

    private String ownerId;

    @Builder.Default
    private Enums.ApartmentStatus status = Enums.ApartmentStatus.AVAILABLE;
}
