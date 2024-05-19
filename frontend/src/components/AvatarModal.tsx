import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { createUseStyles } from 'react-jss';
import axios from 'axios';

const useStyles = createUseStyles({
    photoDialog: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
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
    photoForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        '& button': {
            padding: '0.5rem 1rem',
            border: 'none',
            fontWeight: 'bold',
            backgroundColor: 'var(--accents)',
            cursor: 'pointer',
            color: 'var(--font-primary)',
            borderRadius: '1rem',
            '&:hover': {
                transform: 'scale(1.05)',
            },
            '&:active': {
                transform: 'scale(0.95)',
            },
        }
    },
});

type AvatarModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
  };

const AvatarModal: React.FC<AvatarModalProps> = ({ isOpen, onRequestClose }) => {
    const classes = useStyles();
    const fileInput = useRef<HTMLInputElement>(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const decodedJwt = localStorage.getItem('decodedJwt');
        if (decodedJwt) {
            const { userId } = JSON.parse(decodedJwt);
            setUserId(userId);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (fileInput.current?.files?.length) {
            const file = fileInput.current.files[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', userId);
            try {
                const response = await axios.post('/rest/upload/avatar', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Avatar set:', response.data);
                fileInput.current.value = '';
            } catch (error) {
                console.error('Error setting avatar:', error);
            }
        }
    };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                className={classes.photoDialog}
                contentLabel="Avatar Modal"
            >
                <form method="POST" id="avatar-form" encType="multipart/form-data" className={classes.photoForm} onSubmit={handleSubmit}>
                    <input ref={fileInput} type="file" name="profile-picture" id="profile-picture" accept=".png, .jpg, .jpeg"/>
                    <button type="submit">Set avatar</button>
                </form>
            </Modal>
        </div>
    );
};

export default AvatarModal;