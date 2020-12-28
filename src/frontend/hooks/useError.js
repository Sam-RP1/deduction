import React from 'react';

const useError = () => {
    const checkInput = async (inputState, inputVal, inputName, maxLength, inputCallback) => {
        const inputErrors = [];
        const pattern = new RegExp('[^A-Za-z0-9]');

        if (inputVal.search(pattern) > -1) {
            inputErrors.push('Your ' + inputName + ' cannot contain any special characters or spaces');
        }
        if (inputVal.length < 4 || inputVal.length > maxLength) {
            inputErrors.push('Your ' + inputName + ' must be between 4 and ' + maxLength + ' characters in length');
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
        const linkPattern = new RegExp('[^A-Za-z0-9=,]');
        const gamePattern = new RegExp('[^A-Za-z0-9]');
        let joinLink;
        let gameId;
        let gamePassword;

        const inputValChars = inputVal.split('');
        let numEquals = 0;
        for (const letter in inputValChars) {
            if (inputValChars[letter] === '=') {
                numEquals += 1;
            }
        }

        if (numEquals !== 2 || inputVal.search(',') === -1) {
            inputErrors.push('Your join link is format is invalid');
        } else if (inputVal.search(linkPattern) > -1) {
            inputErrors.push('Join links can only contain letters, numbers, equal signs and commas');
        } else {
            joinLink = inputVal.split(',');
            gameId = joinLink[0].split('=')[1];
            gamePassword = joinLink[1].split('=')[1];

            if (gameId === undefined || gamePassword === undefined) {
                inputErrors.push('Your join links gameId or gamePassword is not defined');
            } else {
                if (inputVal.length > 61) {
                    inputErrors.push('Your join link is too long');
                } else if (inputVal.length < 29) {
                    inputErrors.push('Your join link is too short');
                }

                if (gameId.length > 20 || gameId.length < 4) {
                    inputErrors.push('Your join links gameId must be between 4 and 20 characters in length');
                } else if (gameId.search(gamePattern) > -1) {
                    inputErrors.push('Your join links gameId can only contain letters and numbers');
                }

                if (gamePassword.length > 20 || gamePassword.length < 4) {
                    inputErrors.push('Your join links gamePassword must be between 4 and 20 characters in length');
                } else if (gamePassword.search(gamePattern) > -1) {
                    inputErrors.push('Your join links gamePassword can only contain letters and numbers');
                }
            }
        }

        if (inputErrors.length > 0) {
            await inputCallback(generateError(inputErrors, null, inputCallback));
            return { pass: false };
        } else if (inputState !== null) {
            inputCallback(null);
            return { pass: true, gameId: gameId, gamePassword: gamePassword };
        } else {
            return { pass: true, gameId: gameId, gamePassword: gamePassword };
        }
    };

    const generateError = (err, optClasses, callback) => {
        optClasses = optClasses === null ? '' : optClasses;
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
