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
    const turn = useSelector((state) => state.game.turn);
    const team = useSelector((state) => state.game.team);
    const role = useSelector((state) => state.game.role);
    // const guessesBlue = useSelector((state) => state.game.guessesBlue);
    // const guessesRed = useSelector((state) => state.game.guessesRed);

    console.log('gameId', gameId);
    console.log('turn', turn);

    // Redux Actions
    const dispatch = useDispatch();
    const newGameReq = useCallback(() => dispatch(gameRA.newGame()), [dispatch]);
    const setTeam = useCallback((team) => dispatch(gameRA.setTeamAC(team)), [dispatch]);
    const setRole = useCallback((team) => dispatch(gameRA.setRoleAC(team)), [dispatch]);
    const endTurnReq = useCallback(() => dispatch(gameRA.changeTurn()), [dispatch]);

    // State
    // const [customWordsErrMsg, setCustomWordsErrMsg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false); // eslint-disable-line

    // Vars

    // Functions
    useEffect(() => {
        gameId === null ? setIsLoaded(false) : setIsLoaded(true);
    }, [gameId]);

    const guess = (guess) => {
        if (team !== null && role === 'agent') {
            if (guess.denomination === 'bomb') {
                console.log('OMG A BOMB');
                // Declare winning team
                // Set their score to 0
                // Show winning UI and button to start a new game
            } else if (guess.denomination === 'blank') {
                console.log('OMG A BLANK');
                // End current teams turn
            } else if (team === 'red' && guess.denomination === 'blue') {
                // End the red teams turn
                // Reduce blue teams score
            } else if (team === 'blue' && guess.denomination === 'red') {
                // End the blue teams turn
                // Reduce red teams score
            } else if (team === 'red' && guess.denomination === 'red') {
                // Reduce red teams score
            } else if (team === 'blue' && guess.denomination === 'blue') {
                // Reduce blue teams score
            } else {
                console.log('ERROR NOT ALL GUESS SCENARIOS COVERED');
            }
            console.log(guess);
        }
        // check if the word is a bomb
        // check if the word is a blank
        // then ELSE
        // check team
        // check turn
        // check role
        // check not already guessed in either teams arrays
    };

    // Render
    return (
        <GameCmpnt
            isLoaded={isLoaded}
            gameId={gameId}
            wordsArr={wordsArr}
            score={score}
            teamTurn={turn}
            setTeam={setTeam}
            setRole={setRole}
            newGameReq={newGameReq}
            endTurnReq={endTurnReq}
            team={team}
            role={role}
            guess={guess}
        />
    );
};

export default Game;
