import React from 'react';
import { createUseStyles } from 'react-jss';
import LoginForm  from '../components/Login/LoginForm';
import LoginFormFooter from '../components/Login/LoginFormFooter';

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
});

const Login = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <LoginForm />
            </div>
            <LoginFormFooter />
        </div>
    )
};  

export default Login;