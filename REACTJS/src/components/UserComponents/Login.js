import React, { useState } from 'react';
import { logins } from '../../services/UserServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        let res = await logins(email,password);
        if (res && res.id) {
            console.log('Login successful', res);
            navigate('/');

        } else {
            console.log('Login failed');
        }
   
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
