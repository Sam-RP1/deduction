import React from 'react';
import PropTypes from 'prop-types';

// Imports
// import LoadingIndicator from '../UI/LoadingIndicator/LoadingIndicator'
import Gameboard from './Gameboard/Gameboard';
import GameControls from './GameControls/GameControls';

// Styles
import '../../styles/root.scss';
import './Game.scss';

// Presentational Component
const Game = (props) => {
    return (
        <section className='game'>
            <div className='game__board'>
                <div className='game__board-container'>
                    <div className='game__board-container__information'>
                        <p>
                            <span className='red-txt'>{props.score.red}</span> -{' '}
                            <span className='blue-txt'>{props.score.blue}</span>
                        </p>
                        <p>
                            <span className={props.turn === 'blue' ? 'blue-txt' : 'red-txt'}>Turn</span>
                        </p>
                    </div>
                    <Gameboard
                        turn={props.turn}
                        playerTeam={props.playerTeam}
                        playerRole={props.playerRole}
                        wordsArr={props.wordsArr}
                        guess={props.guess}
                        isGameOver={props.isGameOver}
                    />
                    {props.isGameOver !== null && (
                        <div
                            className={
                                'game__board-container__game-over ' +
                                (props.isGameOver === 'blue' ? 'blue-bg' : 'red-bg')
                            }
                        >
                            <h1>--- Game Over ---</h1>
                            <h1>{props.isGameOver} team wins!</h1>
                        </div>
                    )}
                </div>
                <GameControls
                    newGame={props.newGame}
                    joinCode={props.joinCode}
                    endTurn={props.endTurn}
                    turn={props.turn}
                    blueTeam={props.blueTeam}
                    redTeam={props.redTeam}
                    unassigned={props.unassigned}
                    randomiseTeams={props.randomiseTeams}
                    selectTeam={props.selectTeam}
                    selectRole={props.selectRole}
                    playerTeam={props.playerTeam}
                    playerRole={props.playerRole}
                    wordBundles={props.wordBundles}
                    wordBundle={props.wordBundle}
                    selectWordBundle={props.selectWordBundle}
                    customWords={props.customWords}
                    addCustomWordHandler={props.addCustomWordHandler}
                    removeCustomWord={props.removeCustomWord}
                    useCustomWords={props.useCustomWords}
                    customWordError={props.customWordError}
                />
            </div>
        </section>
    );
};

Game.propTypes = {
    newGame: PropTypes.func,
    joinCode: PropTypes.string,
    endTurn: PropTypes.func,
    score: PropTypes.object,
    turn: PropTypes.string,
    // Teams & Roles
    blueTeam: PropTypes.array,
    redTeam: PropTypes.array,
    unassigned: PropTypes.array,
    randomiseTeams: PropTypes.func,
    selectTeam: PropTypes.func,
    selectRole: PropTypes.func,
    playerTeam: PropTypes.string,
    playerRole: PropTypes.string,
    // Words
    wordBundles: PropTypes.array,
    wordBundle: PropTypes.string,
    selectWordBundle: PropTypes.func,
    wordsArr: PropTypes.array,
    customWords: PropTypes.array,
    addCustomWordHandler: PropTypes.func,
    removeCustomWord: PropTypes.func,
    useCustomWords: PropTypes.func,
    customWordError: PropTypes.string,
    // Guess
    guess: PropTypes.func,
    // Game over
    isGameOver: PropTypes.string,
};

Game.defaultProps = {};

export default Game;
