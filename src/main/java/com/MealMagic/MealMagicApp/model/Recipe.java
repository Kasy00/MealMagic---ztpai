package com.MealMagic.MealMagicApp.model;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "recipes")
public class Recipe {
    @Id
    private Long id;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<UserFavorite> userFavorites;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<UserFavorite> getUserFavorites() {
        return userFavorites;
    }

    public void setUserFavorites(List<UserFavorite> userFavorites) {
        this.userFavorites = userFavorites;
    }
}
