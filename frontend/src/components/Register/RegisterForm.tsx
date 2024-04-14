import react, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Navigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        flexDirection: 'column',
        color: 'var(--font-primary)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '2rem',
        padding: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    label: {
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        border: 'none',
        padding: '1rem',
        borderBottom: '2px solid var(--secondary)',
        '&:focus':{
            outline: 'none',
            borderBottom: '3px solid var(--accents)',
        }
    },
    button: {
        width: '100%',
        borderRadius: '2rem',
        fontWeight: 'bold',
        color: 'black',
        border: 'none',
        cursor: 'pointer',
        padding: '1rem',
        fontSize: '2rem',
        '&:hover':{
            backgroundColor: 'var(--font-primary)',
            color: '#fff',
        }
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImg: {
        width: '90%',
        height: 'auto',
    },
    error: {
        color: 'red',
    },
});

const RegisterForm = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            setErrMessage('Invalid email!');
            return;
        }

        if(password !== confirmPassword) {
            setErrMessage('Passwords are different! Please try again.');
            return;
        }

        if(password.length < 8) {
            setErrMessage('Password must be at least 8 characters long!');
            return;
        }

            // try {
            //     const response = await registerUser(email, password);
            //     if (!response.ok) {
            //         const errorMessage = response.message || 'Bad credentials';
            //         setLoginError(errorMessage);
            //     } else {
            //         Navigate('/home');
            //     }
            // } catch (error) {
            //     setLoginError('An error occurred');
            // }
    };

    return (
        <div className={classes.wrapper}>
            <img src={logo} alt="Logo" />
            {errMessage && <div className={classes.error}>{errMessage}</div>}
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.inputWrapper}>
                    <label htmlFor="email" className={classes.label}>Email</label>
                    <input className={classes.input} type="email" id="email" value={email} onChange={handleEmailChange} />
                </div>

                <div className={classes.inputWrapper}>
                    <label htmlFor="password" className={classes.label}>Password</label>
                    <input className={classes.input} type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>

                <div className={classes.inputWrapper}>
                    <label htmlFor="confirmPassword" className={classes.label}>Confirm Password</label>
                    <input className={classes.input} type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>

                <button className={classes.button} type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;