import react, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import logo from '../assets/logo.png';
import home from '../assets/home.svg';
import profile from '../assets/profile.svg';
import about from '../assets/about.svg';

const useStyles = createUseStyles({
    sidebar: {
        backgroundColor: 'var(--accents)',
        display: 'flex',
        alignItems: 'start',
        gap: '3rem',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '2rem',
    },
    logo:{
        alignSelf: 'center',
        maxWidth: 'clamp(7em, 10.5vw, 13em)',
        height: 'auto',
        marginBottom: '2rem',
    },
    sidebarList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        
    },
    sidebarItems: {
        listStyleType: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: 'clamp(1.5rem, 1.5vw, 2.5rem)',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    sidebarBtn: {
        maxWidth: 'clamp(1.5rem, 2.5vw, 5.5rem)',
        height: 'auto',
        transition: '0.2s ease-in-out'
    },
    listLink: {
        textDecoration: 'none',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        '&:visited': {
            color: 'black',
        },
    },
});

const Sidebar = () => {
    const classes = useStyles();
    return (
        <div className={classes.sidebar}>
            <img className={classes.logo} src={logo} alt="logo" />
            <ul className={classes.sidebarList}>
                <li className={classes.sidebarItems}><a className={classes.listLink} href="home"><img className={classes.sidebarBtn} src={home} alt="home button" />Home</a></li>
                <li className={classes.sidebarItems}><a className={classes.listLink} href="profile"><img className={classes.sidebarBtn} src={profile} alt="profile button" />Profile</a></li>
                <li className={classes.sidebarItems}><a className={classes.listLink} href="about"><img className={classes.sidebarBtn} src={about}alt="about button" />About</a></li>
            </ul>
        </div>
    )
};

export default Sidebar;