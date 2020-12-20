import React from 'react';

const useError = () => {
    const checkInput = async (inputState, inputVal, inputName, inputCallback) => {
        const inputErrors = [];
        const pattern = new RegExp('[^A-Za-z0-9]');

        if (inputVal.search(pattern) > -1) {
            inputErrors.push('Your ' + inputName + ' cannot contain any special characters or spaces');
        }
        if (inputVal.length < 4 || inputVal.length > 12) {
            inputErrors.push('Your ' + inputName + ' must be between 4 and 12 characters in length');
        }

        if (inputErrors.length > 0) {
            await inputCallback(generateError(inputErrors, null, inputCallback));
            return false;
        } else if (inputState !== null) {
            inputCallback(null);
            return true;
        } else {
            return true;
        }
    };

    const checkJoinLink = async (inputState, inputVal, inputCallback) => {
        const inputErrors = [];
        const pattern = new RegExp('[^A-Za-z0-9-]');

        if (inputVal.search(pattern) > -1) {
            // Tell them the format
            inputErrors.push('Join link must contain two hyphens');
        }
        if (inputVal.length !== 20) {
            // Make it tell them too short or long for more clarity
            inputErrors.push('Your join link must be 20 characters in length');
        }

        if (inputErrors.length > 0) {
            await inputCallback(generateError(inputErrors, null, inputCallback));
            return false;
        } else if (inputState !== null) {
            inputCallback(null);
            return true;
        } else {
            return true;
        }
    };

    const generateError = (err, optClasses, callback) => {
        return (
            <div
                className={'err-msg ' + optClasses}
                onClick={() => {
                    callback(null);
                }}
            >
                {err.map((error, i) => {
                    return <p key={i}>ERROR: {error}</p>;
                })}
                <p>DISMISS &#10006;</p>
            </div>
        );
    };

    return { checkInput, checkJoinLink, generateError };
};

export default useError;
