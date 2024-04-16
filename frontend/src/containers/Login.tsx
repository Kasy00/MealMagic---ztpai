import React from 'react';
import { createUseStyles } from 'react-jss';
import LoginForm from '../components/Login/LoginForm';
import LoginFormFooter from '../components/Login/LoginFormFooter';
import background from '../assets/background.png';

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: `url(${background}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        minHeight: '100vh',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        padding: '1rem',
        backgroundColor: 'var(--primary)',
        width: 'clamp(15%, 30% + 2vw, 40%)',
    },
    '@media (max-width: 768px)': {
        wrapper: {
            width: '80%',
        },
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
    );
};

export default Login;