package com.MealMagic.MealMagicApp.repositories;

import com.MealMagic.MealMagicApp.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {

}
