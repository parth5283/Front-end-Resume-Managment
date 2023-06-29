import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './LoginNavbar';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', { username, password });
      if (response.status === 200) {
        console.log('Login successful');
        setIsLoggedIn(true);
        // Store the login status in local storage
        localStorage.setItem('isLoggedIn', 'true');
        // Redirect to the desired page or perform any other actions
      }
    } catch (error) {
      console.error('Failed to login:', error);
      // Display an error message to the user
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Remove the login status from local storage
    localStorage.removeItem('isLoggedIn');
    // Perform any other logout logic or actions
    // For example, clear user data from local storage, reset state, or redirect to the login page
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      {!isLoggedIn && (
        <>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default LoginPage;