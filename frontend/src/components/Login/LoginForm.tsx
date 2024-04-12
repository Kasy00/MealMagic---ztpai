import react, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Navigate } from 'react-router-dom';

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        gap: '10px',
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
    },
    input: {
        padding: '5px',
    },
    button: {
        padding: '5px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
});

const LoginForm = () => {
    const classes = useStyles();
    const [loginError, setLoginError] = useState('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // try{
        //     const response = await loginUser(email, password);
        //     if(!response.ok){
        //         const errorMessage = response.message || 'Bad credentials';
        //         setLoginError(errorMessage);
        //     } else {
        //         Navigate('/home');
        //     }
        // } catch (error){
        //     setLoginError('An error occurred');
        // }
    };

    return (
        <div className={classes.wrapper}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.inputWrapper}>
                    <label htmlFor="email" className={classes.label}>Email</label>
                    <input type="email" id="email" name="email" className={classes.input} />
                </div>
                <div className={classes.inputWrapper}>
                    <label htmlFor="password" className={classes.label}>Password</label>
                    <input type="password" id="password" name="password" className={classes.input} />
                </div>
                <button type="submit" className={classes.button}>Login</button>
            </form>
        </div>
    )
};

export default LoginForm;