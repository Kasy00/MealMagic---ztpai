package com.MealMagic.MealMagicApp.controllers;

import com.MealMagic.MealMagicApp.model.Ingredient;
import com.MealMagic.MealMagicApp.model.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.MealMagic.MealMagicApp.services.UserService;
import com.MealMagic.MealMagicApp.services.IngredientService;

import java.util.List;

@CrossOrigin(origins = "*")
@Controller
@RequestMapping("/rest/admin")
public class AdminController {
    private final UserService userService;
    private final IngredientService ingredientService;

    public AdminController(IngredientService ingredientService, UserService userService){
        this.ingredientService = ingredientService;
        this.userService = userService;
    }

    @GetMapping("/users")
    @ResponseBody
    public List<UserDto> users(){
        return userService.findAllUsers();
    }

    @ResponseBody
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user.");
        }
    }

    @PostMapping("/ingredients")
    public ResponseEntity<?> addIngredient(@RequestParam String ingredientName){
        try {
            Ingredient existingIngredient = ingredientService.findByName(ingredientName);
            if (existingIngredient != null) {
                return ResponseEntity.badRequest().body("Ingredient already exists.");
            }

            Ingredient newIngredient = new Ingredient();
            newIngredient.setName(ingredientName);
            Ingredient savedIngredient = ingredientService.saveIngredient(newIngredient);

            return ResponseEntity.ok(savedIngredient);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding ingredient.");
        }
    }

    @GetMapping("/ingredients")
    public List<Ingredient> getAllIngredients() {
        return ingredientService.findAllIngredients();
    }

    @DeleteMapping("/ingredients/{ingredientId}")
    public ResponseEntity<?> deleteIngredient(@PathVariable Long ingredientId) {
        try {
            ingredientService.deleteIngredient(ingredientId);
            return ResponseEntity.ok("Ingredient deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting ingredient.");
        }
    }
}
