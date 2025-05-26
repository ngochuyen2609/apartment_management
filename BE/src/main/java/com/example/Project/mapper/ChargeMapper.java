package com.example.Project.mapper;

import com.example.Project.dto.request.charge.ChargeRequest;
import com.example.Project.entity.Charge;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ChargeMapper {
    Charge toCharge(ChargeRequest request);
    void mapCharge(@MappingTarget Charge charge, ChargeRequest request);
}
