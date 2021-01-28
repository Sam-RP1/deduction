import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../../styles/root.scss';
import './Game.scss';

// Imports
import Gameboard from './Gameboard/Gameboard';
import GameControls from './Controls/GameControls/GameControls';
import TeamControls from './Controls/TeamControls/TeamControls';
import RoleControls from './Controls/RoleControls/RoleControls';
import BundleControls from './Controls/BundleControls/BundleControls';

/**
 * Presentational component for the Game container (Page / View).
 * @function Game
 * @param {object}  props - React props.
 * @prop {function} props.addCustomWordHandler - Function allowing client to add a custom word.
 * @prop {array}    props.blueTeam - The clients on the blue team.
 * @prop {object}   props.customWordError - Error to be displayed if one exists.
 * @prop {array}    props.customWords - Client entered custom words.
 * @prop {function} props.endTurn - Function that ends a teams turn.
 * @prop {object}   props.gameError - Object containing an error received from the server.
 * @prop {function} props.guess - Function placed on each gameboard grid block to allow guesses to be made by the client.
 * @prop {string}   props.isGameOver - String indicating if the game is over and which team has won.
 * @prop {string}   props.joinCode - Code clients can use to join this specific game.
 * @prop {function} props.newGame - Function allowing client to generate a new game.
 * @prop {string}   props.playerRole - The clients role.
 * @prop {string}   props.playerTeam - String containing the clients team.
 * @prop {func}     props.randomiseTeams - Function that emits a socket event to randomise the teams.
 * @prop {array}    props.redTeam - The clients on the red team.
 * @prop {function} props.removeCustomWord - Function allowing client to remove a custom word.
 * @prop {object}   props.score - Contains the score for the blue team and the red team.
 * @prop {function} props.selectRole - Function that emits a socket event to assign the client the selected role.
 * @prop {function} props.selectTeam - Function that emits a socket event to put the client on the selected team.
 * @prop {function} props.selectWordBundle - Function that allows clients to select a word bundle for play.
 * @prop {string}   props.turn - The current teams turn.
 * @prop {array}    props.unassigned - The clients that are not on a team.
 * @prop {function} props.useCustomWords - Function that emits a socket event to use the currently entered custom words for play.
 * @prop {array}    props.wordsArr - Word data used to generate the gameboard grid.
 * @prop {string}   props.wordBundle - The currently selected word bundle.
 * @prop {array}    props.wordBundles - The currently selectable word bundles as strings.
 * @returns {JSX}
 */
const Game = (props) => {
    return (
        <section className='game'>
            <div className='game__board'>
                <div className='game__board__information'>
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
                    wordsData={props.wordsArr}
                    guess={props.guess}
                    isGameOver={props.isGameOver}
                    gameError={props.gameError}
                />
                {props.isGameOver !== null && (
                    <div className={'game__board__game-over ' + (props.isGameOver === 'blue' ? 'blue-bg' : 'red-bg')}>
                        <h1>--- Game Over ---</h1>
                        <h1>{props.isGameOver} team wins!</h1>
                    </div>
                )}
                {props.gameError}
            </div>
            <div className='game__controls'>
                <GameControls
                    wordBundle={props.wordBundle}
                    customWords={props.customWords}
                    newGame={props.newGame}
                    joinCode={props.joinCode}
                    endTurn={props.endTurn}
                    playerTeam={props.playerTeam}
                    turn={props.turn}
                />

                <TeamControls
                    randomiseTeams={props.randomiseTeams}
                    selectTeam={props.selectTeam}
                    clientTeam={props.playerTeam}
                    blueTeam={props.blueTeam}
                    redTeam={props.redTeam}
                    unassigned={props.unassigned}
                />

                <RoleControls
                    selectRole={props.selectRole}
                    clientTeam={props.playerTeam}
                    clientRole={props.playerRole}
                />

                <BundleControls
                    wordBundles={props.wordBundles}
                    wordBundle={props.wordBundle}
                    selectWordBundle={props.selectWordBundle}
                    addCustomWordHandler={props.addCustomWordHandler}
                    customWords={props.customWords}
                    customWordError={props.customWordError}
                    removeCustomWord={props.removeCustomWord}
                    useCustomWords={props.useCustomWords}
                />
            </div>
        </section>
    );
};

Game.propTypes = {
    addCustomWordHandler: PropTypes.func,
    blueTeam: PropTypes.arrayOf(
        PropTypes.shape({
            playerId: PropTypes.string,
            playerName: PropTypes.string,
            team: PropTypes.string,
            role: PropTypes.string,
        })
    ),
    customWordError: PropTypes.object,
    customWords: PropTypes.arrayOf(PropTypes.string),
    endTurn: PropTypes.func,
    gameError: PropTypes.object,
    guess: PropTypes.func,
    isGameOver: PropTypes.string,
    joinCode: PropTypes.string,
    newGame: PropTypes.func,
    playerRole: PropTypes.string,
    playerTeam: PropTypes.string,
    randomiseTeams: PropTypes.func,
    redTeam: PropTypes.arrayOf(
        PropTypes.shape({
            playerId: PropTypes.string,
            playerName: PropTypes.string,
            team: PropTypes.string,
            role: PropTypes.string,
        })
    ),
    removeCustomWord: PropTypes.func,
    score: PropTypes.objectOf({ blue: PropTypes.string, red: PropTypes.string }),
    selectRole: PropTypes.func,
    selectTeam: PropTypes.func,
    selectWordBundle: PropTypes.func,
    turn: PropTypes.string,
    unassigned: PropTypes.arrayOf(
        PropTypes.shape({
            playerId: PropTypes.string,
            playerName: PropTypes.string,
            team: PropTypes.string,
            role: PropTypes.string,
        })
    ),
    useCustomWords: PropTypes.func,
    wordsArr: PropTypes.arrayOf(PropTypes.string),
    wordBundle: PropTypes.string,
    wordBundles: PropTypes.arrayOf(PropTypes.string),
};

Game.defaultProps = {};

export default React.memo(Game);
