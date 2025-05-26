package com.example.Project.service;

import com.example.Project.dto.request.charge.ChargeRequest;
import com.example.Project.dto.request.charge.ChargeSearchRequest;
import com.example.Project.entity.Charge;
import com.example.Project.mapper.ChargeMapper;
import com.example.Project.repository.ChargeRepository;
import com.example.Project.utils.PredicateBuilder;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Data
@Service
public class ChargeService {
    @Autowired
    private ChargeRepository chargeRepository;

    @Autowired
    private ChargeMapper chargeMapper;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private PredicateBuilder predicateBuilder;

    public Charge create(ChargeRequest chargeCreateRequest) {
        Charge charge = chargeMapper.toCharge(chargeCreateRequest);
        return chargeRepository.save(charge);
    }

    public Charge getById(String id) {
        return chargeRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Không tìm thấy id phi"));
    }

    public List<Charge> getAll() {
        return chargeRepository.findAll();
    }

    public List<Charge> search(@Valid ChargeSearchRequest request) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Charge> criteriaQuery = criteriaBuilder.createQuery(Charge.class);
        Root<Charge> root = criteriaQuery.from(Charge.class);
        Predicate predicate = predicateBuilder.createPredicatesToSearch(request, criteriaBuilder, root);
        criteriaQuery.select(root).where(predicate);
        return  entityManager.createQuery(criteriaQuery).getResultList();
    }

    public void deleteById(String id) {
        chargeRepository.deleteById(id);
    }

    public void deleteAll(){
        chargeRepository.deleteAll();
    }
    public Charge updateById(String id, ChargeRequest chargeRequest) {
        Charge charge = getById(id);
        chargeMapper.mapCharge(charge, chargeRequest);
        return chargeRepository.save(charge);
    }

}
