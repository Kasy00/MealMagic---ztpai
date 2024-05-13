package com.MealMagic.MealMagicApp.controllers;

import com.MealMagic.MealMagicApp.auth.JwtUtil;
import com.MealMagic.MealMagicApp.model.User;
import com.MealMagic.MealMagicApp.model.UserDto;
import com.MealMagic.MealMagicApp.model.request.LoginReq;
import com.MealMagic.MealMagicApp.model.response.ErrorRes;
import com.MealMagic.MealMagicApp.model.response.LoginRes;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.MealMagic.MealMagicApp.services.UserService;

import java.util.List;
@CrossOrigin(origins = "*")
@Controller
@RequestMapping("/rest/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private UserService userService;
    private JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, UserService userService ,JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @ResponseBody
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public ResponseEntity login(@RequestBody LoginReq loginReq){
        try {
            Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReq.getEmail(), loginReq.getPassword()));
            String email = authentication.getName();
            User user = userService.findByEmail(email);
            String token = jwtUtil.createToken(user);
            LoginRes loginRes = new LoginRes(token,email);

            return ResponseEntity.ok(loginRes);

        }catch (BadCredentialsException e){
            ErrorRes errorResponse = new ErrorRes(HttpStatus.BAD_REQUEST,"Invalid username or password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }catch (Exception e){
            ErrorRes errorResponse = new ErrorRes(HttpStatus.BAD_REQUEST, e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @ResponseBody
    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public ResponseEntity<String> registration(@Valid @RequestBody UserDto userDto, BindingResult result, Model model){
        System.out.println("Received email: " + userDto.getEmail() + userDto.getUsername() + userDto.getPassword());
        User existingUser = userService.findByEmail(userDto.getEmail());

        if(existingUser != null && existingUser.getEmail() != null && !existingUser.getEmail().isEmpty()){
            result.rejectValue("email", null,
                    "There is already an account registered with that email");
            return ResponseEntity.badRequest().body("Email already registered");
        }

        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation errors: " + result.getAllErrors());
        }

        userService.saveUser(userDto);
        return ResponseEntity.ok("User registered successfully. Please login.");
    }

    @GetMapping("/users")
    public String users(Model model){
        List<UserDto> users = userService.findAllUsers();
        model.addAttribute("users", users);
        return "users";
    }
}
