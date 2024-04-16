package com.MealMagic.MealMagicApp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ingredients_recipes")
public class IngredientsRecipes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredients_recipes_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ingredient_id", nullable = false)
    private Ingredient ingredient;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @Column(nullable = false)
    private Integer ingredientAmount;

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Ingredient getIngredient(){
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient){
        this.ingredient = ingredient;
    }

    public Recipe getRecipe(){
        return recipe;
    }

    public void setRecipe(Recipe recipe){
        this.recipe = recipe;
    }

    public Integer getIngredientAmount(){
        return ingredientAmount;
    }

    public void setIngredientAmount(Integer ingredientAmount){
        this.ingredientAmount = ingredientAmount;
    }
}