import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Modal from 'react-modal';

const useStyles = createUseStyles({
    bmiDialog: {
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
    bmiForm: {
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
    bmiInput: {
        padding: '0.5rem 1rem',
        border: '2px solid var(--accents)',
        borderRadius: '1rem',
        '&:focus': {
            border: '2px solid var(--primary)',
            outline: 'none'
        }
    },
    error: {
        color: 'red',
    }
});

type BmiModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
};

const BmiModal: React.FC<BmiModalProps> = ({ isOpen, onRequestClose }) => {
    const classes = useStyles();
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const decodedJwt = localStorage.getItem('decodedJwt');
        if (decodedJwt) {
            const { userId } = JSON.parse(decodedJwt);
            setUserId(userId);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!height || !weight) {
            setError('Please enter your height and weight');
            return;
        }

        setError(null);

        try {
            const response = await axios.post(`/rest/bmi/set?userId=${userId}&height=${height}&weight=${weight}`);
            onRequestClose();
        } catch (error) {
            setError('Error setting BMI. Please try again.');
            console.error('Error setting BMI:', error);
        }
    };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="BMI Modal"
                className={classes.bmiDialog}
            >
                <form method="POST" id="bmi-form" encType="multipart/form-data" className={classes.bmiForm} onSubmit={handleSubmit}>
                    {error && <p className={classes.error}>{error}</p>}
                    <input 
                        type="number" 
                        id="height" 
                        value={height}
                        className={classes.bmiInput}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder='Height in cm'
                        min={1}
                    />
                    <input 
                        type="number" 
                        id="weight" 
                        value={weight}
                        className={classes.bmiInput}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder='Weight in kg'
                        min={1}
                    />
                    <button type="submit">Set BMI</button>
                </form>
            </Modal>
        </div>
    );
};

export default BmiModal;