package com.MealMagic.MealMagicApp.controllers;

import com.MealMagic.MealMagicApp.model.Ingredient;
import com.MealMagic.MealMagicApp.services.IngredientService;
import com.MealMagic.MealMagicApp.services.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/rest/ingredients")
public class IngredientController {

    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService){
        this.ingredientService = ingredientService;
    }
    @GetMapping("/all")
    @ResponseBody
    public List<Ingredient> getIngredientsByName(@RequestParam String name) {
        return ingredientService.findIngredientsByName(name);
    }
}
