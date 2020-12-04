import * as actionTypes from './actionTypes';
import firebase from 'firebase';
import firebaseConfig from '../../config/firebase';
// Required for side-effects
import 'firebase/firestore';
import 'firebase/functions';

firebase.initializeApp({
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
});
const fbFunctions = firebase.functions();

// const db = firebase.firestore();

export const toggleTurnTimer = () => {
    return { type: actionTypes.TOGGLE_TURN_TIMER };
};

export const toggleQuickGame = () => {
    return { type: actionTypes.TOGGLE_QUICK_GAME };
};

export const selectWordGroup = (id) => {
    return { type: actionTypes.SELECT_WORD_GROUP, payload: { selectedWordGroup: id } };
};

export const addCustomWord = (word) => {
    return { type: actionTypes.ADD_CUSTOM_WORD, payload: { word: word } };
};

export const deleteCustomWord = (word) => {
    return { type: actionTypes.DELETE_CUSTOM_WORD, payload: { word: word } };
};

export const submitAction = (data) => {
    return { type: actionTypes.SET_GAME_SETTINGS, payload: { gameData: data } };
};

export const submit = () => async (dispatch, getState) => {
    // const cgmData = getState().cgm;

    // const docRef = db.collection('test').doc('gameState');

    // await docRef.set(cgmData);
    // dispatch(submitAction(cgmData));
    // dispatch(resetState());

    // db.collection('test')
    //     .add(cgmData)
    //     .then(function (docRef) {
    //         console.log('Document written with ID: ', docRef.id);
    //         dispatch(submitAction(cgmData));
    //         dispatch(resetState());
    //     })
    //     .catch(function (error) {
    //         console.error('Error adding document: ', error);
    //     });

    const addMessage = fbFunctions.httpsCallable('createNewGame');
    addMessage({ text: messageText })
        .then((result) => {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data.text;
        })
        .catch((error) => {
            // Getting the Error details.
            var code = error.code;
            var message = error.message;
            var details = error.details;
            // ...
        });
    callable.js;
};

export const resetState = () => {
    return { type: actionTypes.RESET_STATE };
};
