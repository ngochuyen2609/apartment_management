package com.example.Project.dto.request.apartmentCharge;

import com.example.Project.enums.Enums;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApartmentChargeRequest {
    String apartmentId;

    String chargeId;

    @Builder.Default
    @PositiveOrZero(message = "Số lượng phải là số không âm")
    BigDecimal unitQuantity =  BigDecimal.ZERO;

    @Builder.Default
    @PositiveOrZero(message = "Số tiền đã thanh toán phải là số không âm")
    BigDecimal amountPaid =  BigDecimal.ZERO;

    Enums.PaymentMethod paymentMethod;
}
