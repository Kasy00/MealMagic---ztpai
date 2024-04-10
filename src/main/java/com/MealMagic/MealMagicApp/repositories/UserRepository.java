package com.MealMagic.MealMagicApp.repositories;

import com.MealMagic.MealMagicApp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.MealMagic.MealMagicApp.util.CustomPasswordEncoder;

@Repository
public class UserRepository {
    @Autowired
    private CustomPasswordEncoder passwordEncoder;
    public User findUserByEmail(String email){
        User user = new User(email, passwordEncoder.getPasswordEncoder().encode("password"));
        user.setId(1L);
        user.setUsername("test");
        return user;
    }
}
