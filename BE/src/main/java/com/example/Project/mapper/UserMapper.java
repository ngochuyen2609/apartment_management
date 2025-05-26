package com.example.Project.mapper;

import com.example.Project.dto.response.UserResponse;
import com.example.Project.entity.User;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface UserMapper {

    //     @Mapping(target = "accessToken", ignore = true)
//     @Mapping(target = "accessTokenExpired", ignore = true)
    UserResponse toUserDTO(User user);
}
