import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';

const ChatComponent = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7233/chathub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                    connection.on('ReceiveMessage', (user, message) => {
                        setMessages(prevMessages => [...prevMessages, { user, message }]);
                    });
                    fetchMessagesFromApi();
                })
                .catch(e => {
                    setError('Connection failed: ' + e.message);
                    console.error('Connection failed: ', e);
                });
        }
    }, [connection]);

    const fetchMessagesFromApi = async () => {
        try {
            const response = await axios.get('https://localhost:7233/api/user/messages');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            if (!user || !message) {
                throw new Error('User and Message must be provided.');
            }
            await axios.post('https://localhost:7233/api/user/sendmessage', {
                user: user,
                message: message
            });
            setMessage('');
        } catch (e) {
            setError(e.message);
            console.error(e);
        }
    };

    return (
        <div>
            {error && <div>{error}</div>}
            <div>
                <input
                    type="text"
                    placeholder="User"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div>
                <ul>
                    {messages.map((m, index) => (
                        <li key={index}><strong>{m.user}:</strong> {m.message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChatComponent;