import react, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import Modal from "react-modal";
import bmiIcon from "../../assets/BMI.svg";
import favouritesIcon from "../../assets/favourites.svg";
import logoutIcon from "../../assets/logout.svg";
import settingsIcon from "../../assets/settings.svg";
import profileBasic from "../../assets/profile-basic.jpg";
import { logoutUser } from "../../services/UserService";
import AvatarModal from "../AvatarModal";
import BmiModal from "../BbmiModal";
import FavoriteRecipes from "../FavoriteRecipes";
import axios from "axios";

Modal.setAppElement("#root");

const useStyles = createUseStyles({
  profileCard: {
    width: "clamp(20rem, 30vw, 40rem)",
    minHeight: "50vh",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "3rem",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid var(--accents)",
    borderRadius: "2rem",
    color: "var(--accents)",
    backgroundColor: "var(--font-primary)",
  },
  userInfo: {
    fontSize: "clamp(2rem, 2.5vw, 3rem)",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  userList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    listStyleType: "none",
    padding: "0",
    justifyContent: "center",
  },
  adminListItem: {
    gap: "1rem",
    fontWeight: "bold",
    padding: "1rem",
    border: "2px solid var(--accents)",
    transition: "color 0.2s ease-in-out",
  },
  userListItem: {
    display: "flex",
    gap: "1.5rem",
    
  },
  userListLink: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    color: "var(--accents)",
    cursor: "pointer",
  },
  deleteUserBtn: {
    backgroundColor: "var(--accents)",
    color: "var(--font-primary)",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#E21A4B",
    },
  },
  profileAvatarBtn: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  profileAvatar: {
    width: "20rem",
    height: "20rem",
    objectFit: "cover",
    borderRadius: "50%",
  },
  logoutLink: {
    marginTop: "5rem",
    "&:hover": {
      color: "#E21A4B",
    },
  },
    adminPanel: {
        display: "flex",
        gap: "2rem",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "2rem",
        width: "100%",
    },
    header: {
        fontSize: "2rem",
        color: "var(--accents)",
    },
    users: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        border: "2px solid var(--accents)",
        borderRadius: "2rem",
        backgroundColor: "var(--font-primary)",
        width: "50%",
    },
    ingredients: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        border: "2px solid var(--accents)",
        borderRadius: "2rem",
        backgroundColor: "var(--font-primary)",
        width: "50%",
    },
});

interface User {
  id: number;
  username: string;
  email: string;
}

interface Ingredient {
    id: number;
    name: string;
}

const UserProfile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [avatarPath, setAvatarPath] = useState("");
  const [userBmi, setUserBmi] = useState("");
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isBmiModalOpen, setIsBmiModalOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const decodedJwt = localStorage.getItem("decodedJwt");

    if (decodedJwt) {
      const { username, userId, roles } = JSON.parse(decodedJwt);
      setUsername(username);
      setUserId(userId);
      if (roles.includes("ROLE_ADMIN")) {
        setIsAdmin(true);
        fetchUsers();
        fetchIngredients();
      } else {
        setIsAdmin(false);
      }
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

  const fetchUserBmi = async () => {
    try {
      if (userId) {
        const response = await axios.get("/rest/bmi/get", {
          params: { userId },
        });
        setUserBmi(response.data);
      }
    } catch (error) {
      console.error("Error fetching bmi:", error);
    }
  };

  useEffect(() => {
    fetchAvatarPath();
    fetchUserBmi();
  }, [userId]);

  const showAvatarModal = () => {
    setIsAvatarModalOpen(true);
  };

  const hideAvatarModal = () => {
    setIsAvatarModalOpen(false);
    fetchAvatarPath();
  };

  const showBmiModal = () => {
    setIsBmiModalOpen(true);
  };

  const hideBmiModal = () => {
    setIsBmiModalOpen(false);
    fetchUserBmi();
  };

  const toggleFavorites = () => {
    setShowFavorites((prevShowFavorites) => !prevShowFavorites);
  };

  const fetchUsers = async () => {
    try {
      let token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found in local storage");
      }
      token = token.replace(/"/g, "");
      const response = await axios.get("/rest/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        console.error(
          "Error fetching users: Unauthorized access. Please check your token permissions."
        );
      } else {
        console.error("Error fetching users:", error);
      }
    }
  };

  const fetchIngredients = async () => {
    try {
      let token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found in local storage");
      }
      token = token.replace(/"/g, "");
      const response = await axios.get("/rest/admin/ingredients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIngredients(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        console.error(
          "Error fetching users: Unauthorized access. Please check your token permissions."
        );
      } else {
        console.error("Error fetching ingredients:", error);
      }
    }
  };


  const classes = useStyles();

  if (showFavorites) {
    return <FavoriteRecipes onBack={toggleFavorites} />;
  }

const handleDeleteUser = async (userId: string) => {
    try {
        let token = localStorage.getItem('jwt');
        if (!token) {
            throw new Error("No token found in local storage");
          }
        token = token.replace(/"/g, "");
        const response = await axios.delete(`http://localhost:3000/rest/admin/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            setUsers(users.filter(user => user.id !== Number(userId)));
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

const handleDeleteIngredient = async (ingredientId: string) => {
    try {
        let token = localStorage.getItem('jwt');
        if (!token) {
            throw new Error("No token found in local storage");
          }
        token = token.replace(/"/g, "");
        const response = await axios.delete(`http://localhost:3000/rest/admin/ingredients/${ingredientId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            setIngredients(ingredients.filter(ingredient => ingredient.id !== Number(ingredientId)));
        }
    } catch (error) {
        console.error('Error deleting ingredient:', error);
    }
};

  return isAdmin ? (
    <div className={classes.adminPanel}>
        <div className={classes.users}>
            <h2 className={classes.header}>Users</h2>
            <ul className={classes.userList}>
            {users.map((user) => (
                <li key={user.id} className={classes.adminListItem}>
                <div className={classes.userListLink}>
                    <span>{user.id}</span>
                    <span>{user.username}</span>
                    <span>{user.email}</span>
                    <button className={classes.deleteUserBtn} onClick={() => handleDeleteUser(user.id.toString())}>Delete</button>
                </div>
                </li>
            ))}
            </ul>
        </div>
        <div className={classes.ingredients}>
            <h2 className={classes.header}>Ingredients</h2>
            <ul className={classes.userList}>
            {ingredients.map((ingredient) => (
                <li key={ingredient.id} className={classes.adminListItem}>
                <div className={classes.userListLink}>
                    <span>{ingredient.id}</span>
                    <span>{ingredient.name}</span>
                    <button className={classes.deleteUserBtn} onClick={() => handleDeleteIngredient(ingredient.id.toString())}>Delete</button>
                </div>
                </li>
            ))}
            </ul>
        </div>
        <a
            className={`${classes.userListLink} ${classes.logoutLink}`}
            onClick={logoutUser}
          >
            <img src={logoutIcon} alt="logout" />
            Logout
          </a>
    </div>
    
  ) : (
    <div className={classes.profileCard}>
      <button className={classes.profileAvatarBtn} onClick={showAvatarModal}>
        <img
          src={avatarPath}
          className={classes.profileAvatar}
          alt="avatar"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = profileBasic;
          }}
        />
      </button>
      <AvatarModal
        isOpen={isAvatarModalOpen}
        onRequestClose={hideAvatarModal}
      />
      <BmiModal isOpen={isBmiModalOpen} onRequestClose={hideBmiModal} />
      <h2 className={classes.userInfo}> {username}</h2>
      <h3 className={classes.userInfo}> BMI: {userBmi} </h3>
      <ul className={classes.userList}>
        <li className={classes.userListItem}>
          <a className={classes.userListLink} href="/home">
            <img src={settingsIcon} alt="settings" />
            Settings
          </a>
        </li>
        <li className={classes.userListItem}>
          <a className={classes.userListLink} onClick={showBmiModal}>
            <img src={bmiIcon} alt="BMI calculator" />
            BMI Calculator
          </a>
        </li>
        <li className={classes.userListItem}>
          <a className={classes.userListLink} onClick={toggleFavorites}>
            <img src={favouritesIcon} alt="favourites recipes" />
            Favourites recipes
          </a>
        </li>
        <li className={classes.userListItem}>
          <a
            className={`${classes.userListLink} ${classes.logoutLink}`}
            onClick={logoutUser}
          >
            <img src={logoutIcon} alt="logout" />
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
