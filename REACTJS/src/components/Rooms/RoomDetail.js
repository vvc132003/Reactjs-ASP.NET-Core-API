import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoom } from '../../services/RoomsService';

const RoomDetail = () => {
    const { roomNumber } = useParams();
    const [room, setRoom] = useState({});

    useEffect(() => {
        fetchRoom();
    }, [roomNumber]);

    const fetchRoom = async () => {
        try {
            const res = await getRoom(roomNumber);
            console.log('Fetched room:', res);
            setRoom(res);
        } catch (error) {
            console.error('Error fetching room:', error);
        }
    };
    
    return (
        <div>
            <h1>Room {roomNumber} Details</h1>
            <p>Type: {room.type}</p>
            <p>Price: ${room.price} per night</p>
            <p>Status: {room.statusbar}</p>
        </div>
    );
};

export default RoomDetail;
