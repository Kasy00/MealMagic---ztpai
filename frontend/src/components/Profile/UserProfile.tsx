import react, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Modal from 'react-modal';
import bmiIcon from '../../assets/BMI.svg';
import favouritesIcon from '../../assets/favourites.svg';
import logoutIcon from '../../assets/logout.svg';
import settingsIcon from '../../assets/settings.svg';
import profileBasic from '../../assets/profile-basic.jpg';
import { logoutUser } from '../../services/UserService';
import AvatarModal from '../AvatarModal';
import BmiModal from '../BbmiModal';
import axios from 'axios';

Modal.setAppElement('#root');

const useStyles = createUseStyles({
    profileCard: {
        width: 'clamp(20rem, 30vw, 40rem)',
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '3rem',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid var(--accents)',
        borderRadius: '2rem',
        color: 'var(--accents)',
        backgroundColor: 'var(--font-primary)',
    },
    userInfo: {
        fontSize: 'clamp(2rem, 2.5vw, 3rem)',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        listStyleType: 'none',
        padding: '0',
        justifyContent: 'center',
    },
    userListItem: {
        gap: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'color 0.2s ease-in-out',
    },
    userListLink: {
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        color: 'var(--accents)',
    },
    profileAvatarBtn: {
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    profileAvatar: {
        width: '20rem',
        height: '20rem',
        objectFit: 'cover',
        borderRadius: '50%',
    },
    logoutLink: {
        marginTop: '5rem',
        '&:hover': {
            color: '#E21A4B',
        }
    }
});

const UserProfile = ()  => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [avatarPath, setAvatarPath] = useState('');
    const [userBmi, setUserBmi] = useState('');
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [isBmiModalOpen, setIsBmiModalOpen] = useState(false);

    useEffect(() => {
        const decodedJwt = localStorage.getItem('decodedJwt');
        if (decodedJwt) {
            const { username, userId } = JSON.parse(decodedJwt);
            setUsername(username);
            setUserId(userId);
        }
    }, []);

    const fetchAvatarPath = async () => {
        try {
            if (userId) {
                const response = await axios.get('/rest/upload/avatarPath', {params: {userId}});
                setAvatarPath(`http://localhost:8080/${response.data}`);
            }
        } catch (error) {
            console.error('Error fetching avatar path:', error);
        }
    };

    const fetchUserBmi = async () => {
        try {
            if (userId) {
                const response = await axios.get('/rest/bmi/get', {params: {userId}});
                setUserBmi(response.data);
            } 
        } catch (error) {
            console.error('Error fetching bmi:', error);
        }
    }

    useEffect(() => {
        fetchAvatarPath();
        fetchUserBmi();
    }, [userId]);

    const showAvatarModal = () => {
        setIsAvatarModalOpen(true);
    }

    const hideAvatarModal = () => {
        setIsAvatarModalOpen(false);
        fetchAvatarPath();
    }

    const showBmiModal = () => {
        setIsBmiModalOpen(true);
    }

    const hideBmiModal = () => {
        setIsBmiModalOpen(false);
        fetchUserBmi();
    }

    const classes = useStyles();
    return (
        <div className={classes.profileCard}>
            <button className={classes.profileAvatarBtn} onClick={showAvatarModal}>
                <img 
                    src={avatarPath} 
                    className={classes.profileAvatar} 
                    alt="avatar" 
                    onError={(e) => { 
                        e.currentTarget.onerror = null; 
                        e.currentTarget.src = profileBasic;
                    }} 
                />
            </button>
            <AvatarModal isOpen={isAvatarModalOpen} onRequestClose={hideAvatarModal} />
            <BmiModal isOpen={isBmiModalOpen} onRequestClose={hideBmiModal} />
            <h2 className={classes.userInfo}> {username}</h2>
            <h3 className={classes.userInfo}> BMI: {userBmi} </h3> 
            <ul className={classes.userList}>
                <li className={classes.userListItem}><a className={classes.userListLink} href="/home"><img src={settingsIcon} alt="settings" />Settings</a></li>
                <li className={classes.userListItem}><a className={classes.userListLink} onClick={showBmiModal}><img src={bmiIcon} alt="BMI calculator" />BMI Calculator</a></li>
                <li className={classes.userListItem}><a className={classes.userListLink}><img src={favouritesIcon} alt="favourites recipes" />Favourites recipes</a></li>
                <li className={classes.userListItem}><a className={`${classes.userListLink} ${classes.logoutLink}`} onClick={logoutUser}><img src={logoutIcon} alt="logout" />Logout</a></li>
            </ul>
        </div>
    );
};

export default UserProfile;