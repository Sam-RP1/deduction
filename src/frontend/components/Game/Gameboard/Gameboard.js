import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './Gameboard.scss';

// Presentational Component
const Gameboard = (props) => {
    return (
        <section className='gameboard'>
            {props.wordsArr.map((block) => {
                return (
                    <div
                        key={block.word}
                        id={block.word}
                        className={'gameboard__word-block gameboard__word-block' + '__large'}
                    >
                        <p>{block.word}</p>
                    </div>
                );
            })}
        </section>
    );
};

Gameboard.propTypes = {
    wordsArr: PropTypes.array.isRequired,
};

Gameboard.defaultProps = {
    wordsArr: [{ denomination: 'blank', word: 'ERROR' }],
};

export default Gameboard;
