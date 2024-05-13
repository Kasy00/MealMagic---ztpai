package com.MealMagic.MealMagicApp.repositories;

import com.MealMagic.MealMagicApp.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);
}
