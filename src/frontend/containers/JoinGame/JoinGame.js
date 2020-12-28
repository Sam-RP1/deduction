import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Redux
import { joinGame } from '../../store/actions/joinGame';
import { setPlayerName } from '../../store/actions/player';

// Presentational Components
import JoinGameCmpnt from '../../components/Menus/JoinGame/JoinGame';

// Other
import useError from '../../hooks/useError';

// Container Component
const JoinGame = () => {
    console.log('[JOIN GAME CONTAINER RENDER] ' + Date.now());
    // Redux Actions
    const dispatch = useDispatch();
    const joinGameRA = useCallback((data) => dispatch(joinGame(data)), [dispatch]);
    const submitPlayerNameRA = useCallback((name) => dispatch(setPlayerName(name)), [dispatch]);

    // State
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState(null);
    const [joinLinkError, setJoinLinkError] = useState(null);
    const [gameNameError, setGameNameError] = useState(null);
    const [gamePasswordError, setGamePasswordError] = useState(null);
    const [playerNameError, setPlayerNameError] = useState(null);

    // Vars & Refs
    const history = useHistory();
    const joinLinkInput = useRef();
    const gameNameInput = useRef();
    const gamePasswordInput = useRef();
    const playerNameInput = useRef();

    // Other
    const { checkInput, checkJoinLink, generateError } = useError();

    // Functions
    const submitHandler = async () => {
        const joinLink = joinLinkInput.current.value;
        const gameName = gameNameInput.current.value;
        const gamePassword = gamePasswordInput.current.value;
        const playerName = playerNameInput.current.value;
        let valid = false;
        let validGameId;
        let validGamePassword;

        if (gameName.length >= 4 && gameName.length <= 20 && gamePassword.length >= 4 && gamePassword.length <= 20) {
            const gameNameRes = await checkInput(gameNameError, gameName, 'game name', 20, setGameNameError);
            const gamePasswordRes = await checkInput(
                gamePasswordError,
                gamePassword,
                'game password',
                20,
                setGamePasswordError
            );
            if (gameNameRes === true && gamePasswordRes === true) {
                validGameId = gameName;
                validGamePassword = gamePassword;
                valid = true;
            }
        } else {
            const joinLinkRes = await checkJoinLink(joinLinkError, joinLink, setJoinLinkError);
            if (joinLinkRes.pass === true) {
                validGameId = joinLinkRes.gameId;
                validGamePassword = joinLinkRes.gamePassword;
                valid = true;
            }
        }

        const playerNameRes = await checkInput(playerNameError, playerName, 'player name', 12, setPlayerNameError);

        if (valid === true && playerNameRes === true) {
            setIsLoading(true);
            const data = { gameId: validGameId, gamePassword: validGamePassword };
            await submitPlayerNameRA(playerName);
            const isJoined = await joinGameRA(data);
            if (isJoined.status === 'success') {
                history.push('/game');
            } else {
                const errors = [];
                errors.push(isJoined.msg);
                setJoinLinkError(null);
                setGameNameError(null);
                setGamePasswordError(null);
                setPlayerNameError(null);
                setGeneralError(generateError(errors, null, setGeneralError));
                setIsLoading(false);
            }
        }
    };

    // Render
    return (
        <JoinGameCmpnt
            isLoading={isLoading}
            joinLinkRef={joinLinkInput}
            gameNameRef={gameNameInput}
            gamePasswordRef={gamePasswordInput}
            playerNameRef={playerNameInput}
            generalError={generalError}
            joinLinkError={joinLinkError}
            gameNameError={gameNameError}
            gamePasswordError={gamePasswordError}
            playerNameError={playerNameError}
            submitHandler={submitHandler}
        />
    );
};

export default JoinGame;
