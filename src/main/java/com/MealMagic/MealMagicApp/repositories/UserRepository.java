package com.MealMagic.MealMagicApp.repositories;

import com.MealMagic.MealMagicApp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import com.MealMagic.MealMagicApp.util.CustomPasswordEncoder;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long>{

    User findByEmail(String email);
}
