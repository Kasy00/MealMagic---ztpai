import { createUseStyles } from "react-jss";
import Sidebar from "../components/Sidebar";
import Header from "../components/Home/Header";
import RecipesSection from "../components/Home/RecipesSection";

const useStyles = createUseStyles({
    wrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        minHeight: '100vh',
    }
});

const Home = () => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
                <Sidebar></Sidebar>
                <div>
                    <Header></Header>
                    <RecipesSection></RecipesSection>
                </div>
        </div>
    )
};

export default Home;