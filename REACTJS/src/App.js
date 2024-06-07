import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/UserComponents/Header';
import TableUser from './components/UserComponents/TableUser';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './components/Home/Login';
import Phong from './components/Rooms/Phong';
import RoomDetail from './components/Rooms/RoomDetail';
import ChatComponent from './components/UserComponents/ChatComponent';
import Chat from './components/Home/Chat';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserInfo(user);
    navigate('/');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate('/logins');
  };

  useEffect(() => {
    const session = sessionStorage.getItem('user');
    if (session) {
      const user = JSON.parse(session);
      setIsLoggedIn(true);
      setUserInfo(user);
    }
  }, []);

  return (
    <>
      <div className='app-container'>
        <Header isLoggedIn={isLoggedIn} userInfo={userInfo} handleLogout={handleLogout} />
        <br />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<TableUser />} />
            <Route path='/logins' element={<LoginForm handleLogin={handleLogin} />} />
            <Route path='rooms/phongs' element={<Phong />} />
            <Route path='rooms/room/:roomNumber' element={<RoomDetail />} />
            <Route path='/chat/:cuochoithoaiid' element={<Chat />} />
          </Routes>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
    </>
  );
}

export default App;
