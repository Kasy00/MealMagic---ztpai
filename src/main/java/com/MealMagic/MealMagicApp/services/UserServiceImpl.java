package com.MealMagic.MealMagicApp.services;

import com.MealMagic.MealMagicApp.model.Role;
import com.MealMagic.MealMagicApp.model.User;
import com.MealMagic.MealMagicApp.model.UserDto;
import com.MealMagic.MealMagicApp.repositories.RoleRepository;
import com.MealMagic.MealMagicApp.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void saveUser(UserDto userDto, boolean isAdmin){
        System.out.println("Received email: " + userDto.getEmail() + userDto.getUsername() + userDto.getPassword());
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        Role role = roleRepository.findByName("ROLE_USER");
        if (role == null){
            role = createRole("ROLE_USER");
        }

        user.setRoles(Arrays.asList(role));

        if (isAdmin) {
            Role adminRole = roleRepository.findByName("ROLE_ADMIN");
            if (adminRole == null) {
                adminRole = createRole("ROLE_ADMIN");
            }
            user.getRoles().add(adminRole);
        }

        userRepository.save(user);
    }

    @Override
    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Override
    public List<UserDto> findAllUsers(){
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapToUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    private UserDto mapToUserDto(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        return userDto;
    }

    private Role createRole(String name){
        Role role = new Role();
        role.setName(name);
        return roleRepository.save(role);
    }
}
