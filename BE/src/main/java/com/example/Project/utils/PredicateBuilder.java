package com.example.Project.utils;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class PredicateBuilder {
    private static final Map<String, String> FIELD_MAPPING = Map.of(
        "apartmentId", "apartment.id", // ánh xạ request.apartmentId -> request.apartment.id
        "chargeId", "charge.id" // ánh xạ request.chargeId -> request.charge.id
    );

    // Tổng hợp các điều kiện truy vấn
    public <R, T> Predicate createPredicatesToSearch(R request, CriteriaBuilder criteriaBuilder, Root<T> root ) {
        List<Predicate> predicates = new ArrayList<>();
        for(Field field : request.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            try {
                Object value = field.get(request);
                if(value != null) {
                    String fieldName = field.getName();
                    if (FIELD_MAPPING.containsKey(fieldName)) {
                        String[] nestedFields = FIELD_MAPPING.get(fieldName).split("\\.");
                        Predicate nestedPredicate = createNestedPredicate(root, criteriaBuilder, nestedFields, value);
                        predicates.add(nestedPredicate);
                    } else {
                        predicates.add(criteriaBuilder.equal(root.get(fieldName), value));
                    }
                }
            }
            catch (IllegalAccessException e) {
                throw new RuntimeException("Thất bại trong truy cập trường: " + field.getName());
            }
        }
        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
    
    private <T> Predicate createNestedPredicate(Root<T> root, CriteriaBuilder criteriaBuilder, String[] fields, Object value) {
        if (fields.length == 1) {
            return criteriaBuilder.equal(root.get(fields[0]), value);
        }
        return criteriaBuilder.equal(root.get(fields[0]).get(fields[1]), value);
    }

    // Filter
    public <R, T> Predicate createPredicatesToFilter(String searchText, CriteriaBuilder criteriaBuilder, Root<T> root, List<String> fields) {
        List<Predicate> predicates = new ArrayList<>();
        String likePattern = "%" + searchText.toLowerCase() + "%";
        for(String field : fields) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get(field)), likePattern));
        }
        return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
    }    
}
