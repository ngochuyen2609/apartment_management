package com.example.Project.mapper;


import com.example.Project.dto.request.apartment.ApartmentRequest;

import com.example.Project.entity.Apartment;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ApartmentMapper {
    Apartment toApartment(ApartmentRequest apartmentRequest);
    void mapApartment(@MappingTarget Apartment apartment, ApartmentRequest apartmentRequest);
}
