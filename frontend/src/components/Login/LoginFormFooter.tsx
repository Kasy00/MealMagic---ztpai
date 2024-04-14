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
    signUp: {
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

const LoginFormFooter = () => {
    const classes = useStyles();
return (
    <div className={classes.footer}>
        <p>Don't have an account?</p> 
        <a className={classes.signUp} href="/register">Sign up</a>
    </div>
)
};

export default LoginFormFooter;