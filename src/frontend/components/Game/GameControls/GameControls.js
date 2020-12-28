import React from 'react';
import PropTypes from 'prop-types';

// Imports
import Button from '../../UI/Buttons/Button/Button';

// Styles
import './GameControls.scss';

// Presentational Component
const GameControls = (props) => {
    const copyJoinCode = async () => {
        await navigator.clipboard.writeText(props.joinCode);
    };

    return (
        <section className='game-controls'>
            <div className='game-controls__btns-container'>
                <Button title={'New Game'} function={() => props.newGame()} />
                <Button title={'Join Code'} function={() => copyJoinCode()} />
                <Button title={'End Turn'} function={() => props.endTurnReq(props.team, props.teamTurn)} />
            </div>

            <div className='game-controls__teams'>
                <h3>Teams</h3>
                <div className='game-controls__teams__options'>
                    <Button
                        title={'Randomize'}
                        opClasses={'game-controls__teams__options__randomize'}
                        function={() => props.randomiseTeams()}
                    />
                    <div className='game-controls__teams__options__red-team'>
                        <Button
                            title={'Red'}
                            opClasses={'btn__red' + (props.team === 'red' ? ' active' : '')}
                            function={() => props.setTeam('red', props.team)}
                        />
                        {props.redTeam.map((player, i) => {
                            return <p key={i}>{player.playerName}</p>;
                        })}
                    </div>
                    <div className='game-controls__teams__options__blue-team'>
                        <Button
                            title={'Blue'}
                            opClasses={'btn__blue' + (props.team === 'blue' ? ' active' : '')}
                            function={() => props.setTeam('blue', props.team)}
                        />
                        {props.blueTeam.map((player, i) => {
                            return <p key={i}>{player.playerName}</p>;
                        })}
                    </div>
                    <p className='game-controls__teams__options__teamless'>
                        TEAMLESS:
                        {props.unassigned.map((player) => {
                            return ' ' + player.playerName;
                        })}
                    </p>
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
                        {props.wordBundles.map((bundle, i) => {
                            if (i % 2 === 0) {
                                return (
                                    <button
                                        key={bundle}
                                        id={bundle}
                                        role='checkbox'
                                        aria-checked={props.wordBundle === bundle ? 'true' : 'false'}
                                        className='create-game__option__selection__brick'
                                        onClick={() => props.selectWordBundle(bundle, props.wordBundle)}
                                    >
                                        {bundle}
                                    </button>
                                );
                            }
                        })}
                    </div>
                    <div className='game-controls__bundles__options__col'>
                        {props.wordBundles.map((bundle, i) => {
                            if (i % 2 === 1) {
                                return (
                                    <button
                                        key={bundle}
                                        id={bundle}
                                        role='checkbox'
                                        aria-checked={props.wordBundle === bundle ? 'true' : 'false'}
                                        className='create-game__option__selection__brick'
                                        onClick={() => props.selectWordBundle(bundle, props.wordBundle)}
                                    >
                                        {bundle}
                                    </button>
                                );
                            }
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
    joinCode: PropTypes.string,
    newGame: PropTypes.func,
    setTeam: PropTypes.func,
    randomiseTeams: PropTypes.func,
    setRole: PropTypes.func,
    endTurnReq: PropTypes.func,
    team: PropTypes.string,
    teamTurn: PropTypes.string,
    role: PropTypes.string,
    blueTeam: PropTypes.array,
    redTeam: PropTypes.array,
    unassigned: PropTypes.array,
    selectWordBundle: PropTypes.func,
    wordBundles: PropTypes.array,
    wordBundle: PropTypes.string,
};

GameControls.defaultProps = {
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
    teamTurn: 'undefined',
    role: 'undefined',
};

export default GameControls;
