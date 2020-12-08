import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux Action Types
// import * as gameRA from '../../store/actions/game';

// Presentational Components
import GameCmpnt from '../../components/Game/Game';

// Container Component
const Game = () => {
    // Redux Selectors
    // const gameTimer = useSelector((state) => state.gameRA.gameTimer);
    const gameId = useSelector((state) => state.game.id);
    const wordsArr = useSelector((state) => state.game.words);
    console.log('gameId', gameId);

    // Redux Actions
    const dispatch = useDispatch(); // eslint-disable-line
    // const toggleTurnTimer = useCallback(() => dispatch(cgm.toggleTurnTimer()), [dispatch]);

    // State
    // const [customWordsErrMsg, setCustomWordsErrMsg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false); // eslint-disable-line

    // Vars

    // Functions
    useEffect(() => {
        gameId === null ? setIsLoaded(false) : setIsLoaded(true);
    }, [gameId]);

    // Render
    return <GameCmpnt isLoaded={isLoaded} wordsArr={wordsArr} />;
};

export default Game;
