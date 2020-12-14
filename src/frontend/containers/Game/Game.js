import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux Action Types
import * as gameRA from '../../store/actions/game';

// Presentational Components
import GameCmpnt from '../../components/Game/Game';

// Container Component
const Game = () => {
    // Redux Selectors
    // const gameTimer = useSelector((state) => state.gameRA.gameTimer);
    const gameId = useSelector((state) => state.game.id);
    const wordsArr = useSelector((state) => state.game.words);
    const score = useSelector((state) => state.game.score);
    const teamTurn = useSelector((state) => state.game.turn);

    console.log('gameId', gameId);
    console.log('turn', teamTurn);

    // Redux Actions
    const dispatch = useDispatch();
    const newGameReq = useCallback(() => dispatch(gameRA.newGame()), [dispatch]);
    const setTeam = useCallback((team) => dispatch(gameRA.setTeamAC(team)), [dispatch]);
    const setRole = useCallback((team) => dispatch(gameRA.setRoleAC(team)), [dispatch]);
    const endTurnReq = useCallback(() => dispatch(gameRA.endTurn()), [dispatch]);

    // State
    // const [customWordsErrMsg, setCustomWordsErrMsg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false); // eslint-disable-line

    // Vars

    // Functions
    useEffect(() => {
        gameId === null ? setIsLoaded(false) : setIsLoaded(true);
    }, [gameId]);

    // Render
    return (
        <GameCmpnt
            isLoaded={isLoaded}
            gameId={gameId}
            wordsArr={wordsArr}
            score={score}
            teamTurn={teamTurn}
            setTeam={setTeam}
            setRole={setRole}
            newGameReq={newGameReq}
            endTurnReq={endTurnReq}
        />
    );
};

export default Game;
