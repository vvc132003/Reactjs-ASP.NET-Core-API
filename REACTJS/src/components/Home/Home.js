import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Biến trạng thái cho biết đang kiểm tra xác thực hay không
    const navigate = useNavigate();

    const checkAuth = () => {
        const session = sessionStorage.getItem('user');
        console.log('Session storage:', session); // Kiểm tra dữ liệu session
        const userIsAuthenticated = session ? true : false;
        setIsLoggedIn(userIsAuthenticated);
        setIsCheckingAuth(false); 
    };

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        console.log('isLoggedIn:', isLoggedIn); // Kiểm tra trạng thái đăng nhập
        if (!isLoggedIn && !isCheckingAuth) {
            navigate('/logins');
        }
    }, [isLoggedIn, isCheckingAuth, navigate]);

    if (isCheckingAuth) {
        return <div>Loading...</div>;
    }

    // Nếu người dùng đã đăng nhập, hiển thị nội dung trang chủ
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Tên khách hàng</th>
                                <th>Ngày đặt</th>
                                <th>Ngày dự kiến trả</th>
                                <th>Loại hình thuê</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Võ Văn Chính</td>
                                <td>22/05/2024</td>
                                <td>23/05/2024</td>
                                <td>Theo ngày</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="col-6">haha</div>
            </div>
        </div>
    );
};

export default Home;
