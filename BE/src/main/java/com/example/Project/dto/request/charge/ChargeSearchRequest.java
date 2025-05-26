package com.example.Project.dto.request.charge;

import com.example.Project.enums.Enums;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;


@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChargeSearchRequest {

    String chargeName;
    Enums.ChargeType type;
    String description;
    Double unitAmount; // Phí/Đơn vị
    String unitMeasurement; // Đơn vị đo lường
}
