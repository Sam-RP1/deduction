import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './Gameboard.scss';

// Presentational Component
const Gameboard = (props) => {
    return (
        <section className={'gameboard' + (props.isGameOver !== null ? ' disable' : '')}>
            {props.wordsArr.length === 25 ? (
                props.wordsArr.map((block) => {
                    return (
                        <div
                            key={block.word}
                            id={block.word}
                            className={
                                'gameboard__word-block ' +
                                (props.playerRole === 'insider' || block.guessData.isGuessed === true
                                    ? block.denomination
                                    : '') +
                                (block.guessData.isGuessed === true ? ' guessed' : '')
                            }
                            onClick={() => {
                                props.guess(block, props.turn, props.playerTeam, props.playerRole);
                            }}
                        >
                            <span>
                                <p>{block.word}</p>
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
    turn: PropTypes.string,
    playerTeam: PropTypes.string,
    playerRole: PropTypes.string,
    wordsArr: PropTypes.array,
    guess: PropTypes.func,
    isGameOver: PropTypes.string,
};

Gameboard.defaultProps = {};

export default Gameboard;
