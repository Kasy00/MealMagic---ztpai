package com.MealMagic.MealMagicApp.controllers;

import com.MealMagic.MealMagicApp.model.Recipe;
import com.MealMagic.MealMagicApp.model.User;
import com.MealMagic.MealMagicApp.model.UserDetails;
import com.MealMagic.MealMagicApp.model.UserFavorite;
import com.MealMagic.MealMagicApp.repositories.RecipeRepository;
import com.MealMagic.MealMagicApp.repositories.UserDetailsRepository;
import com.MealMagic.MealMagicApp.repositories.UserRepository;
import com.MealMagic.MealMagicApp.repositories.UserFavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/rest/favorites")
public class FavoritesController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private UserFavoriteRepository userFavoriteRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addFavorite(@RequestParam("userId") Long userId, @RequestParam("recipeId") Long recipeId) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with ID " + userId + " not found.");
            }

            User user = userOptional.get();

            Recipe recipe = recipeRepository.findById(recipeId).orElseGet(() -> {
                Recipe newRecipe = new Recipe();
                newRecipe.setId(recipeId);
                return recipeRepository.save(newRecipe);
            });

            UserFavorite userFavorite = new UserFavorite();
            userFavorite.setUser(user);
            userFavorite.setRecipe(recipe);

            userFavoriteRepository.save(userFavorite);

            return ResponseEntity.ok("Added recipe with ID " + recipeId + " to favorites for user with ID " + userId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not add favorite: " + e.getMessage());
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeFavorite(@RequestParam("userId") Long userId, @RequestParam("recipeId") Long recipeId) {
        try {
            Optional<UserFavorite> userFavoriteOptional = userFavoriteRepository.findByUserIdAndRecipeId(userId, recipeId);
            if (userFavoriteOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Favorite recipe not found.");
            }

            userFavoriteRepository.delete(userFavoriteOptional.get());

            return ResponseEntity.ok("Removed recipe with ID " + recipeId + " from favorites for user with ID " + userId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not remove favorite: " + e.getMessage());
        }
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkFavorite(@RequestParam("userId") Long userId, @RequestParam("recipeId") Long recipeId) {
        boolean isFavorite = userFavoriteRepository.existsByUserIdAndRecipeId(userId, recipeId);
        return ResponseEntity.ok(isFavorite);
    }
}
