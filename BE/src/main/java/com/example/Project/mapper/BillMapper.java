package com.example.Project.mapper;

import com.example.Project.dto.request.bill.BillRequest;
import com.example.Project.dto.response.BillResponse;
import com.example.Project.entity.Bill;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;


@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface BillMapper {
    Bill toBill(BillRequest request);

    @Mapping(target = "apartmentChargeList", expression = "java(apartmentChargeMapper.toApartmentChargeForBillResponseList(bill.getApartmentChargeList()))")
    BillResponse toBillResponse(Bill bill, ApartmentChargeMapper apartmentChargeMapper);

    List<BillResponse> toBillResponseList(List<Bill> billList);

    void mapBill(@MappingTarget Bill bill, BillRequest request);

}
