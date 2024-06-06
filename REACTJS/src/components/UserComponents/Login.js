import React, { useState } from 'react';
import { logins } from '../../services/UserServices';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      let res = await logins(email, password);
      if (res && res.id && res.first_name) {
        console.log('Login successful', res);
        sessionStorage.setItem('user', JSON.stringify({
          id: res.id,
          email: res.email,
          first_name: res.first_name,
          last_name: res.last_name,
        }));
        handleLogin(res);
      } else {
        console.log('Login failed');
        setMessage('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setMessage('An error occurred during login');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
