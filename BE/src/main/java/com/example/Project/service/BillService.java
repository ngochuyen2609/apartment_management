package com.example.Project.service;
import com.example.Project.dto.request.apartmentCharge.ApartmentChargeRequest;
import com.example.Project.dto.request.bill.BillRequest;
import com.example.Project.dto.request.bill.BillSearchRequest;
import com.example.Project.entity.ApartmentCharge;
import com.example.Project.entity.Bill;
import com.example.Project.entity.Charge;
import com.example.Project.enums.Enums.BillStatus;
import com.example.Project.entity.Apartment;
import com.example.Project.mapper.ApartmentChargeMapper;
import com.example.Project.mapper.BillMapper;
import com.example.Project.repository.ApartmentChargeRepository;
import com.example.Project.repository.BillRepository;
import com.example.Project.utils.PredicateBuilder;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BillMapper billMapper;

    @Autowired
    PredicateBuilder predicateBuilder;

    @Autowired
    private ApartmentChargeService apartmentChargeService;

    @Autowired
    private ApartmentChargeMapper apartmentChargeMapper;

    @Autowired
    private ApartmentService apartmentService;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ChargeService chargeService;

    @Transactional
    public Bill create(BillRequest request) {
        List<ApartmentCharge> apartmentChargeList = new ArrayList<>();
        Apartment apartment = apartmentService.getById(request.getApartmentId());
        if (apartment == null) {
            throw new NoSuchElementException("Mã căn hộ không tồn tại");
        }
        Bill bill = billMapper.toBill(request);
        bill.setApartmentName(apartment.getApartmentName());
        for(ApartmentChargeRequest request1 : request.getApartmentChargeRequestList()) {
            request1.setApartmentId(request.getApartmentId());
            ApartmentCharge apartmentCharge = apartmentChargeService.create(request1);
            apartmentCharge.setBill(bill);
            apartmentChargeList.add(apartmentCharge);
        }
        bill.setApartmentChargeList(apartmentChargeList);
        return billRepository.save(bill);
    }

    public List<Bill> getAll() {
        return billRepository.findAll();
    }

    public Bill getById(String id) {
        return billRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy hóa đơn"));
    }

    public List<Bill> search(@Valid BillSearchRequest request) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Bill> query = criteriaBuilder.createQuery(Bill.class);
        Root<Bill> root = query.from(Bill.class);
        Predicate predicate = predicateBuilder.createPredicatesToSearch(request, criteriaBuilder, root);
        query.select(root).where(predicate);
        return entityManager.createQuery(query).getResultList();
    }

    @Transactional
    public void deleteById(String id) {
        billRepository.deleteById(id);
    }

    public void deleteAll() {
        billRepository.deleteAll();
    }

    @Transactional
    public Bill updateById(String id, BillRequest request) {
        Bill bill = getById(id);
        List<ApartmentCharge> apartmentChargeList = bill.getApartmentChargeList();
        List<ApartmentChargeRequest> apartmentChargeRequestList = request.getApartmentChargeRequestList();
        List<ApartmentCharge> updateApartmentChargeList = new ArrayList<>();
        Apartment apartment = apartmentService.getById(request.getApartmentId());
        if (apartment == null) {
            throw new NoSuchElementException("Mã căn hộ không tồn tại");
        }
        bill.setApartmentName(apartment.getApartmentName());
        BigDecimal totalPaymentAmount = BigDecimal.ZERO;
        for (int i = 0; i < apartmentChargeList.size(); i++) {
            ApartmentCharge apartmentCharge = apartmentChargeList.get(i);
            Charge charge = apartmentCharge.getCharge();
        
            ApartmentChargeRequest matchingRequest = null;
            for (ApartmentChargeRequest request2 : apartmentChargeRequestList) {
                if (request2.getChargeId().equals(charge.getId())) {
                    matchingRequest = request2;
                    break;
                }
            }
        
            if (matchingRequest != null) {
                apartmentChargeMapper.mapApartmentCharge(apartmentCharge, matchingRequest);
                apartmentCharge.setChargeAmount(apartmentCharge.getUnitQuantity().multiply(charge.getUnitAmount()));
                updateApartmentChargeList.add(apartmentCharge);
                totalPaymentAmount = totalPaymentAmount.add(apartmentCharge.getChargeAmount());
            }
        }
        
        bill.setApartmentChargeList(updateApartmentChargeList);
        billMapper.mapBill(bill, request);
        bill.setTotalPaymentAmount(totalPaymentAmount);
        if(bill.getTotalAmountPaid().compareTo(bill.getTotalPaymentAmount()) < 0) {
            if(bill.getTotalAmountPaid().compareTo(BigDecimal.ZERO) > 0)
                bill.setStatus(BillStatus.PARTIAL);
        } else {
            bill.setStatus(BillStatus.PAID);
        }
        return billRepository.save(bill);
    }

}
