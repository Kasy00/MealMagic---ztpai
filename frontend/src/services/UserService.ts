import axios, { AxiosError } from 'axios';

export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const loginUser = async (email: string, password: string) => {
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
};