package com.example.Project.dto.request.charge;

import com.example.Project.enums.Enums;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChargeRequest {
    @NotNull(message = "Tên phí không được để trống")
    String chargeName;

    @NotNull(message = "Loại phí không được để trống")
    Enums.ChargeType type;

    String description;

    @Builder.Default
    Double unitAmount = (double) 0; // Phí/Đơn vị

    String unitMeasurement; // Đơn vị đo lường

    @Builder.Default
    LocalDateTime chargeDate = LocalDateTime.now();

    LocalDateTime dueDate;
}
