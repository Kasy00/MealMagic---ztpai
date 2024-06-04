import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import axios from "axios";

const useStyles = createUseStyles({
  section: {
    display: "flex",
    gap: "1rem",
    flexDirection: "column",
    padding: "1rem",
    minHeight: "100vh",
    width: "100%",
    borderRadius: "1rem",
    boxShadow: "0px 0px 100px 9px rgba(165, 33, 33, 0.28)",
    border: "1px solid var(--font-primary)",
  },
  recipeCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1rem",
    padding: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    color: "var(--accents)",
    fontSize: "clamp(2.5rem, 2vw, 2rem)",
  },
  backBtn: {
    padding: "0.5rem 1rem",
    border: "none",
    fontWeight: "bold",
    backgroundColor: "var(--accents)",
    cursor: "pointer",
    color: "var(--font-primary)",
    borderRadius: "1rem",
    "&:hover": {
      transform: "scale(1.05)",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  },

  "@media (max-width: 768px)": {
    section: {
      gridTemplateColumns: "1fr",
    },
    recipes: {
      marginBottom: "1rem",
    },
  },
});

type Recipe = {
  id: number;
  image: string;
  title: string;
  ingredients: string[];
  instructions: string;
  servings: number;
  readyInMinutes: number;
};

interface FavoriteRecipesProps {
  onBack: () => void;
}

const FavoriteRecipes: React.FC<FavoriteRecipesProps> = ({ onBack }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const classes = useStyles();
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const decodedJwt = localStorage.getItem("decodedJwt");
    if (decodedJwt) {
      const { userId } = JSON.parse(decodedJwt);
      setUserId(userId);
    }
  }, []);

  const fetchFavoriteRecipes = async () => {
    try {
      if (userId) {
        const response = await axios.get(`/rest/favorites/${userId}`);
        const favoriteRecipeIds = response.data;

        const favoriteRecipes = await Promise.all(
          favoriteRecipeIds.map(async (recipeId: number) => {
            const recipeResponse = await axios.get(
              `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
            );
            const recipeData = recipeResponse.data;

            return {
              id: recipeData.id,
              image: recipeData.image,
              title: recipeData.title,
              ingredients: recipeData.extendedIngredients.map(
                (ingredient: any) => ingredient.original
              ),
              instructions: recipeData.instructions,
              servings: recipeData.servings,
              readyInMinutes: recipeData.readyInMinutes,
            };
          })
        );

        setRecipes(favoriteRecipes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFavoriteRecipes();
  }, [userId]);

  const handleCardClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
    fetchFavoriteRecipes();
  };

  return (
    <div className={classes.section}>
      <div className={classes.header}>
        <h3 className={classes.title}>Your Favorite Recipes</h3>
        <button className={classes.backBtn} onClick={onBack}>
          Back
        </button>
      </div>

      <div className={classes.recipeCards}>
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            image={recipe.image}
            title={recipe.title}
            onClick={() => handleCardClick(recipe)}
          />
        ))}
      </div>
      {selectedRecipe && (
        <RecipeModal
          title={selectedRecipe.title}
          image={selectedRecipe.image}
          ingredients={selectedRecipe.ingredients}
          instructions={selectedRecipe.instructions}
          servings={selectedRecipe.servings}
          readyInMinutes={selectedRecipe.readyInMinutes}
          onClose={handleCloseModal}
          recipeId={selectedRecipe.id}
          userId={userId}
        />
      )}
    </div>
  );
};

export default FavoriteRecipes;
