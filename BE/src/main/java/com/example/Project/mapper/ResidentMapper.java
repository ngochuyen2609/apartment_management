package com.example.Project.mapper;

import com.example.Project.dto.request.resident.ResidentRequest;
import com.example.Project.dto.response.ResidentResponse;
import com.example.Project.entity.Resident;
import jakarta.validation.Valid;

import java.util.List;

import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ResidentMapper {
    Resident toResident(ResidentRequest request);

    @Mapping(source = "apartment.id", target = "apartmentId")
    @Mapping(source = "apartment.apartmentName", target = "apartmentName")
    @Mapping(source = "id", target = "id")
    ResidentResponse toResidentResponse(Resident resident);

    List<ResidentResponse> toResidentResponseList(List<Resident> residentList);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void mapResident(@MappingTarget Resident resident, @Valid ResidentRequest request);

}
