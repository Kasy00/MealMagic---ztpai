import react, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import searchIcon from '../../assets/search.svg';
import profileIcon from '../../assets/profile.svg';
import { profile } from 'console';

const useStyles = createUseStyles({
    header: {
        padding: '1.5rem',
        borderBottom: '2px solid var(--font-primary)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'var(--secondary)',
        gap: '3rem',
        height: '20%',
    },
    ingredientsForm: {
        display: 'flex',
        gap: '1rem',
        marginRight: 'auto',
    },
    upperHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addedIngredients: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        backgroundColor: 'var(--accents)',
        padding: '1rem',
        borderRadius: '3rem',
    },
    profile: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        textDecoration: 'none',
        justifyContent: 'center',
    },
    avatarImg: {
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
    },
    userName: {
        marginLeft: '1.5rem',
        fontSize: 'clamp(1.5rem, 1vw, 2.5rem)',
        color: '#fff',
    },
    searchBar: {
        backgroundImage: `url(${searchIcon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        backgroundSize: '3rem',
        width: 'clamp(170px, 70% + 1rem, 1000px)',
        borderRadius: '3rem',
        fontSize: '1.6rem',
        padding: '12px 20px 12px 40px',
        border: '1px solid #ddd',
        outline: 'none',
        '&:hover':{
            border: '1px solid var(--primary)'
        },
        '&:focus':{
            border: '2px solid var(--primary)'
        },
    },
    headerBtn: {
        padding: '1rem',
        borderRadius: '1rem',
        backgroundColor: 'var(--accents)',
        color: 'var(--font-primary)',
        fontSize: '1.6rem',
        border: 'none',
        cursor: 'pointer',
        transition: '0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
});

const Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.header}>
            <div className={classes.upperHeader}>
                <form method="POST" className={classes.ingredientsForm} action="handleRecipes">
                        <input type="text" className={classes.searchBar} name="search" placeholder="Enter ingredients here"/>
                        <button className={classes.headerBtn} type="button">Add</button>
                        <button className={classes.headerBtn} type="button">Delete</button>

                        <input type="hidden" id="hiddenIngredients"/>
                        <button className={classes.headerBtn} type="button">Search</button>
                </form>
                <div>
                    <a href="/profile" className={classes.profile}>
                        <img src={profileIcon} alt="avatar" className={classes.avatarImg}/>
                        <span className={classes.userName}>Username</span>
                    </a>
                </div>
            </div>
            <div className={classes.addedIngredients}></div>
        </div>
    );
};

export default Header;