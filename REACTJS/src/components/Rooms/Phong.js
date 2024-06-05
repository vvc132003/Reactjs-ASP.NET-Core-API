import React, { useEffect, useState } from 'react';
import { Col, Card, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import RoomDetail from './RoomDetail';
import axios from 'axios';
import { fetchAllRooms } from '../../services/RoomsService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed ,faDoorOpen } from '@fortawesome/free-solid-svg-icons';

const Room = ({ roomNumber, type, price, statusbar }) => {
    const renderLinks = () => {
        switch (statusbar) {
            case 'còn trống':
                return (
                    <>
                        <NavLink
                            to={{
                                pathname: `/rooms/room/${roomNumber}`,
                            }}
                            className="nav-link"
                        >
                            Đặt phòng đơn
                        </NavLink>
                        <NavLink to="/phongs" className="nav-link">
                            Đặt phòng theo đoàn
                        </NavLink>
                        <NavLink to="/users" className="nav-link">
                            Sửa phòng
                        </NavLink>
                    </>
                );
            case 'có khách':
                return (
                    <>
                        <NavLink to="/users" className="nav-link">
                            Chi tiết thuê phòng
                        </NavLink>
                        <NavLink to="/users" className="nav-link">
                            Chuyển phòng
                        </NavLink>
                    </>
                );
            case 'đặt online':
                return (
                    <>
                        <NavLink to="/users" className="nav-link">
                            Check In
                        </NavLink>
                    </>
                );
            default:
                return null;
        }
    };


    const renderIcon = () => {
        switch (statusbar) {
            case 'còn trống':
                return <FontAwesomeIcon icon={faDoorOpen} style={{ color: 'white', fontSize: '30px' }} />;
            case 'có khách':
                return <FontAwesomeIcon icon={faBed} style={{ color: 'white',fontSize: '30px' }} />;
            default:
                return null;
        }
    };

    let backgroundColor = '';
    switch (statusbar) {
        case 'còn trống':
            backgroundColor = '#a8c4cf';
            break;
        case 'có khách':
            backgroundColor = '#0171a3';
            break;
        case 'đặt online':
            backgroundColor = '#35c3d7';
            break;
        default:
            backgroundColor = 'red';
            break;
    }

    return (
        <Col md={2} className="mb-2 ">
            <Card className="room-card" style={{ backgroundColor: backgroundColor, borderRadius: '0px' }}>
                <Card.Body>
                    <Card.Text>{roomNumber}</Card.Text>
                    <Card.Text>{type}</Card.Text>
                    <Card.Text>${price}</Card.Text>
                    {renderIcon()}
                </Card.Body>
                <div className="nav-links">
                    {renderLinks()}
                </div>
            </Card>
        </Col>
    );
};

const RoomList = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getAllRooms();
    }, []);

    const getAllRooms = async () => {
        let res = await fetchAllRooms();
        if (res && res.length > 0) {
            setRooms(res);
        }
    };
    const floors = {};
    rooms.forEach(room => {
        if (!floors[room.idtang]) {
            floors[room.idtang] = [];
        }
        floors[room.idtang].push(room);
    });

    return (
        <Container>
            <div className="room-container">
                <div className="square-container">
                    <div className="square" style={{ backgroundColor: '#a8c4cf' }}>
                        <p>Sẵn sàng đón khách</p>
                    </div>
                </div>
                <div className="square-container">
                    <div className="square" style={{ backgroundColor: '#35c3d7' }}>
                        <p>Phòng được đặt</p>
                    </div>
                </div>
                <div className="square-container">
                    <div className="square" style={{ backgroundColor: '#0171a3' }}>
                        <p>Phòng đã có người ở</p>
                    </div>
                </div>
                <div className="square-container">
                    <div className="square" style={{ backgroundColor: '#285665' }}>
                        <p>Phòng đang sửa chữa</p>
                    </div>
                </div>
                <div className="square-container">
                    <div className="square" style={{ backgroundColor: '#666666' }}>
                        <p>Phòng đang dọn dẹp</p>
                    </div>
                </div>
            </div>
            {
                Object.keys(floors).map(floorNumber => (
                    <div className='floor-container' key={floorNumber}>
                        <div className="floor-number">
                            <p>Tầng {floorNumber}</p>
                        </div>
                        <div className="rooms-list">
                            <Row>
                                {floors[floorNumber].map((room, index) => (
                                    <Room key={index} {...room} />
                                ))}
                            </Row>
                        </div>
                    </div>
                ))
            }
        </Container >
    );
};

export default RoomList;
