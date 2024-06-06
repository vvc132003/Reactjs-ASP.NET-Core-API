import React, { useState } from 'react';
import { logins } from '../../services/UserServices';

const LoginForm = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

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
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    };
    const huyLogin = () => {
        setEmail('');
        setPassword('');
    }
    return (
        <div className="container">
            <div className="row justify-content-center mt-5 ">
                <div className='bg-while col-md-4 p-5 login-form-container'>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="mb-3">
                            <input type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} placeholder='Email hoặc số điện thoại' className="form-control" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <input type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password" placeholder='Mật khẩu' className="form-control" />
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <button onClick={huyLogin} className="btn btn-danger w-100">Huỷ</button>
                            </div>
                            <div className="col-8">
                                <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-3 text-center">
                        <a href='#' className="text-decoration-none">Quên mật khẩu?</a>
                    </div>
                    <hr />
                    <button type="button" className="btn btn-success w-100">Đăng ký</button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
