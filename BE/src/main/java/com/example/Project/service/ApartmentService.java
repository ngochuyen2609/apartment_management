package com.example.Project.service;

import com.example.Project.dto.request.apartment.ApartmentRequest;
import com.example.Project.dto.request.apartment.ApartmentSearchRequest;
import com.example.Project.entity.Apartment;
import com.example.Project.mapper.ApartmentMapper;
import com.example.Project.repository.ApartmentRepository;
import com.example.Project.repository.ResidentRepository;
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

public class ApartmentService {
    @Autowired
    private ApartmentRepository apartmentRepository;

    @Autowired
    private ApartmentMapper apartmentMapper;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ResidentRepository residentRepository;

    @Autowired
    private PredicateBuilder predicateBuilder;

    public Apartment create(ApartmentRequest apartmentRequest) {
        Apartment apartment = apartmentMapper.toApartment(apartmentRequest);
        return apartmentRepository.save(apartment);
    }

    public List<Apartment> getAll() {
        return apartmentRepository.findAll();
    }

    public Apartment getById(String id) {
        return apartmentRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy mã chung cư"));
    }

    public List<Apartment> search(@Valid ApartmentSearchRequest request) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Apartment> query = criteriaBuilder.createQuery(Apartment.class);
        Root<Apartment> root = query.from(Apartment.class);
        Predicate predicate = predicateBuilder.createPredicatesToSearch(request, criteriaBuilder, root);
        query.select(root).where(predicate);
        return entityManager.createQuery(query).getResultList();
    }

    public void deleteById(String id) {
        apartmentRepository.deleteById(id);
    }

    public void deleteAll() {
        apartmentRepository.deleteAll();
    }

    public Apartment updateById(String id, ApartmentRequest apartmentRequest) {
        Apartment apartment = getById(id);
        apartmentMapper.mapApartment(apartment, apartmentRequest);
        return apartmentRepository.save(apartment);
    }
}
