import react, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import pancake from '../assets/pancake.jpg';

const useStyles = createUseStyles({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--accents)',
        borderRadius: '1rem',
        padding: '1rem',
        transition: '0.2s ease-in-out',
        cursor: 'pointer',
        '&:hover':{
            transform: 'scale(1.05)',
        },
        '&:active':{
            transform: 'scale(0.95)',
        }
    },
    recipeImg:{
        maxWidth: '100%',
        maxHeight: '100%',
    },
    recipeTitle: {
        fontSize: 'clamp(1.5rem, 1vw, 2.5rem)',
        color: 'var(--font-primary)',
        padding: '1rem',
    }
});

const RecipeCard = () => {
    const classes = useStyles();
    return (
        <div className={classes.card}>
            <img src={pancake} alt="" className={classes.recipeImg}></img>
            <div>
                <h4 className={classes.recipeTitle}>Pancakes</h4>
            </div>
        </div>
    );
};

export default RecipeCard;