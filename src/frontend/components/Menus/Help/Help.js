import React, { useMemo } from 'react';
// import PropTypes from 'prop-types';

import Chevron from '../../UI/Indicators/Chevron/Chevron';

import './Help.scss';

const Help = () => {
    const toggleTab = (evt) => {
        const elem = evt.target.parentElement;
        const isCollapsed = elem.getAttribute('data-collapsed') === 'false';

        if (isCollapsed) {
            collapseTab(elem);
        } else {
            expandTab(elem);
        }
    };

    const collapseTab = (elem) => {
        const content = elem.childNodes[1];
        content.style.height = 0 + 'px';

        elem.setAttribute('data-collapsed', 'true');
    };

    const expandTab = (elem) => {
        const content = elem.childNodes[1];
        const contentHeight = content.scrollHeight;
        content.style.height = contentHeight + 'px';

        elem.setAttribute('data-collapsed', 'false');
    };

    return useMemo(() => {
        return (
            <section className='help'>
                <div className='help__menu'>
                    <div className='help__tab' data-collapsed='true'>
                        <div id='deduction-info' className='help__tab__title' onClick={(evt) => toggleTab(evt)}>
                            <h1>Deduction</h1>
                            <Chevron />
                        </div>
                        <div className='help__tab__content'>
                            <p>
                                Deduction is a game where players are split into two teams, red and blue, and face off
                                against each other in an attempt to get their teams score down to 0 first!
                            </p>
                        </div>
                    </div>
                    <div className='help__tab' data-collapsed='true'>
                        <div id='deduction-basics' className='help__tab__title' onClick={(evt) => toggleTab(evt)}>
                            <h1>Basics</h1>
                            <Chevron />
                        </div>
                        <div className='help__tab__content'>
                            <ul>
                                <li>Deduction requires at least 4 players to be played properly.</li>
                                <li>
                                    Each team must have at least 1 player be an &apos;insider&apos; and the remaining
                                    players be &apos;agents&apos;.
                                </li>
                                <li>
                                    Each randomly-generated standard gameboard has 25 words:
                                    <ul>
                                        <li>9 red</li>
                                        <li>8 blue</li>
                                        <li>7 neutral</li>
                                        <li>1 orange</li>
                                    </ul>
                                </li>
                                <li>To win the game a team must get their score down to 0 before the opposing team.</li>
                            </ul>
                        </div>
                    </div>
                    <div className='help__tab' data-collapsed='true'>
                        <div id='deduction-roles' className='help__tab__title' onClick={(evt) => toggleTab(evt)}>
                            <h1>Roles</h1>
                            <Chevron />
                        </div>
                        <div className='help__tab__content'>
                            <p>
                                In Deduction, players can either be an &apos;insider&apos; or an &apos;agent&apos;.
                                Please note that each team must have at least 1 &apos;insider&apos; and at least 1
                                &apos;agent&apos;.
                            </p>
                            <p>
                                The job of an &apos;insider&apos; is to each turn give a single one-worded clue
                                accompanied by a number to their team&apos;s agents. Nothing else. For example
                                &quot;food 3&quot;. The number indicates how many words that teams agents are allowed to
                                guess that turn and the one-worded clue is to help the agents figure out which words on
                                the board they need to guess.
                            </p>
                            <p>
                                The job of an &apos;agent&apos; is to listen to the information their teams
                                &apos;insider&apos; gives them and then try to &apos;deduce&apos; (figure out) which
                                words they need to guess so that they can reduce their teams score.
                            </p>
                            <p>
                                For example, it is red teams turn. The red teams &apos;insider&apos; says &quot;food
                                3&quot;. This means that red teams agents must make 3 guesses for that turn and try to
                                guess words related to food.
                            </p>
                            <p>
                                &apos;Insiders&apos; cannot give &apos;agents&apos; one-worded clues that contain part
                                of or a full word to be gussed. For example &quot;stone 2&quot; would be cheating if one
                                of the words to be guessed was &quot;stone&quot; or contained &quot;stone&quot;, like
                                &quot;stonecutter&quot;.
                            </p>
                        </div>
                    </div>
                    <div className='help__tab' data-collapsed='true'>
                        <div id='deduction-scoring' className='help__tab__title' onClick={(evt) => toggleTab(evt)}>
                            <h1>Scoring</h1>
                            <Chevron />
                        </div>
                        <div className='help__tab__content'>
                            <ul>
                                <li>
                                    If an &apos;agent&apos; guesses a word that belongs to their team, it will reduce
                                    their teams&apos; score by 1.
                                </li>
                                <li>
                                    If an &apos;agent&apos; guesses a word that belongs to the opposing team, their
                                    teams&apos; turn ends immediately and the opposing team&apos;s score will be reduced
                                    by 1.
                                </li>
                                <li>
                                    If an &apos;agent&apos; guesses a neutral word, then their teams&apos; turn ends
                                    immediately and the scores remain unchanged.
                                </li>
                                <li>
                                    If an &apos;agent&apos; is unfortunate enough to guess the bomb word, then the
                                    opposing team wins the game.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    });
};

// Help.propTypes = {};

export default Help;
