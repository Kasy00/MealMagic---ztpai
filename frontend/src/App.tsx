import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Navigate, Routes } from 'react-router-dom';
import Login from './containers/Login';
import Register from './containers/Register';

function App() {
  console.log('hello!')
  useEffect(() => {
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
      .then(data => console.log(data))
      .catch(error => console.error('Error ', error));
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default App;
