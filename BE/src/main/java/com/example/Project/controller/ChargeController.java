package com.example.Project.controller;

import com.example.Project.dto.request.charge.ChargeRequest;
import com.example.Project.dto.request.charge.ChargeSearchRequest;
import com.example.Project.dto.response.ApiResponse;
import com.example.Project.entity.Charge;
import com.example.Project.service.ChargeService;
import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Data
@RestController
@RequestMapping("/project/charge")
public class ChargeController {
    @Autowired
    private ChargeService chargeService;

    @PostMapping
    public ApiResponse<Charge> create(@RequestBody @Valid ChargeRequest request) {
        return ApiResponse.<Charge>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(chargeService.create(request))
                .build();
    }
    @GetMapping
    public ApiResponse<List<Charge>> getAll() {
        return ApiResponse.<List<Charge>>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(chargeService.getAll())
                .build();
    }
    @GetMapping("/{id}")
    public ApiResponse<Charge> getById(@PathVariable String id) {
        return ApiResponse.<Charge>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(chargeService.getById(id))
                .build();
    }
    @GetMapping("/search")
    public ApiResponse<List<Charge>> search(@RequestBody @Valid ChargeSearchRequest request) {
        return ApiResponse.<List<Charge>>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(chargeService.search(request))
                .build();
    }
    @PatchMapping("/{id}")
    public ApiResponse<Charge> updateById (@PathVariable String id, @RequestBody @Valid ChargeRequest request) {
        return ApiResponse.<Charge>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(chargeService.updateById(id, request))
                .build();
    }
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteById(@PathVariable String id) {
        chargeService.deleteById(id);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(null)
                .build();
    }
    @DeleteMapping
    public ApiResponse<Void> deleteAll() {
        chargeService.deleteAll();
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Thành công")
                .result(null)
                .build();
    }
}
