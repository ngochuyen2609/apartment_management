package com.example.Project.controller;


import com.example.Project.dto.request.bill.BillRequest;
import com.example.Project.dto.request.bill.BillSearchRequest;
import com.example.Project.dto.response.ApiResponse;
import com.example.Project.dto.response.BillResponse;
import com.example.Project.entity.Bill;
import com.example.Project.mapper.ApartmentChargeMapper;
import com.example.Project.mapper.BillMapper;
import com.example.Project.service.BillService;
import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Data
@RestController
@RequestMapping("/project/bill")
public class BillController {
    @Autowired
    private BillService billService;

    @Autowired
    private BillMapper billMapper;

    @Autowired
    private ApartmentChargeMapper apartmentChargeMapper;

    @PostMapping
    public ApiResponse<BillResponse> create(@RequestBody @Valid BillRequest request) {
        Bill bill = billService.create(request);
        BillResponse response = billMapper.toBillResponse(bill, apartmentChargeMapper);
        System.out.println(response.getApartmentChargeList());
        return ApiResponse.<BillResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(response)
                .build();
    }

    @GetMapping
    public ApiResponse<List<BillResponse>> getAll() {
        List<Bill> bills = billService.getAll();
        List<BillResponse> responses = new ArrayList<>();
        for(Bill bill : bills) {
            BillResponse response = billMapper.toBillResponse(bill, apartmentChargeMapper);
            responses.add(response);
        }
        return ApiResponse.<List<BillResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(responses)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<BillResponse> getById(@PathVariable String id) {
        Bill bill = billService.getById(id);
        BillResponse response = billMapper.toBillResponse(bill, apartmentChargeMapper);
        return ApiResponse.<BillResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(response)
                .build();
    }

    @PostMapping("/search")
    public ApiResponse<List<BillResponse>> search(@RequestBody @Valid BillSearchRequest request) {
        List<Bill> billList = billService.search(request);
        List<BillResponse> responses = billMapper.toBillResponseList(billList);
        return ApiResponse.<List<BillResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(responses)
                .build();
    }

    @PatchMapping("/{id}")
    public ApiResponse<BillResponse> updateById (@PathVariable String id, @RequestBody @Valid BillRequest request) {
        Bill bill = billService.updateById(id, request);
        BillResponse response = billMapper.toBillResponse(bill, apartmentChargeMapper);
        return ApiResponse.<BillResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(response)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteById(@PathVariable String id) {
        billService.deleteById(id);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(null)
                .build();
    }

    @DeleteMapping
    public ApiResponse<Void> deleteAll() {
        billService.deleteAll();
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(null)
                .build();
    }

}
