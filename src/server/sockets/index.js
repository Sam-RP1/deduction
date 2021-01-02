const { result } = require('underscore');
const { SUCCESS } = require('../config/statusTypes');
const dbGame = require('../db/db-game/db-game');
const sockets = {};

sockets.init = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('Client connected', socket.id);

        // Game
        socket.on('new_game', async (data) => {
            const gameId = data.gameId;

            const result = await dbGame.newGame(gameId);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('update_game', {
                    msg: '[SVR] New game generated',
                    data: result.data,
                });
            } else {
                socket.emit('error', {
                    msg: '[SVR] Error generating new game',
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Join game
        socket.on('join_game', async (data) => {
            const gameId = data.gameId;
            const playerName = data.playerName;

            const result = await dbGame.addPlayer(gameId, socket.id, playerName);

            if (result.status === SUCCESS) {
                socket.join(gameId);
                io.in(gameId).emit('update_teams', {
                    msg: '[SVR] A new player has joined the game: ' + playerName,
                    players: result.players,
                });
            } else {
                socket.emit('error', {
                    msg: '[SVR] Error joining the game',
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Leave game
        socket.on('leave_game', async (data) => {
            const gameId = data.gameId;

            const result = await dbGame.removePlayer(gameId, socket.id);

            if (result.status === SUCCESS) {
                socket.leave(gameId);
                socket.to(gameId).emit('update_teams', {
                    msg: '[SVR] A player has left the game',
                    players: result.players,
                });
            } else {
                socket.emit('error', {
                    msg: '[SVR] Error leaving the game',
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Select a team
        socket.on('select_team', async (data) => {
            const gameId = data.gameId;
            const selectedTeam = data.selectedTeam;

            const result = await dbGame.updateTeams(gameId, socket.id, selectedTeam);

            if (result.status === SUCCESS) {
                socket.to(gameId).emit('update_teams', {
                    msg: '[SVR] A player has selected a team: ' + selectedTeam,
                    players: result.players,
                });
                socket.emit('update_client_team', {
                    msg: '[SVR] You have joined a team: ' + selectedTeam,
                    players: result.players,
                    team: selectedTeam,
                });
            } else {
                socket.emit('error', {
                    msg: '[SVR] Error changing team',
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Randomise teams
        socket.on('randomise_teams', async (data) => {
            const gameId = data.gameId;

            const result = await dbGame.randomiseTeams(gameId);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('random_teams', {
                    msg: '[SVR] Teams have been randomised',
                    players: result.players,
                });
            } else {
                socket.emit('error', {
                    msg: '[SVR] Error randomising teams',
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Select a role
        socket.on('select_role', async (data) => {
            const gameId = data.gameId;
            const selectedRole = data.selectedRole;

            const result = await dbGame.updatePlayerRole(gameId, socket.id, selectedRole);

            if (result.status === SUCCESS) {
                socket.to(data.gameId).emit('update_roles', {
                    msg: '[SVR] A player has selected a role: ' + selectedRole,
                    players: result.players,
                });
                socket.emit('update_client_role', {
                    msg: '[SVR] You have selected a role: ' + selectedRole,
                    players: result.players,
                    role: selectedRole,
                });
            } else {
                socket.emit('error', {
                    msg: '[SVR] Error changing role',
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Select a word bundle
        socket.on('select_word_bundle', async (data) => {
            const gameId = data.gameId;
            const selectedBundle = data.selectedBundle;

            const result = await dbGame.updateWordBundle(gameId, selectedBundle);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('update_word_bundle', {
                    msg: '[SVR] New word bundle selected',
                    wordBundle: result.wordBundle,
                    words: result.words,
                });
            } else {
                socket.emit('error', {
                    msg: '[SVR] Error selecting word bundle',
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Change turn
        socket.on('end_turn', async (data) => {
            const gameId = data.gameId;
            const playerTeam = data.playerTeam;
            const currentTurn = data.currentTurn;

            const result = await dbGame.updateTurn(gameId, playerTeam, currentTurn);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('update_turn', {
                    msg: '[SVR] Turn ended',
                    nextTurn: result.nextTurn,
                });
            } else {
                socket.emit('error', {
                    msg: '[SVR] Error ending turn',
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Add a custom word
        socket.on('add_custom_word', async (data) => {
            const gameId = data.gameId;
            const word = data.word;

            const result = await dbGame.addCustomWord(gameId, word);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('update_custom_words', {
                    msg: '[SVR] Added a new custom word',
                    customWords: result.customWords,
                });
            } else {
                socket.emit('error', {
                    msg: '[SVR] Error adding custom word',
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Remove a custom word
        socket.on('remove_custom_word', async (data) => {
            const gameId = data.gameId;
            const word = data.word;

            const result = await dbGame.removeCustomWord(gameId, word);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('update_custom_words', {
                    msg: '[SVR] Removed a custom word',
                    customWords: result.customWords,
                });
            } else {
                socket.emit('error', {
                    msg: '[SVR] Error removing a custom word',
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Use custom words
        socket.on('use_custom_words', async (data) => {
            const gameId = data.gameId;

            const result = await dbGame.useCustomWords(gameId);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('update_word_bundle', {
                    msg: '[SVR] Word bundle reset using custom words',
                    bundle: result.bundle,
                    words: result.words,
                });
            } else {
                socket.emit('error', {
                    msg: '[SVR] Error using custom words',
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Game logic
        socket.on('guess', async (data) => {
            const gameId = data.gameId;
            const word = data.word;
            const playerTeam = data.playerTeam;
            const playerRole = data.playerRole;
            const isGuessed = data.word.guessData.isGuessed;

            const result = await dbGame.updateGuess(gameId, word, playerTeam, playerRole, isGuessed);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('guess_made', {
                    msg: '[SVR] A guess has been made',
                    data: result.data,
                });
            } else {
                socket.emit('error', {
                    msg: '[SVR] Error guessing word',
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Still needs completing
        socket.on('disconnect', () => {
            // create a clean up function so that if someone leaves via browser close they are removed from any game rooms they were in and their db precense is wiped and then those games are updated accordingly
            console.log('Client disconnected', socket.id);
        });
    });
};

module.exports = sockets;
