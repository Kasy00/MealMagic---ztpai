package com.MealMagic.MealMagicApp.repositories;

import com.MealMagic.MealMagicApp.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}