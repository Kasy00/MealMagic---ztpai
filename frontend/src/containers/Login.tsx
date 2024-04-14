import React from 'react';
import { createUseStyles } from 'react-jss';
import LoginForm  from '../components/Login/LoginForm';
import LoginFormFooter from '../components/Login/LoginFormFooter';
import background from '../assets/background.png';

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: `url(${background})`,
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        padding: '1rem',
        backgroundColor: 'var(--primary)',
        width: 'clamp(15%, 30% + 2vw, 40%)',
    },
});

const Login = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <LoginForm />
                <LoginFormFooter />
            </div>
        </div>
    )
};  

export default Login;