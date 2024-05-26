import React from 'react';
import { createUseStyles } from 'react-jss';

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

interface RecipeCardProps {
    image: string;
    title: string;
    onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ image, title, onClick }) => {
    const classes = useStyles();
    return (
        <div className={classes.card} onClick={onClick}>
            <img src={image} alt="" className={classes.recipeImg}></img>
            <div>
                <h4 className={classes.recipeTitle}>{title}</h4>
            </div>
        </div>
    );
};

export default RecipeCard;