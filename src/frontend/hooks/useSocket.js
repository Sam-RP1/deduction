import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import socketIOClient from 'socket.io-client';

// Redux Action Types
import * as player from '../store/actions/player';

const useSocket = () => {
    // Redux Actions
    const dispatch = useDispatch();
    const submitPlayerId = useCallback((id) => dispatch(player.setPlayerId(id)), [dispatch]); // eslint-disable-line

    // Vars & Refs
    const socketRef = useRef();
    const SOCKET_SERVER_URL = window.location.origin;

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {});

        socketRef.current.on('connect', () => {
            submitPlayerId(socketRef.current.id);
        });

        return () => {
            socketRef.current.disconnect();
            console.log('disconnect from socket');
        };
    }, []);

    return { socketRef };
};

export default useSocket;
