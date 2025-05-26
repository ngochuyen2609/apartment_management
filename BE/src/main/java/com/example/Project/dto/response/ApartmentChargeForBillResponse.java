package com.example.Project.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApartmentChargeForBillResponse {
    String chargeId;
    String chargeName;
    BigDecimal unitQuantity;
    BigDecimal chargeAmount;
    BigDecimal unitAmount;
    String unitMeasurement;
}
