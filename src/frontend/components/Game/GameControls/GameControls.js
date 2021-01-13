import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

// Imports
import Button from '../../UI/Buttons/Button/Button';

// Styles
import './GameControls.scss';

// Presentational Component
const GameControls = (props) => {
    const copyJoinCode = async () => {
        await copy(props.joinCode);
    };

    return useMemo(() => {
        return (
            <section className='game-controls'>
                <div className='game-controls__btns-container'>
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
                                opClasses={'btn__red' + (props.playerTeam === 'red' ? ' active' : '')}
                                function={() => props.selectTeam('red', props.playerTeam)}
                            />
                            {props.redTeam.map((player, i) => {
                                return <p key={i}>{player.playerName}</p>;
                            })}
                        </div>
                        <div className='game-controls__teams__options__blue-team'>
                            <Button
                                title={'Blue'}
                                opClasses={'btn__blue' + (props.playerTeam === 'blue' ? ' active' : '')}
                                function={() => props.selectTeam('blue', props.playerTeam)}
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
                                (props.playerTeam === 'blue' ? ' btn__blue' : '') +
                                (props.playerTeam === 'red' ? ' btn__red' : '') +
                                (props.playerRole === 'insider' ? ' active' : '')
                            }
                            opElem={<i className='far fa-comment-dots'></i>}
                            function={() => props.selectRole('insider', props.playerRole)}
                        />
                        <Button
                            title={'Agent'}
                            opClasses={
                                'btn__agent' +
                                (props.playerTeam === 'blue' ? ' btn__blue' : '') +
                                (props.playerTeam === 'red' ? ' btn__red' : '') +
                                (props.playerRole === 'agent' ? ' active' : '')
                            }
                            opElem={<i className='fas fa-search'></i>}
                            function={() => props.selectRole('agent', props.playerRole)}
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
                                    To play using custom words you must enter 25 unique words one at a time by typing
                                    each one in the box below and then pressing your enter key to submit it. Once there
                                    is 25 words entered the &apos;play custom&apos; button will be active.
                                </p>
                                <input
                                    id='text-input'
                                    onKeyPress={(evt) => {
                                        if (evt.key === 'Enter') {
                                            props.addCustomWordHandler(evt);
                                        }
                                    }}
                                    maxLength={40}
                                />
                                <p>{props.customWords.length} / 25</p>
                                {props.customWordError}
                            </div>
                            <div className='game-controls__bundles__options__custom__bricks'>
                                {props.customWords.map((word) => {
                                    return (
                                        <button
                                            key={word}
                                            onClick={() => {
                                                props.removeCustomWord(word);
                                            }}
                                        >
                                            <p>{word}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <button
                            onClick={() => props.useCustomWords(props.customWords)}
                            className={
                                'game-controls__bundles__options__submit-btn' +
                                (props.customWords.length !== 25 ? ' disable' : '')
                            }
                        >
                            Play Custom
                        </button>
                    </div>
                </div>
            </section>
        );
    }, [props]);
};

GameControls.propTypes = {
    newGame: PropTypes.func,
    joinCode: PropTypes.string,
    endTurn: PropTypes.func,
    turn: PropTypes.string,
    // Teams & Roles
    blueTeam: PropTypes.array,
    redTeam: PropTypes.array,
    unassigned: PropTypes.array,
    randomiseTeams: PropTypes.func,
    selectTeam: PropTypes.func,
    selectRole: PropTypes.func,
    playerTeam: PropTypes.string,
    playerRole: PropTypes.string,
    // Words
    wordBundles: PropTypes.array,
    wordBundle: PropTypes.string,
    selectWordBundle: PropTypes.func,
    customWords: PropTypes.array,
    addCustomWordHandler: PropTypes.func,
    removeCustomWord: PropTypes.func,
    useCustomWords: PropTypes.func,
    customWordError: PropTypes.object,
};

GameControls.defaultProps = {};

export default GameControls;
