import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Redux
import { submitNewGame } from '../../store/actions/game';
import { setPlayerName } from '../../store/actions/player';

// Presentational Components
import CreateGameCmpnt from '../../components/Menus/CreateGame/CreateGame';

// Other
import useError from '../../hooks/useError';

// Container Component
const CreateGame = () => {
    console.log('[CREATE GAME CONTAINER RENDER] ' + Date.now());
    // Redux Actions
    const dispatch = useDispatch();
    const submitNewGameRA = useCallback((data) => dispatch(submitNewGame(data)), [dispatch]);
    const submitPlayerNameRA = useCallback((name) => dispatch(setPlayerName(name)), [dispatch]);

    // State
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState(null);
    const [gameNameError, setGameNameError] = useState(null);
    const [gamePasswordError, setGamePasswordError] = useState(null);
    const [playerNameError, setPlayerNameError] = useState(null);

    // Vars & Refs
    const history = useHistory();
    const gameNameInput = useRef();
    const gamePasswordInput = useRef();
    const playerNameInput = useRef();

    // Other
    const { checkInput, generateError } = useError();

    // Functions
    const submitHandler = async () => {
        const gameName = gameNameInput.current.value;
        const gamePassword = gamePasswordInput.current.value;
        const playerName = playerNameInput.current.value;

        const gameNameRes = await checkInput(gameNameError, gameName, 'game name', 20, setGameNameError);
        const gamePasswordRes = await checkInput(
            gamePasswordError,
            gamePassword,
            'game password',
            20,
            setGamePasswordError
        );
        const playerNameRes = await checkInput(playerNameError, playerName, 'player name', 12, setPlayerNameError);

        if (gameNameRes === true && gamePasswordRes === true && playerNameRes === true) {
            setIsLoading(true);
            const data = { gameId: gameName, gamePassword: gamePassword };
            await submitPlayerNameRA(playerName);
            const isCreated = await submitNewGameRA(data);
            if (isCreated.status === 'success') {
                history.push('/game');
            } else {
                const errors = [];
                errors.push(isCreated.msg);
                setGeneralError(generateError(errors, null, setGeneralError));
                setIsLoading(false);
            }
        }
    };

    // Render
    return (
        <CreateGameCmpnt
            isLoading={isLoading}
            gameNameRef={gameNameInput}
            gamePasswordRef={gamePasswordInput}
            playerNameRef={playerNameInput}
            generalError={generalError}
            gameNameError={gameNameError}
            gamePasswordError={gamePasswordError}
            playerNameError={playerNameError}
            submitHandler={submitHandler}
        />
    );
};

export default CreateGame;
