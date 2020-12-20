import { useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:4000';
const GAME_UPDATE = 'game_update';
const CONC = 'conc';

const useGame = (lobbyId) => {
    // Implement redux here
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { lobbyId },
        });

        socketRef.current.on(CONC, (data) => {
            const incomingData = data;
            console.log(incomingData);
            // Logic here
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [lobbyId]);

    const sendUpdate = () => {
        // const test = { 0: { txt: 'text' }, 1: { txt: 'text' }, 2: {} };
        // console.log('key length', Object.keys(test).length);
        socketRef.current.emit(GAME_UPDATE, {
            senderId: socketRef.current.id,
            data: 'hello',
        });
    };

    return { sendUpdate };
};

export default useGame;
