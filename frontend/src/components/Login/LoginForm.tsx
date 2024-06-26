import react, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Navigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import useLocalState from '../../util/useLocalStorage';
import axios from 'axios';
import { isValidEmail, loginUser } from '../../services/UserService';
import { jwtDecode } from 'jwt-decode';

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        minHeight: '100vh',
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
    check:{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    forgotPass:{
        textDecoration: 'underline',
        color: 'var(--font-primary)',
    },
    error: {
        color: 'red',
    },
});

const LoginForm = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [jwt, setJwt] = useLocalState('', 'jwt');
    const [decodedJwt, setDecodedJwt] = useLocalState('', 'decodedJwt');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!isValidEmail(email)) {
            setErrMessage('Invalid email!');
            return;
        };

        try {
            const data = await loginUser(email, password);

            if (data.success) {
                setJwt(data.token);
                setDecodedJwt(jwtDecode(data.token));
                window.location.href = '/home';
            }
        } catch (error) {
            setErrMessage('Invalid email or password!');
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.logo}>
                <img src={logo} className={classes.logoImg} alt="logo" />
            </div>
            {errMessage && <div className={classes.error}>{errMessage}</div>}
            <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.inputWrapper}>
                    <label htmlFor="email" className={classes.label}>Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        className={classes.input} 
                        onChange={handleEmailChange} 
                    />
                </div>
                <div className={classes.inputWrapper}>
                    <label htmlFor="password" className={classes.label}>Password</label>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        className={classes.input}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className={classes.check}>
                        <label>
                            <input type="checkbox"/>
                        Remember me
                        </label>
                        <a href="" className={classes.forgotPass}><p>Forgot password?</p></a>
                </div>
                <button type="submit" className={classes.button}>Log in</button>
            </form>
        </div>
    )
};

export default LoginForm;