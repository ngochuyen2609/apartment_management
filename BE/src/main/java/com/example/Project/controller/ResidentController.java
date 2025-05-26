package com.example.Project.controller;


import com.example.Project.dto.request.resident.ResidentFilterRequest;
import com.example.Project.dto.request.resident.ResidentRequest;
import com.example.Project.dto.request.resident.ResidentSearchRequest;
import com.example.Project.dto.response.ApiResponse;
import com.example.Project.dto.response.ResidentResponse;
import com.example.Project.entity.Resident;
import com.example.Project.mapper.ResidentMapper;
import com.example.Project.service.ResidentService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/project/resident")
@Data
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ResidentController {

    @Autowired
    ResidentService residentService;

    @Autowired
    ResidentMapper residentMapper;

    @PostMapping
    ApiResponse<ResidentResponse> create(@RequestBody @Valid ResidentRequest request){
        Resident resident = residentService.create(request);
        ResidentResponse response = residentMapper.toResidentResponse(resident);
        return ApiResponse.<ResidentResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(response)
                .build();
    }

    @GetMapping
    ApiResponse<List<ResidentResponse>> getAll(){
        List<Resident> residents = residentService.getAll();
        List<ResidentResponse> responses = new ArrayList<>();
        for(Resident resident : residents) {
            ResidentResponse response = residentMapper.toResidentResponse(resident);
            responses.add(response);
        }
        return ApiResponse.<List<ResidentResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(responses)
                .build();
    }

    @GetMapping("getInApartment/{apartmentId}")
    ApiResponse<List<ResidentResponse>> getInApartment(@PathVariable String apartmentId){
        List<Resident> residents = residentService.getInApartment(apartmentId);
        List<ResidentResponse> responses = new ArrayList<>();
        for(Resident resident : residents) {
            ResidentResponse response = residentMapper.toResidentResponse(resident);
            responses.add(response);
        }
        return ApiResponse.<List<ResidentResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(responses)
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<ResidentResponse> getById(@PathVariable String id){
        Resident resident = residentService.getById(id);
        ResidentResponse response = residentMapper.toResidentResponse(resident);
        return ApiResponse.<ResidentResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(response)
                .build();
    }

    @PatchMapping("/{id}")
    ApiResponse<ResidentResponse> updateById(@PathVariable String id,@RequestBody @Valid ResidentRequest request){
        Resident resident = residentService.updateById(id, request);
        ResidentResponse response = residentMapper.toResidentResponse(resident);
        return ApiResponse.<ResidentResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(response)
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> delete(@PathVariable String id){
        residentService.deleteById(id);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(null)
                .build();
    }

    @PostMapping("/search")
    public ApiResponse<List<ResidentResponse>> search(@RequestBody @Valid ResidentSearchRequest request) {
        List<Resident> residentList = residentService.search(request);
        List<ResidentResponse> responses = residentMapper.toResidentResponseList(residentList);
        return ApiResponse.<List<ResidentResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(responses)
                .build();
    }

    @PostMapping("/filter")
    public ApiResponse<List<ResidentResponse>> filter(@RequestBody @Valid ResidentFilterRequest request) {
        List<Resident> residentList = residentService.filter(request);
        List<ResidentResponse> responses = residentMapper.toResidentResponseList(residentList);
        return ApiResponse.<List<ResidentResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(responses)
                .build();
    }
}
