import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import * as actionTypes from '../../store/actions';

import PresSetupMenu from '../../components/Menus/SetupMenu/SetupMenu';

const CreateGameMenu = () => {
    // Selectors
    const turnTimer = useSelector((state) => state.createGameMenu.turnTimer);
    const quickGame = useSelector((state) => state.createGameMenu.quickGame);
    const wordGroup = useSelector((state) => state.createGameMenu.wordGroup);
    const customWords = useSelector((state) => state.createGameMenu.customWords, shallowEqual);

    // Actions
    const dispatch = useDispatch();
    const toggleTurnTimer = useCallback(() => dispatch({ type: actionTypes.TOGGLE_TURN_TIMER }), [dispatch]);
    const toggleQuickGame = useCallback(() => dispatch({ type: actionTypes.TOGGLE_QUICK_GAME }), [dispatch]);
    const selectWordGroup = useCallback(
        (id) => dispatch({ type: actionTypes.SELECT_WORD_GROUP, payload: { selectedWordGroup: id } }),
        [dispatch]
    );
    const updateCustomWords = useCallback((words) =>
        dispatch({ type: actionTypes.UPDATE_CUSTOM_WORDS, payload: { words: words } })
    );
    const resetState = useCallback(() => dispatch({ type: actionTypes.RESET_STATE }), [dispatch]);

    // Vars
    const history = useHistory();
    const wordGroups = [
        { id: 'eng-standard', title: 'english' },
        { id: 'tbd', title: 'tbd' },
    ];

    // Functions
    const wordGroupHandler = (id) => {
        if (id !== wordGroup && wordGroup !== null) {
            const prevSelected = document.getElementById(wordGroup);
            const curSelected = document.getElementById(id);
            prevSelected.setAttribute('aria-checked', 'false');
            curSelected.setAttribute('aria-checked', 'true');
            selectWordGroup(id);
        } else if (wordGroup === null) {
            const curSelected = document.getElementById(id);
            curSelected.setAttribute('aria-checked', 'true');
            selectWordGroup(id);
        }
    };

    const customWordsHandler = (evt) => {
        const enteredWords = evt.target.value.split(',');
        if (customWords.length === 0 && enteredWords.length === 25) {
            updateCustomWords(enteredWords);
        } else if (customWords.length !== 0 && enteredWords.length !== 25) {
            updateCustomWords([]);
        }
    };

    const submitHandler = () => {
        console.log('SUBMITTED');
        history.push('/game');
        const gameSettings = {
            turnTimer: turnTimer,
            quickGame: quickGame,
            wordGroup: wordGroup,
            customWords: customWords,
        };
        resetState();
        console.log(gameSettings);
    };

    // Render
    return (
        <PresSetupMenu
            toggleTurnTimer={toggleTurnTimer}
            toggleQuickGame={toggleQuickGame}
            wordGroups={wordGroups}
            wordGroupHandler={wordGroupHandler}
            customWordsHandler={customWordsHandler}
            numCustomWords={customWords.length}
            submitHandler={submitHandler}
        />
    );
};

export default CreateGameMenu;
