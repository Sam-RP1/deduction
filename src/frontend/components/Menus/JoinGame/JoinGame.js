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
                <h3>Enter Join Link:</h3>
                <input onInput={(evt) => props.enterLink(evt)} />
            </div>

            <Button title={'Join!'} function={props.submitHandler} />
        </section>
    );
};

JoinGame.propTypes = {
    // Link
    enterLink: PropTypes.func.isRequired,
    // Submit
    submitHandler: PropTypes.func.isRequired,
    // Errors
    submitErrMsg: PropTypes.object,
};

JoinGame.defaultProps = {
    enterLink: () => {
        console.log('[ENTER LINK] enterLink err');
    },
    submitHandler: () => {
        console.log('[JOIN BTN] submitHandler err');
    },
};

export default JoinGame;
