package com.example.Project.dto.request.bill;

import com.example.Project.dto.request.apartmentCharge.ApartmentChargeRequest;
import com.example.Project.enums.Enums;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BillRequest {

    @NotNull(message = "Id phòng không được để trống")
    String apartmentId;

    List<ApartmentChargeRequest> apartmentChargeRequestList;

    @Builder.Default
    @PositiveOrZero(message = "Số tiền đã thanh toán phải là số không âm")
    BigDecimal totalAmountPaid = BigDecimal.ZERO;

    @NotNull(message = "Tháng thu phí không được để trống")
    YearMonth monthYear;

    @Builder.Default
    Enums.BillStatus status = Enums.BillStatus.UNPAID; // Còn thiếu / Trả đủ

    Enums.PaymentMethod paymentMethod;
}
