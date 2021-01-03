import React from 'react';
import PropTypes from 'prop-types';

// Imports
import LoadingIndicator from '../../UI/LoadingIndicator/LoadingIndicator';
import Title from '../../UI/Title/Title';
import Button from '../../UI/Buttons/Button/Button';

// Styles
import './JoinGame.scss';

// Presentational Component
const JoinGame = (props) => {
    return (
        <section className='join-game'>
            <Title title='Deduction' />
            {props.isLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <div className='join-game__content'>
                        <h3>Join an existing game:</h3>
                        <p>
                            You can join a game by either entering a valid join link OR entering the games name and
                            password. Both methods require you to also enter a player name.
                        </p>
                        <label htmlFor='game-join-link'>Game Join Link:</label>
                        <input
                            ref={props.joinLinkRef}
                            name='game-join-link'
                            type='password'
                            autoComplete='off'
                            maxLength='61'
                        />
                        {props.joinLinkError}
                        <p>OR</p>
                        <label htmlFor='game-id'>Game Name:</label>
                        <input ref={props.gameNameRef} name='game-id' autoComplete='off' maxLength='20' />
                        {props.gameNameError}
                        <label htmlFor='game-password'>Game Password:</label>
                        <input
                            ref={props.gamePasswordRef}
                            name='game-password'
                            type='password'
                            autoComplete='off'
                            maxLength='20'
                        />
                        {props.gamePasswordError}
                        <p>-</p>
                        <label htmlFor='player-name'>Player Name:</label>
                        <input ref={props.playerNameRef} name='player-name' autoComplete='off' maxLength='12' />
                        {props.playerNameError}
                        {props.generalError}
                    </div>

                    <Button title={'Join!'} function={props.submitHandler} />
                </>
            )}
        </section>
    );
};

JoinGame.propTypes = {
    isLoading: PropTypes.bool,
    joinLinkRef: PropTypes.object,
    gameNameRef: PropTypes.object,
    gamePasswordRef: PropTypes.object,
    playerNameRef: PropTypes.object,
    generalError: PropTypes.element,
    joinLinkError: PropTypes.element,
    gameNameError: PropTypes.element,
    gamePasswordError: PropTypes.element,
    playerNameError: PropTypes.element,
    submitHandler: PropTypes.func.isRequired,
};

JoinGame.defaultProps = {
    submitHandler: () => {
        console.log('[JOIN BTN] submitHandler err');
    },
};

export default JoinGame;
