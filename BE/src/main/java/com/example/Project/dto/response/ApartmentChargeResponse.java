package com.example.Project.dto.response;

import com.example.Project.enums.Enums;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApartmentChargeResponse {
    String id;
    String apartmentId;
    String apartmentName;
    String chargeId;
    String chargeName;
    Enums.ChargeType chargeType;
    BigDecimal chargeAmount;
    BigDecimal unitQuantity;
    BigDecimal unitAmount;
    String unitMeasurement;
    BigDecimal amountPaid;
    Enums.PaymentMethod paymentMethod;
    LocalDateTime createAt;
    LocalDateTime updateAt;
}
