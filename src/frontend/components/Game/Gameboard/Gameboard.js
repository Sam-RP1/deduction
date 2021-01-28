import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './Gameboard.scss';

/**
 * Component containing the Deduction Gameboard.
 * @function Gameboard
 * @param {object}  props - React props.
 * @prop {function} props.guess - Function placed on each gameboard grid block to allow guesses to be made by the client.
 * @prop {string}   props.isGameOver - String indicating if the game is over and which team has won.
 * @prop {string}   props.playerRole - The clients role.
 * @prop {string}   props.playerTeam - The clients team.
 * @prop {string}   props.turn - The current teams turn.
 * @prop {array}    props.wordsData - Word data used to generate the gameboard grid.
 * @returns {JSX}
 */
const Gameboard = (props) => {
    return (
        <section className={'gameboard' + (props.isGameOver !== null ? ' disable' : '')}>
            {props.wordsData.length === 25 ? (
                props.wordsData.map((wordData) => {
                    const isGuessed = wordData.guessData.isGuessed;
                    return (
                        <div
                            key={wordData.word}
                            id={wordData.word}
                            className={
                                'gameboard__grid-block' +
                                (props.playerRole === 'insider' || isGuessed === true
                                    ? ' ' + wordData.denomination
                                    : '') +
                                (isGuessed === true ? ' guessed' : '')
                            }
                            onClick={() => {
                                props.guess(wordData, props.turn, props.playerTeam, props.playerRole);
                            }}
                        >
                            <span>
                                <p>{wordData.word}</p>
                            </span>
                        </div>
                    );
                })
            ) : (
                <div className='gameboard__placeholder'>
                    <h2>Welcome! Please select a word bundle or enter 25 of your own words.</h2>
                </div>
            )}
        </section>
    );
};

Gameboard.propTypes = {
    guess: PropTypes.func,
    isGameOver: PropTypes.string,
    playerRole: PropTypes.string,
    playerTeam: PropTypes.string,
    turn: PropTypes.string,
    wordsData: PropTypes.arrayOf(
        PropTypes.shape({
            denomination: PropTypes.string,
            word: PropTypes.string,
            guessData: PropTypes.shape({
                isGuessed: PropTypes.bool,
                team: PropTypes.string,
            }),
        })
    ),
};

Gameboard.defaultProps = {};

export default React.memo(Gameboard);
