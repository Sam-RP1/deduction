import React from 'react';
import PropTypes from 'prop-types';

// Imports
import Title from '../../UI/Title/Title';
import Button from '../../UI/Buttons/Button/Button';

// Styles
import './JoinGame.scss';

// Presentational Component
const JoinGame = (props) => {
    return (
        <section className='join-game'>
            <Title title='Deduction' />

            <div className='join-game__content'>
                <h3>Join an existing game:</h3>
                <label htmlFor='lobby-name'>Lobby Join Link:</label>
                <input name='lobby-name' type='password' autoComplete='off' />
                <label htmlFor='player-name'>Player Name:</label>
                <input name='player-name' autoComplete='off' />
            </div>

            <Button title={'Join!'} function={props.submitHandler} />
        </section>
    );
};

JoinGame.propTypes = {
    // Code
    enterCode: PropTypes.func.isRequired,
    // Submit
    submitHandler: PropTypes.func.isRequired,
    // Errors
    submitErrMsg: PropTypes.object,
};

JoinGame.defaultProps = {
    // Code
    enterCode: () => {
        console.log('[ENTER CODE] enterCode err');
    },
    // Submit
    submitHandler: () => {
        console.log('[JOIN BTN] submitHandler err');
    },
};

export default JoinGame;
