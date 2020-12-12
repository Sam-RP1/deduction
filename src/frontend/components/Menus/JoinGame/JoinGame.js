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
                <h3>Enter Join Code:</h3>
                <input onInput={(evt) => props.enterCode(evt)} />
                {props.submitErrMsg}
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
