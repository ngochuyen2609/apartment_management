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

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApartmentCharge {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "charge_id", referencedColumnName = "id")
    Charge charge;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "apartment_id", referencedColumnName = "id")
    Apartment apartment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bill_id", referencedColumnName = "id")
    Bill bill;

    BigDecimal chargeAmount;
    BigDecimal unitQuantity;
    BigDecimal amountPaid;
    @Enumerated(EnumType.STRING)
    Enums.PaymentMethod paymentMethod;
    LocalDateTime createAt;
    LocalDateTime updateAt;


    public void setChargeAmount() {
        if (charge != null && charge.getUnitAmount() != null) {
            this.chargeAmount = charge.getUnitAmount().multiply(unitQuantity);
        }
    }

    @PrePersist
    protected void onCreate() {
        createAt = LocalDateTime.now();
        setChargeAmount();
    }

    @PreUpdate
    protected void onUpdate() {
        updateAt = LocalDateTime.now();
        setChargeAmount();
    }
}
