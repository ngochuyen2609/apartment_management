package com.example.Project.repository;

import com.example.Project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
//tuong tac voi User co id kieu long
//tuong tac voi data
//JPA co tat ca cac lenh tuong tac voi data
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);
}
