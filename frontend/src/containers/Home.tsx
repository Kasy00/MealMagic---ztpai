import { createUseStyles } from "react-jss";
import Sidebar from "../components/Sidebar";
import Header from "../components/Home/Header";
import RecipesSection from "../components/Home/RecipesSection";
import { useState } from "react";

const useStyles = createUseStyles({
    wrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        minHeight: '100vh',
    },
    '@media (max-width: 768px)': {
        wrapper: {
            gridTemplateColumns: '1fr',
        },
    },
});

const Home = () => {
    const [ingredients, setIngredients] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);

    const handleFormSubmit = (newIngredients: any) => {
        setIngredients(newIngredients);
        setSearchClicked(true);
        console.log('Form submitted home');
    };

    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Sidebar></Sidebar>
            <div>
                <Header onFormSubmit={handleFormSubmit}></Header>
                <RecipesSection ingredients={ingredients} searchClicked={searchClicked}></RecipesSection>
            </div>
        </div>
    )
};

export default Home;