package com.MealMagic.MealMagicApp.model;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String instruction;

    @Column(nullable = false)
    private Integer prepTime = 0;

    @Column(nullable = false)
    private Integer servings = 1;
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<UserFavorite> userFavorites;
    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getInstruction(){
        return instruction;
    }

    public void setInstruction(String instruction){
        this.instruction = instruction;
    }

    public Integer getPrepTime(){
        return prepTime;
    }

    public void setPrepTime(Integer prepTime){
        this.prepTime = prepTime;
    }

    public Integer getServings(){
        return servings;
    }

    public void setServings(Integer servings){
        this.servings = servings;
    }

    public List<UserFavorite> getUserFavorites() {
        return userFavorites;
    }

    public void setUserFavorites(List<UserFavorite> userFavorites) {
        this.userFavorites = userFavorites;
    }
}
