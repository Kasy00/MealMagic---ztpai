import React from 'react';
import { createUseStyles } from 'react-jss';
import background from '../assets/background.png';
import RegisterForm from '../components/Register/RegisterForm';
import RegisterFormFooter from '../components/Register/RegisterFormFooter';

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
    '@media (max-width: 768px)': {
        wrapper: {
            width: '80%',
        },
    },
});

const Register = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <RegisterForm />
                <RegisterFormFooter />
            </div>
        </div>
    )
};  

export default Register;