import react from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'var(--font-primary)'
    },
    logIn: {
        padding: '0.8rem 1.3rem',
        border: '1px outset buttonborder',
        borderRadius: '1rem',
        textDecoration: 'none',
        color: 'var(--accents)',
        backgroundColor: 'var(--secondary)',
        '&:hover': {
            backgroundColor: 'var(--font-primary)',
        },
    }
    
});

const RegisterFormFooter = () => {
    const classes = useStyles();
return (
    <div className={classes.footer}>
        <p>Already have an account?</p> 
        <a className={classes.logIn} href="/">Log in</a>
    </div>
)
};

export default RegisterFormFooter;