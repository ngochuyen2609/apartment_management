package com.example.Project.dto.request.resident;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResidentFilterRequest {
    String searchText;
}
