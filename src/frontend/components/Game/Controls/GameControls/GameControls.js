import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

// Styles
import '../Controls.scss';

// Imports
import Button from '../../../UI/Buttons/Button/Button';

/**
 * Presentational component that generates the Deduction Game Controls for clients to utilise.
 * @function GameControls
 * @param {object}  props - React props.
 * @prop {array}    props.customWords - Client entered custom words.
 * @prop {function} props.endTurn - Function that ends a teams turn.
 * @prop {string}   props.joinCode - Code clients can use to join this specific game.
 * @prop {function} props.newGame - Function allowing client to generate a new game.
 * @prop {string}   props.playerTeam - The clients team.
 * @prop {string}   props.turn - The current teams turn.
 * @prop {string}   props.wordBundle - The currently selected word bundle.
 * @returns {JSX}
 */
const GameControls = (props) => {
    const copyJoinCode = async () => {
        await copy(props.joinCode);
    };

    return (
        <div className='game__controls__btns-container'>
            <Button
                opClasses={props.customWords.length !== 25 && props.wordBundle === '' ? ' disable' : ''}
                title={'New Game'}
                function={() => props.newGame()}
            />
            <Button title={'Join Code'} function={() => copyJoinCode()} />
            <Button
                opClasses={
                    'btn__' +
                    (props.turn === 'blue' ? 'blue' : 'red') +
                    (props.turn !== props.playerTeam ? ' disable' : '')
                }
                title={'End Turn'}
                function={() => props.endTurn(props.playerTeam, props.turn)}
            />
        </div>
    );
};

GameControls.propTypes = {
    customWords: PropTypes.arrayOf(PropTypes.string),
    endTurn: PropTypes.func,
    joinCode: PropTypes.string,
    newGame: PropTypes.func,
    playerTeam: PropTypes.string,
    turn: PropTypes.string,
    wordBundle: PropTypes.string,
};

GameControls.defaultProps = {};

export default React.memo(GameControls);
