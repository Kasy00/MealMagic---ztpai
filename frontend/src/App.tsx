import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Navigate, Routes } from 'react-router-dom';
import Login from './containers/Login';
import Register from './containers/Register';
import Home from './containers/Home';
import Profile from './containers/Profile';
import useLocalState from './util/useLocalStorage';
import { log } from 'console';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(() => {
    if (!jwt) {
      const reqBody = {
        'email': 'test@test.com',
        'password': 'password'
      };
  
      fetch('/rest/auth/login', {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
        },
        'body': JSON.stringify(reqBody),
      })
        .then(response => {
          if(!response.ok){
            throw new Error(`Http error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setJwt(data.token);
          console.log(data);
        })
        .catch(error => console.error('Error ', error));
    }
  }, []);

  useEffect(() => {
    console.log(jwt);
  }, [jwt]);

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      
      <Route 
        path='/home' 
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path='/profile' 
        element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
        } 
      />
    </Routes>
  );
}

export default App;
