import React from 'react';
import { createUseStyles } from 'react-jss';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/Profile/UserProfile';

const useStyles = createUseStyles({
    wrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        minHeight: '100vh',
    },
    profileContainer: {
        backgroundColor: 'var(--secondary)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
    },
    '@media (max-width: 768px)': {
        wrapper: {
            gridTemplateColumns: '1fr',
        },
        profileContainer: {
            padding: '1rem',
        },
    },
});

const Profile = () => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Sidebar></Sidebar>
            <div className={classes.profileContainer}>
                <UserProfile></UserProfile>
            </div>
        </div>
    );
};

export default Profile;