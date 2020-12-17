import React from 'react';
import PropTypes from 'prop-types';

// Imports
import Button from '../../UI/Buttons/Button/Button';

// Styles
import './GameControls.scss';

// Presentational Component
const GameControls = (props) => {
    const temp = ['eng-standard', 'halo', 'csgo', 'formula 1', 'pokemon'];
    const selectedWordBundle = 'eng-standard';
    const copyJoinCode = () => {
        console.log('[COPY LINK]');
        let aux = document.createElement('input');
        aux.style.position = 'absolute';
        aux.style.left = '-100px';
        aux.style.top = '0px';
        aux.style.display = 'block';
        aux.style.width = '1px';
        aux.style.height = '1px';
        aux.setAttribute('value', props.gameId);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand('copy');
        document.body.removeChild(aux);
    };
    // use redux state to style buttons for active or not
    return (
        <section className='game-controls'>
            <div className='game-controls__btns-container'>
                <Button title={'New Game'} function={() => props.newGameReq()} />
                <Button title={'Join Code'} function={() => copyJoinCode()} />
                <Button title={'End Turn'} function={() => props.endTurnReq()} />
            </div>

            <div className='game-controls__teams'>
                <h3>Teams</h3>
                <div className='game-controls__teams__options'>
                    <Button
                        title={'Randomize'}
                        opClasses={'game-controls__teams__options__randomize'}
                        function={() => console.log('RANDOM TEAMS')}
                    />
                    <div className='game-controls__teams__options__red-team'>
                        <Button
                            title={'Red'}
                            opClasses={'btn__red' + (props.team === 'red' ? ' active' : '')}
                            function={() => props.setTeam('red')}
                        />
                        <p>PLAYER1</p>
                    </div>
                    <div className='game-controls__teams__options__blue-team'>
                        <Button
                            title={'Blue'}
                            opClasses={'btn__blue' + (props.team === 'blue' ? ' active' : '')}
                            function={() => props.setTeam('blue')}
                        />
                        <p>PLAYER2</p>
                    </div>
                </div>
            </div>

            <div className='game-controls__roles'>
                <h3>Roles</h3>
                <div className='game-controls__roles__options'>
                    <Button
                        title={'Insider'}
                        opClasses={
                            'btn__insider' +
                            (props.team === 'blue' ? ' btn__blue' : '') +
                            (props.team === 'red' ? ' btn__red' : '') +
                            (props.role === 'insider' ? ' active' : '')
                        }
                        opElem={<i className='far fa-comment-dots'></i>}
                        function={() => props.setRole('insider')}
                    />
                    <Button
                        title={'Agent'}
                        opClasses={
                            'btn__agent' +
                            (props.team === 'blue' ? ' btn__blue' : '') +
                            (props.team === 'red' ? ' btn__red' : '') +
                            (props.role === 'agent' ? ' active' : '')
                        }
                        opElem={<i className='fas fa-search'></i>}
                        function={() => props.setRole('agent')}
                    />
                </div>
            </div>

            <div className='game-controls__bundles'>
                <h3>Word Bundles</h3>
                <div className='game-controls__bundles__options'>
                    <div className='game-controls__bundles__options__col'>
                        {temp.map((bundle) => {
                            return (
                                <button
                                    key={bundle}
                                    id={bundle}
                                    role='checkbox'
                                    aria-checked={selectedWordBundle === bundle ? 'true' : 'false'}
                                    className='create-game__option__selection__brick'
                                >
                                    {bundle}
                                </button>
                            );
                        })}
                    </div>
                    <div className='game-controls__bundles__options__col'>
                        {temp.map((bundle) => {
                            return (
                                <button
                                    key={bundle}
                                    id={bundle}
                                    role='checkbox'
                                    aria-checked={selectedWordBundle === bundle ? 'true' : 'false'}
                                    className='create-game__option__selection__brick'
                                >
                                    {bundle}
                                </button>
                            );
                        })}
                    </div>
                    <div className='game-controls__bundles__options__custom'>
                        <div className='game-controls__bundles__options__custom__info'>
                            <h3>OR</h3>
                            <h3>Enter Custom Words...</h3>
                            <p>
                                Enter 25 words by typing one word at a time in the box below and then pressing your
                                enter key.
                            </p>
                            <input id='text-input' />
                            <p>placeholder / 25</p>
                        </div>
                        <div className='game-controls__bundles__options__custom__bricks'>
                            {/* {props.customWords.map((word) => {
                                return (
                                    <button
                                        key={word}
                                        onClick={() => {
                                            props.deleteCustomWord(word);
                                        }}
                                    >
                                        <p>{word}</p>
                                    </button>
                                );
                            })} */}
                            <button
                            // key={word}
                            // onClick={() => {
                            //     props.deleteCustomWord(word);
                            // }}
                            >
                                <p>word</p>
                            </button>
                        </div>
                    </div>
                    <button className='game-controls__bundles__options__submit-btn'>Submit</button>
                </div>
            </div>
        </section>
    );
};

GameControls.propTypes = {
    gameId: PropTypes.string.isRequired,
    newGameReq: PropTypes.func.isRequired,
    setTeam: PropTypes.func.isRequired,
    setRole: PropTypes.func.isRequired,
    endTurnReq: PropTypes.func.isRequired,
    team: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
};

GameControls.defaultProps = {
    gameId: 'ERR',
    newGameReq: () => {
        console.log('[NEW GAME REQ] error requesting new game');
    },
    setTeam: () => {
        console.log('[SET TEAM BTN] error setting team');
    },
    setRole: () => {
        console.log('[SET ROLE BTN] error setting role');
    },
    endTurnReq: () => {
        console.log('[END TURN REQ] error requesting to end turn');
    },
    team: 'undefined',
    role: 'undefined',
};

export default GameControls;
