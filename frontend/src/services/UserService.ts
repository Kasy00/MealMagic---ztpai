import axios, { AxiosError } from 'axios';

export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const loginUser = async (email: string, password: string) => {
    try {
        const reqBody = {
            email,
            password
        };

        const response = await axios.post('/rest/auth/login', reqBody);
        if (response.data.token) {
            return { ...response.data, success: true };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const registerUser = async (username: string, email: string, password: string) => {
    try {
        const reqBody = {
            username,
            email,
            password
        };
        
        const response = await axios.post('/rest/auth/register', reqBody);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};