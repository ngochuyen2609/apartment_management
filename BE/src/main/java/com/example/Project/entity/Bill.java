package com.example.Project.entity;

import com.example.Project.enums.Enums;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String apartmentId;
    String apartmentName;

    @OneToMany(mappedBy = "bill", cascade = {CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.EAGER)
    List<ApartmentCharge> apartmentChargeList;
    
    BigDecimal totalPaymentAmount;
    BigDecimal totalAmountPaid;
    BigDecimal totalAmountDue;
    YearMonth monthYear;
    Enums.BillStatus status; // Còn thiếu / Trả đủ
    Enums.PaymentMethod paymentMethod; // Tiền mặt / Chuyển khoản / Quét thẻ
    LocalDateTime createAt;
    LocalDateTime updateAt;

    // tinh totalPaymentAmount
    public void setTotalPaymentAmount() {
        if (apartmentChargeList == null || apartmentChargeList.isEmpty()) {
            totalPaymentAmount = BigDecimal.ZERO;
            return;
        }

        totalPaymentAmount = BigDecimal.ZERO;

        for (ApartmentCharge apartmentCharge : apartmentChargeList) {
            if (apartmentCharge.getChargeAmount() != null) {
                totalPaymentAmount = totalPaymentAmount.add(apartmentCharge.getChargeAmount());
            }
        }
    }
    // tinh totalAmountDue
    public void setTotalAmountDue() {
        if (totalPaymentAmount == null) {
            totalPaymentAmount = BigDecimal.ZERO;
        }

        if (totalAmountPaid == null) {
            totalAmountPaid = BigDecimal.ZERO;
        }

        totalAmountDue = totalPaymentAmount.subtract(totalAmountPaid);
    }

    @PrePersist
    protected void onCreate() {
        createAt = LocalDateTime.now();
        setTotalPaymentAmount();
        setTotalAmountDue();
    }

    @PreUpdate
    protected void onUpdate() {
        updateAt = LocalDateTime.now();
        setTotalPaymentAmount();
        setTotalAmountDue();
    }
}
