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
                <label htmlFor='join-link'>Lobby Join Link:</label>
                <input ref={props.joinLinkRef} name='join-link' type='password' autoComplete='off' maxLength='20' />
                {props.joinLinkError}
                <label htmlFor='player-name'>Player Name:</label>
                <input ref={props.playerNameRef} name='player-name' autoComplete='off' maxLength='12' />
                {props.playerNameError}
            </div>

            <Button title={'Join!'} function={props.submitHandler} />
        </section>
    );
};

JoinGame.propTypes = {
    joinLinkRef: PropTypes.object,
    playerNameRef: PropTypes.object,
    joinLinkError: PropTypes.element,
    playerNameError: PropTypes.element,
    submitHandler: PropTypes.func.isRequired,
};

JoinGame.defaultProps = {
    submitHandler: () => {
        console.log('[JOIN BTN] submitHandler err');
    },
};

export default JoinGame;
