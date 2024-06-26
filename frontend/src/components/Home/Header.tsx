import react, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import searchIcon from "../../assets/search.svg";
import profileIcon from "../../assets/profile.svg";
import axios from "axios";

const useStyles = createUseStyles({
  header: {
    padding: "1.5rem",
    borderBottom: "2px solid var(--font-primary)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "var(--secondary)",
    gap: "3rem",
  },
  ingredientsForm: {
    display: "flex",
    gap: "1rem",
    marginRight: "auto",
  },
  upperHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addedIngredients: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    backgroundColor: "var(--accents)",
    padding: "1rem",
    borderRadius: "3rem",
  },
  ingredientItem: {
    padding: "0.5rem 1rem",
    backgroundColor: "var(--font-primary)",
    color: "var(--accents)",
    borderRadius: "2rem",
  },
  profile: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    textDecoration: "none",
    justifyContent: "center",
  },
  avatarImg: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
  },
  userName: {
    marginLeft: "1.5rem",
    fontSize: "clamp(1.5rem, 1vw, 2.5rem)",
    color: "#fff",
  },
  searchBar: {
    backgroundImage: `url(${searchIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left center",
    backgroundSize: "3rem",
    width: "clamp(170px, 70% + 1rem, 1000px)",
    borderRadius: "3rem",
    fontSize: "1.6rem",
    padding: "12px 20px 12px 40px",
    border: "1px solid #ddd",
    outline: "none",
    "&:hover": {
      border: "1px solid var(--primary)",
    },
    "&:focus": {
      border: "2px solid var(--primary)",
    },
  },
  headerBtn: {
    padding: "1rem",
    borderRadius: "1rem",
    backgroundColor: "var(--accents)",
    color: "var(--font-primary)",
    fontSize: "1.6rem",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    transition: "0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  suggestions: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    position: "absolute",
    top: "10rem",
    width: "clamp(170px, 70% + 1rem, 1000px)",
    backgroundColor: "var(--font-primary)",
    color: "var(--accents)",
    borderRadius: "3rem",
    padding: "1rem",
    zIndex: 1,
  },
  "@media (max-width: 768px)": {
    header: {
      padding: "1rem",
      gap: "1rem",
    },
    ingredientsForm: {
      flexDirection: "column",
      gap: "1rem",
    },
    addedIngredients: {
      flexDirection: "column",
      gap: "1rem",
      padding: "1rem",
    },
    ingredientItem: {
      padding: "0.5rem 1rem",
      borderRadius: "2rem",
    },
    profile: {
      gap: "0.5rem",
    },
    avatarImg: {
      width: "3rem",
      height: "3rem",
    },
    userName: {
      fontSize: "1.2rem",
    },
    searchBar: {
      width: "clamp(170px, 70% + 1rem, 1000px)",
      fontSize: "1.2rem",
      padding: "10px 20px 10px 40px",
    },
    headerBtn: {
      padding: "0.5rem",
      fontSize: "1.2rem",
    },
    suggestions: {
      display: "none",
    },
  },
});

interface HeaderProps {
  onFormSubmit: (newIngredients: string[]) => void;
}

interface Ingredient {
  id: number;
  name: string;
}

const Header: React.FC<HeaderProps> = (props: any) => {
  const maxIngredients = 8;
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState<string>("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [avatarPath, setAvatarPath] = useState("");
  const [ingredientSuggestion, setIngredientSuggestion] = useState<
    Ingredient[]
  >([]);

  useEffect(() => {
    const decodedJwt = localStorage.getItem("decodedJwt");
    if (decodedJwt) {
      const { username, userId } = JSON.parse(decodedJwt);
      setUsername(username);
      setUserId(userId);
    }
  }, []);

  const fetchAvatarPath = async () => {
    try {
      if (userId) {
        const response = await axios.get("/rest/upload/avatarPath", {
          params: { userId },
        });
        setAvatarPath(`http://localhost:8080/${response.data}`);
      }
    } catch (error) {
      console.error("Error fetching avatar path:", error);
    }
  };

  useEffect(() => {
    fetchAvatarPath();
  }, [userId]);

  const handleAddIngredient = () => {
    if (ingredients.indexOf(ingredientInput.trim()) > -1) {
      alert("Ingredient already added!");
    } else if (
      ingredientInput.trim() !== "" &&
      ingredients.length !== maxIngredients
    ) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput("");
    } else if (ingredients.length >= maxIngredients) {
      alert("You can add only up to 8 ingredients!");
    }
    setIngredientInput("");
  };

  const handleDeleteIngredient = () => {
    ingredients.pop();
    setIngredients([...ingredients]);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onFormSubmit(ingredients);
    console.log("Form submitted header");
  };

  const fetchIngredients = async (searchTerm: string) => {
    try {
      const response = await axios.get(`/rest/ingredients/all`, {
        params: {
          name: searchTerm,
        },
      });
      setIngredientSuggestion(response.data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientInput(e.target.value);
    fetchIngredients(e.target.value);
  };

  const classes = useStyles();
  return (
    <div className={classes.header}>
      <div className={classes.upperHeader}>
        <form
          method="POST"
          className={classes.ingredientsForm}
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            className={classes.searchBar}
            id="searchBar"
            value={ingredientInput}
            placeholder="Enter ingredient one by one..."
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {isFocused &&
            ingredientSuggestion.length > 0 &&
            ingredientInput !== "" && (
              <div className={classes.suggestions}>
                {ingredientSuggestion.map((ingredient) => (
                  <div key={ingredient.id}>{ingredient.name}</div>
                ))}
              </div>
            )}
          <button
            className={classes.headerBtn}
            type="button"
            id="addIngredientButton"
            onClick={handleAddIngredient}
          >
            Add
          </button>
          <button
            className={classes.headerBtn}
            type="button"
            id="deleteIngredientButton"
            onClick={handleDeleteIngredient}
          >
            Delete
          </button>
          <button className={classes.headerBtn} type="submit">
            Search
          </button>
        </form>
        <div>
          <a href="/profile" className={classes.profile}>
            <img
              src={avatarPath}
              className={classes.avatarImg}
              alt="avatar"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = profileIcon;
              }}
            />
            <span className={classes.userName}> {username} </span>
          </a>
        </div>
      </div>
      <div className={classes.addedIngredients} id="addedIngredients">
        {ingredients.map((ingredient, index) => (
          <div key={index} className={classes.ingredientItem}>
            {ingredient}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
