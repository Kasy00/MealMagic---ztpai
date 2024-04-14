import { createUseStyles } from "react-jss";
import Sidebar from "../components/Sidebar";
import Header from "../components/Home/Header";

const useStyles = createUseStyles({
    wrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        minHeight: '100%',
    }
});

const Home = () => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
                <Sidebar></Sidebar>
                <Header></Header>
        </div>
    )
};

export default Home;