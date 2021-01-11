module.exports.parseGameData = async (gameData) => {
    gameData.quick_game = gameData.quick_game === 1 ? true : false;
    gameData.turn_timer = gameData.turn_timer === 1 ? true : false;

    const data = {
        gameId: gameData.game_id,
        gamePassword: gameData.game_password,
        players: JSON.parse(gameData.players),
        score: JSON.parse(gameData.score),
        wordGroup: gameData.word_group,
        customWords: JSON.parse(gameData.custom_words),
        words: JSON.parse(gameData.words),
        turn: gameData.turn,
        quickGame: gameData.quick_game,
        turnTimer: gameData.turn_timer,
        gameTimer: gameData.game_timer,
    };

    return data;
};
