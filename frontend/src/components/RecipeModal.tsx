import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    recipeModal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(300px, 50%, 1000px)',
        height: 'auto',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "var(--accents)",
        color: "var(--font-primary)",
        borderRadius: "1rem",
        boxShadow: "0px 0px 100px 9px rgba(165, 33, 33, 0.28)",
        border: "2px solid var(--font-primary)",
        textAlign: "center",
        overflowY: "auto",
        maxHeight: "100vh",
    },
    recipeTitle: {
        fontSize: 'clamp(1.5rem, 1vw, 2.5rem)',
    },
    ingredientsList: {
        listStyle: "none",
        padding: 0,
    },
    recipeDetails: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
    },
    recipeImg: {
        width: 'clamp(300px, 50%, 800px)',
        height: 'auto',
        borderRadius: '1rem',
    },
    headersText: {
        fontSize: 'clamp(1.5rem, 1vw, 2.5rem)',
        color: 'var(--primary)',
    },
    closeBtn: {
        padding: '0.5rem 1rem',
        border: 'none',
        fontWeight: 'bold',
        backgroundColor: 'var(--font-primary)',
        cursor: 'pointer',
        color: 'var(--accents)',
        borderRadius: '1rem',
        '&:hover': {
            transform: 'scale(1.05)',
        },
        '&:active': {
            transform: 'scale(0.95)',
        },
    },
});

interface RecipeModalProps {
    title: string;
    image: string;
    ingredients: string[];
    instructions: string;
    servings: number;
    readyInMinutes: number;
    onClose: () => void;
};

const RecipeModal: React.FC<RecipeModalProps> = ({ title, image, ingredients, instructions, servings, readyInMinutes, onClose }) => {
    const classes = useStyles();
    return (
        <div className={classes.recipeModal}>
            <h1 className={classes.recipeTitle}>{title}</h1>
            <img src={image} alt={title} className={classes.recipeImg} />
            <h2 className={classes.headersText}>Ingredients</h2>
            <ul className={classes.ingredientsList}>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h2 className={classes.headersText}>Instructions</h2>
            <div dangerouslySetInnerHTML={{ __html: instructions }} />
            <div className={classes.recipeDetails}>
                <h2 className={classes.headersText}>Servings:</h2>
                <p>{servings}</p>
                <h2 className={classes.headersText}>Time:</h2>
                <p>{readyInMinutes} minutes</p>
            </div>
            <button onClick={onClose} className={classes.closeBtn}>Close</button>
        </div>
    );
};

export default RecipeModal;