package com.MealMagic.MealMagicApp.services;

import com.MealMagic.MealMagicApp.model.User;
import com.MealMagic.MealMagicApp.model.UserDto;

import java.util.List;

public interface UserService {
    void saveUser(UserDto userDto);

    User findByEmail(String email);

    List<UserDto> findAllUsers();
}
