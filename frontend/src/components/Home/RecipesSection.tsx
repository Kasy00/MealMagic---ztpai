import react, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import RecipeCard from '../RecipeCard';
import axios from 'axios';

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
    recipeCards: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
        padding: '1rem',
    },

    '@media (max-width: 768px)': {
        section: {
            gridTemplateColumns: '1fr',
        },
        recipes: {
            marginBottom: '1rem',
        },
        trending: {
            marginTop: '1rem',
        },
    },
});

type Recipe = {
    image: string;
    title: string;
};

const RecipesSection = (props: any) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [trendingRecipes, setTrendingRecipes] = useState<Recipe[]>([]);
    const classes = useStyles();
    const apiKey = "bfa43ec4eb6c4c0ead14ff8c102dfb29";

    const fetchRecipes = async () => {
        try {
            if (props.searchClicked && props.ingredients.length > 0) {
                const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
                    params: {
                        apiKey: apiKey,
                        includeIngredients: props.ingredients.join(','),
                        number: 9,
                    }
                });

                const recipeData = response.data.results.map((recipe: { image: string; title: string; }) => ({ image: recipe.image, title: recipe.title }));

                setRecipes(recipeData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTrendingRecipes = async () => {
        try {
            const response = await axios.get('https://api.spoonacular.com/recipes/random', {
                params: {
                    apiKey: apiKey,
                    number: 3,
                }
            });

            const trendingRecipeData = response.data.recipes.map((recipe: { image: string; title: string; }) => ({ image: recipe.image, title: recipe.title }));

            setTrendingRecipes(trendingRecipeData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, [props.ingredients, props.searchClicked]);

    useEffect(() => {
        //fetchTrendingRecipes();
    }, []);

    return (
        <div className={classes.section}>
            <div className={classes.recipes}>
                <h3 className={classes.recipeHeader}>Recipes suggested for you</h3>
                <div className={classes.recipeCards}>
                    {recipes.map((recipe, index) => <RecipeCard key={index} image={recipe.image} title={recipe.title} />)}
                </div>
            </div>
            
            <div className={classes.trending}>
                <h3 className={classes.trendingHeader}>Trending</h3>
                <div className={classes.recipeCards}>
                    {trendingRecipes.map((recipe, index) => <RecipeCard key={index} image={recipe.image} title={recipe.title} />)}
                </div>
            </div>
        </div>
    );
};



export default RecipesSection;