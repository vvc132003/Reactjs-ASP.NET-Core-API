import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientInfo = () => {
    const [clientInfo, setClientInfo] = useState(null);

    useEffect(() => {
        const fetchClientInfo = async () => {
            try {
                const response = await axios.get('https://api.bigdatacloud.net/data/client-info');
                setClientInfo(response.data);
            } catch (error) {
                console.error('Error fetching client info:', error);
            }
        };

        fetchClientInfo();
    }, []);

    return (
        <div>
            <h2>Client Information</h2>
            {clientInfo && (
                <ul>
                    <li><strong>IP Address:</strong> {clientInfo.ipString}</li>
                    <li><strong>Device:</strong> {clientInfo.device}</li>
                    <li><strong>Operating System:</strong> {clientInfo.os}</li>
                    <li><strong>Browser:</strong> {clientInfo.userAgentDisplay}</li>
                    <li><strong>Languages:</strong> {clientInfo.userLanguages.join(', ')}</li>
                </ul>
            )}
        </div>
    );
};

export default ClientInfo;
