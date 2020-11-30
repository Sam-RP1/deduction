import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// Redux Action Types
import * as actionTypes from '../../store/actions';

// Presentational Components
import CreateGameCmpnt from '../../components/Menus/CreateGameMenu/CreateGameMenu';

// Container Component
const CreateGameMenu = () => {
    // Redux Selectors
    const turnTimer = useSelector((state) => state.createGameMenu.turnTimer);
    const quickGame = useSelector((state) => state.createGameMenu.quickGame);
    const wordGroup = useSelector((state) => state.createGameMenu.wordGroup);
    const customWords = useSelector((state) => state.createGameMenu.customWords, shallowEqual);

    // Redux Actions
    const dispatch = useDispatch();
    const toggleTurnTimer = useCallback(() => dispatch({ type: actionTypes.TOGGLE_TURN_TIMER }), [dispatch]);
    const toggleQuickGame = useCallback(() => dispatch({ type: actionTypes.TOGGLE_QUICK_GAME }), [dispatch]);
    const selectWordGroup = useCallback(
        (id) => dispatch({ type: actionTypes.SELECT_WORD_GROUP, payload: { selectedWordGroup: id } }),
        [dispatch]
    );
    const addCustomWord = useCallback(
        (word) => dispatch({ type: actionTypes.ADD_CUSTOM_WORD, payload: { word: word } }),
        [dispatch]
    );
    const deleteCustomWord = useCallback(
        (word) => dispatch({ type: actionTypes.DELETE_CUSTOM_WORD, payload: { word: word } }),
        [dispatch]
    );
    const resetState = useCallback(() => dispatch({ type: actionTypes.RESET_STATE }), [dispatch]);

    // State
    const [customWordsErrMsg, setCustomWordsErrMsg] = useState(null);
    const [submitErrMsg, setSubmitErrMsg] = useState(null);

    // Vars
    const history = useHistory();
    const wordGroups = [{ id: 'eng-standard', title: 'english' }];

    // Functions
    const wordGroupHandler = (id) => {
        const prevSelected = document.getElementById(wordGroup);
        const curSelected = document.getElementById(id);
        if (id !== wordGroup && wordGroup !== null) {
            prevSelected.setAttribute('aria-checked', 'false');
            curSelected.setAttribute('aria-checked', 'true');
            selectWordGroup(id);
        } else if (wordGroup === null) {
            curSelected.setAttribute('aria-checked', 'true');
            selectWordGroup(id);
        } else if (id === wordGroup) {
            curSelected.setAttribute('aria-checked', 'false');
            selectWordGroup(null);
        }
    };

    const addCustomWordHandler = (evt) => {
        const enteredString = evt.target.value;
        const exists = customWords.indexOf(enteredString);

        if (enteredString.length > 1 && customWords.length < 25 && exists === -1) {
            addCustomWord(enteredString);
            document.querySelector('#text-input').value = '';
        } else {
            let errString;
            let optClass = 'err-msg--inherit';
            if (enteredString.length < 1) {
                errString = 'Entered word is too short! Needs to be two characters or more';
            } else if (customWords.length === 25) {
                errString = 'You have entered 25 words! To delete entered words you can click them below';
            } else if (exists > -1) {
                errString = 'No duplicates allowed here! You have already entered this word';
            }
            setCustomWordsErrMsg(errGenerator(errString, optClass, setCustomWordsErrMsg));
        }
    };

    const deleteCustomWordHandler = (word) => {
        if (customWords.indexOf(word) > -1) {
            deleteCustomWord(word);
        }
    };

    const submitHandler = () => {
        if ((wordGroup !== null && customWords.length === 0) || (wordGroup === null && customWords.length === 25)) {
            console.log('SUBMITTED');
            history.push('/game');
            const gameSettings = {
                turnTimer: turnTimer,
                quickGame: quickGame,
                wordGroup: wordGroup,
                customWords: customWords,
            };
            console.log(gameSettings);
            resetState();
        } else {
            let errString;
            let optClass = 'err-msg--inherit';
            if (wordGroup === null && customWords.length !== 25) {
                errString = 'You need to either select a word group or enter 25 custom words';
            } else if (wordGroup !== null && customWords.length > 0) {
                errString =
                    'You cannot select a word group and have custom words. Please either deselect the selected word group or remove the custom words you have entered';
            }
            setSubmitErrMsg(errGenerator(errString, optClass, setSubmitErrMsg));
        }
    };

    const errGenerator = (errString, optClass, callback) => {
        return (
            <p
                className={'err-msg ' + optClass}
                onClick={() => {
                    callback(null);
                }}
            >
                ERROR: {errString} - CLICK TO DISMISS &#10006;
            </p>
        );
    };

    // Render
    return (
        <CreateGameCmpnt
            toggleTurnTimer={toggleTurnTimer}
            toggleQuickGame={toggleQuickGame}
            wordGroups={wordGroups}
            wordGroupHandler={wordGroupHandler}
            customWords={customWords}
            addCustomWordHandler={addCustomWordHandler}
            deleteCustomWordHandler={deleteCustomWordHandler}
            customWordsErrMsg={customWordsErrMsg}
            submitHandler={submitHandler}
            submitErrMsg={submitErrMsg}
        />
    );
};

export default CreateGameMenu;
