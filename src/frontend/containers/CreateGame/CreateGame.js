import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// Redux Action Types
import * as cgm from '../../store/actions/createGame';

// Presentational Components
import CreateGameCmpnt from '../../components/Menus/CreateGame/CreateGame';

// Container Component
const CreateGame = () => {
    // Redux Selectors
    const turnTimer = useSelector((state) => state.cgm.turnTimer);
    const quickGame = useSelector((state) => state.cgm.quickGame);
    const wordGroup = useSelector((state) => state.cgm.wordGroup);
    const customWords = useSelector((state) => state.cgm.customWords, shallowEqual);

    // Redux Actions
    const dispatch = useDispatch();
    const toggleTurnTimer = useCallback(() => dispatch(cgm.toggleTurnTimer()), [dispatch]);
    const toggleQuickGame = useCallback(() => dispatch(cgm.toggleQuickGame()), [dispatch]);
    const selectWordGroup = useCallback((id) => dispatch(cgm.selectWordGroup(id)), [dispatch]);
    const addCustomWord = useCallback((word) => dispatch(cgm.addCustomWord(word)), [dispatch]);
    const deleteCustomWord = useCallback((word) => dispatch(cgm.deleteCustomWord(word)), [dispatch]);
    const submitSettings = useCallback(() => dispatch(cgm.submit()), [dispatch]);

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
        if (id !== wordGroup && wordGroup !== '') {
            prevSelected.setAttribute('aria-checked', 'false');
            curSelected.setAttribute('aria-checked', 'true');
            selectWordGroup(id);
        } else if (wordGroup === '') {
            curSelected.setAttribute('aria-checked', 'true');
            selectWordGroup(id);
        } else if (id === wordGroup) {
            curSelected.setAttribute('aria-checked', 'false');
            selectWordGroup('');
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

    const submitHandler = () => {
        if ((wordGroup !== '' && customWords.length === 0) || (wordGroup === null && customWords.length === 25)) {
            console.log('SUBMITTED');

            submitSettings();
            history.push('/game');
        } else {
            let errString;
            let optClass = 'err-msg--inherit';
            if (wordGroup === '' && customWords.length !== 25) {
                errString = 'You need to either select a word group or enter 25 custom words';
            } else if (wordGroup !== '' && customWords.length > 0) {
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
            turnTimer={turnTimer}
            toggleTurnTimer={toggleTurnTimer}
            quickGame={quickGame}
            toggleQuickGame={toggleQuickGame}
            selectedWordGroup={wordGroup}
            wordGroups={wordGroups}
            wordGroupHandler={wordGroupHandler}
            customWords={customWords}
            addCustomWordHandler={addCustomWordHandler}
            deleteCustomWord={deleteCustomWord}
            customWordsErrMsg={customWordsErrMsg}
            submitHandler={submitHandler}
            submitErrMsg={submitErrMsg}
        />
    );
};

export default CreateGame;
