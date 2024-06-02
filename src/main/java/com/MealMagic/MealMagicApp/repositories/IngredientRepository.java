package com.MealMagic.MealMagicApp.repositories;

import com.MealMagic.MealMagicApp.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    Ingredient findByName(String name);
}
