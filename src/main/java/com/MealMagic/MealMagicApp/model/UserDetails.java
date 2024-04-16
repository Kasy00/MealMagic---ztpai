package com.MealMagic.MealMagicApp.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_details")
public class UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column
    private Double bmi;

    @Column
    private Date lastBmiCalculation;

    @Column
    private String avatarPath;

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }

    public Double getBmi(){
        return bmi;
    }

    public void setBmi(Double bmi){
        this.bmi = bmi;
    }

    public Date getLastBmiCalculation(){
        return lastBmiCalculation;
    }

    public void setLastBmiCalculation(Date lastBmiCalculation){
        this.lastBmiCalculation = lastBmiCalculation;
    }

    public String getAvatarPath(){
        return avatarPath;
    }

    public void setAvatarPath(String avatarPath){
        this.avatarPath = avatarPath;
    }
}