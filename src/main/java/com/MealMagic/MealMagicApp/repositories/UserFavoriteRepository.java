package com.MealMagic.MealMagicApp.repositories;

import com.MealMagic.MealMagicApp.model.UserFavorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserFavoriteRepository extends JpaRepository<UserFavorite, Long> {
    Optional<UserFavorite> findByUserIdAndRecipeId(Long userId, Long recipeId);
    boolean existsByUserIdAndRecipeId(Long userId, Long recipeId);
}