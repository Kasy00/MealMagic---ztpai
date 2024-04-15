import react, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    section: {
        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
        gap: '1rem',
        justifySelf: 'center',
        backgroundColor: 'var(--primary)',
        padding: '1rem',
        minHeight: '100vh',
    },
    recipes: {
        textAlign: 'center',
        padding: '1rem',
        borderRadius: '1rem',
        boxShadow: '0px 0px 100px 9px rgba(165, 33, 33, 0.28)',
        border: '1px solid var(--font-primary)'
    },
    trending: {
        textAlign: 'center',
        padding: '1rem',
        borderRadius: '1rem',
        boxShadow: '0px 0px 100px 9px rgba(165, 33, 33, 0.28)',
        border: '1px solid var(--accents)',
        backgroundColor: 'var(--secondary)',
    },
    recipeHeader: {
        color: 'var(--font-primary)',
        fontSize: 'clamp(2.5rem, 2vw, 2rem)',
    },
    trendingHeader: {
        color: 'var(--accents)',
        fontSize: 'clamp(2.5rem, 2.2vw, 1.5rem)',
    },
});

const RecipesSection = () => {
    const classes = useStyles();
    return (
        <div className={classes.section}>
            <div className={classes.recipes}>
                <h3 className={classes.recipeHeader}>Recipes suggested for you</h3>
            </div>
            
            <div className={classes.trending}>
                <h3 className={classes.trendingHeader}>Trending</h3>
            </div>
        </div>
    );
};

export default RecipesSection;