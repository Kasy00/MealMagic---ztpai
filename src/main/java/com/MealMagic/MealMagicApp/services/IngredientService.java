package com.MealMagic.MealMagicApp.services;

import com.MealMagic.MealMagicApp.model.Ingredient;
import com.MealMagic.MealMagicApp.repositories.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public Ingredient saveIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    public List<Ingredient> findAllIngredients() {
        return ingredientRepository.findAll();
    }

    public void deleteIngredient(Long ingredientId) {
        ingredientRepository.deleteById(ingredientId);
    }

    public Ingredient findByName(String name) {
        return ingredientRepository.findByName(name);
    }
}
