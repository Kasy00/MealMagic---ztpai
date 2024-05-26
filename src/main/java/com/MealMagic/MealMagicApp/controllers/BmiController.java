package com.MealMagic.MealMagicApp.controllers;

import com.MealMagic.MealMagicApp.model.User;
import com.MealMagic.MealMagicApp.model.UserDetails;
import com.MealMagic.MealMagicApp.repositories.UserDetailsRepository;
import com.MealMagic.MealMagicApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;


@Controller
@RequestMapping("/rest/bmi")
public class BmiController {
    @Autowired
    private UserDetailsRepository userDetailsRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/set")
    public ResponseEntity<String> setBmi(@RequestParam("userId") Long userId, @RequestParam double height, @RequestParam double weight) throws IOException {
        try {
            Optional<UserDetails> userDetailsOptional = userDetailsRepository.findById(userId);
            UserDetails userDetails;
            if (userDetailsOptional.isPresent()) {
                userDetails = userDetailsOptional.get();
            } else {
                userDetails = new UserDetails();
                User user = userRepository.findById(userId).orElse(null);
                if (user == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with ID " + userId + " not found.");
                }
                userDetails.setUser(user);
                System.out.println("Created new UserDetails for user with ID " + userId);
            }

            double bmi = weight / ((height / 100) * (height / 100));
            userDetails.setBmi(bmi);
            userDetailsRepository.save(userDetails);
            System.out.println("BMI set for user with ID " + userId);

            return ResponseEntity.ok("BMI set for user with ID " + userId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not set BMI: " + e.getMessage());
        }
    }

    @GetMapping("/get")
    public ResponseEntity<Double> getBmi(@RequestParam("userId") Long userId) {
        try {
            Optional<UserDetails> userDetailsOptional = userDetailsRepository.findById(userId);
            if (userDetailsOptional.isPresent()) {
                UserDetails userDetails = userDetailsOptional.get();
                double roundedBmi = Math.round(userDetails.getBmi() * 100.0) / 100.0;
                return ResponseEntity.ok(roundedBmi);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
