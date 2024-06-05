import React, { useState } from 'react';
import { logins } from '../../services/UserServices';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        // let res = await logins(email,password);
        // if (res && res.id) {
        //     console.log('Login successful', res);
        //     window.location.href = '/';

        // } else {
        //     console.log('Login failed');
        // }
        if (!email || !password) {
            toast.error("email / pass is required");
            return;
        }
        let res = await logins(email, password);
        console.log("check res", res);
        if (res && res.token) {
            toast.success("Login successful");
            localStorage.setItem('token', res.token);
            window.location.href = '/';
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            } else {
                toast.error("Login failed");
            }
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
