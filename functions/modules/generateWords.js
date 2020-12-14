const _ = require('underscore');
const wordGroups = require('../assets/wordGroups/wordGroups.js');

module.exports.generateWords = (wordGroup, customWords) => {
    const wordsArr = [];
    let words;

    // Get 25 words (Randomly from wordGroup or use customWords passed)
    if (customWords.length !== 25) {
        if (wordGroup === 'eng-standard') {
            words = _.sample(wordGroups.engStandard, 25);
        } else {
            words = _.sample(wordGroups.engStandard, 25);
        }
    } else {
        words = customWords;
    }

    // Allocate words between red, blue, blank and bomb
    const redWords = _.sample(words, 9);
    const noRedWords = words.filter((word) => !redWords.includes(word));
    const blueWords = _.sample(noRedWords, 8);
    const noBlueRedWords = noRedWords.filter((word) => !blueWords.includes(word));
    const blankWords = _.sample(noBlueRedWords, 7);
    const bombWord = noBlueRedWords.filter((word) => !blankWords.includes(word));

    // Push each denomination of words into an array
    for (let i = 0; i < 9; i++) {
        wordsArr.push({ denomination: 'red', word: redWords[i] });
    }
    for (let i = 0; i < 8; i++) {
        wordsArr.push({ denomination: 'blue', word: blueWords[i] });
    }
    for (let i = 0; i < 7; i++) {
        wordsArr.push({ denomination: 'blank', word: blankWords[i] });
    }
    wordsArr.push({ denomination: 'bomb', word: bombWord[0] });

    // Shuffle word array
    const shuffledWords = _.shuffle(wordsArr);

    // Assign words index numbers (0-24)
    for (let i = 0; i < shuffledWords.length; i++) {
        shuffledWords[i].index = i;
    }

    return shuffledWords;
};
