import React from 'react';
import useLocalState from '../../util/useLocalStorage';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    return jwt ? <>{children}</> : <Navigate to='/' />;
};

export default PrivateRoute;