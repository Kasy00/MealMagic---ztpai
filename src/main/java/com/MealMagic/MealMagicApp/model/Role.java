package com.MealMagic.MealMagicApp.model;

import jakarta.persistence.*;

@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RoleEnum name;

    public Role(RoleEnum name){
        this.name = name;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public RoleEnum getName(){
        return name;
    }

    public void setName(RoleEnum name){
        this.name = name;
    }
}
