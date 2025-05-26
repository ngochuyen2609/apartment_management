package com.example.Project.dto.response;

import com.example.Project.enums.Enums;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillResponse {

    String id;
    String apartmentId;
    String apartmentName;
    List<ApartmentChargeForBillResponse> apartmentChargeList;
    BigDecimal totalPaymentAmount;
    BigDecimal totalAmountPaid;
    BigDecimal totalAmountDue;
    YearMonth monthYear;
    Enums.BillStatus status;    // Còn thiếu / Trả đủ
    Enums.PaymentMethod paymentMethod;  // Tiền mặt / Chuyển khoản / Quét thẻ
    LocalDateTime createAt;
    LocalDateTime updateAt;
}
