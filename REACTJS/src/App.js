import React from 'react';
import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/UserComponents/Header';
import TableUser from './components/UserComponents/TableUser';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './components/UserComponents/Login';
import Phong from './components/Rooms/Phong';
import RoomDetail from './components/Rooms/RoomDetail';

function App() {
  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<TableUser />} />
            <Route path='/logins' element={<Login />} />
            <Route path='rooms/phongs' element={<Phong />} />
            <Route path='rooms/room/:roomNumber' element={<RoomDetail />} />
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
