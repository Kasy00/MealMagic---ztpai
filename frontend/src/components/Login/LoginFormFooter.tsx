import react from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
    },
    footerText: {
        fontSize: '0.8rem',
      },
});

const LoginFormFooter = () => {
    const classes = useStyles();
return (
    <div className={classes.footer}>
        <p>Don't have an account? <a href="/register">Sign up</a></p>
    </div>
)
};

export default LoginFormFooter;