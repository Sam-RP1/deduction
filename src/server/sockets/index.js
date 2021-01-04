const { SUCCESS } = require('../statusTypes');
const dbGame = require('../db/game/game.js');
const dbPlayer = require('../db/game/player.js');
const dbRoles = require('../db/game/roles.js');
const dbTeams = require('../db/game/teams.js');
const dbWords = require('../db/game/words.js');
const sockets = {};

sockets.init = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        // Game
        socket.on('new_game', async (data) => {
            const gameId = data.gameId;

            const result = await dbGame.newGame(gameId);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('update_game', {
                    data: result.data,
                });
            } else {
                socket.emit('error', {
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Join game
        socket.on('join_game', async (data) => {
            const gameId = data.gameId;
            const playerName = data.playerName;

            const result = await dbPlayer.addPlayer(gameId, socket.id, playerName);

            if (result.status === SUCCESS) {
                socket.join(gameId);
                io.in(gameId).emit('update_teams', {
                    players: result.players,
                });
            } else {
                socket.to(gameId).emit('error', {
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Leave game
        socket.on('leave_game', async (data) => {
            const gameId = data.gameId;

            const result = await dbPlayer.removePlayer(gameId, socket.id);

            if (result.status === SUCCESS) {
                socket.leave(gameId);
                socket.to(gameId).emit('update_teams', {
                    players: result.players,
                });
            } else {
                socket.to(gameId).emit('error', {
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Select a team
        socket.on('select_team', async (data) => {
            const gameId = data.gameId;
            const selectedTeam = data.selectedTeam;

            const result = await dbTeams.updateTeams(gameId, socket.id, selectedTeam);

            if (result.status === SUCCESS) {
                socket.emit('update_client_team', {
                    team: selectedTeam,
                });
                io.in(gameId).emit('update_teams', {
                    players: result.players,
                });
            } else {
                socket.emit('error', {
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Randomise teams
        socket.on('randomise_teams', async (data) => {
            const gameId = data.gameId;

            const result = await dbTeams.randomiseTeams(gameId);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('random_teams', {
                    players: result.players,
                });
            } else {
                socket.emit('error', {
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Select a role
        socket.on('select_role', async (data) => {
            const gameId = data.gameId;
            const selectedRole = data.selectedRole;

            const result = await dbRoles.updatePlayerRole(gameId, socket.id, selectedRole);

            if (result.status === SUCCESS) {
                socket.emit('update_client_role', {
                    role: selectedRole,
                });
                io.in(gameId).emit('update_roles', {
                    players: result.players,
                });
            } else {
                socket.emit('error', {
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Select a word bundle
        socket.on('select_word_bundle', async (data) => {
            const gameId = data.gameId;
            const selectedBundle = data.selectedBundle;

            const result = await dbWords.updateWordBundle(gameId, selectedBundle);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('update_word_bundle', {
                    wordBundle: result.wordBundle,
                    words: result.words,
                    score: result.score,
                });
            } else {
                socket.emit('error', {
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Add a custom word
        socket.on('add_custom_word', async (data) => {
            const gameId = data.gameId;
            const word = data.word;

            const result = await dbWords.addCustomWord(gameId, word);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('update_custom_words', {
                    customWords: result.customWords,
                });
            } else {
                socket.emit('error', {
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Remove a custom word
        socket.on('remove_custom_word', async (data) => {
            const gameId = data.gameId;
            const word = data.word;

            const result = await dbWords.removeCustomWord(gameId, word);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('update_custom_words', {
                    customWords: result.customWords,
                });
            } else {
                socket.emit('error', {
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Use custom words
        socket.on('use_custom_words', async (data) => {
            const gameId = data.gameId;

            const result = await dbWords.useCustomWords(gameId);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('update_word_bundle', {
                    bundle: result.bundle,
                    words: result.words,
                    score: result.score,
                });
            } else {
                socket.emit('error', {
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
                    data: result.data,
                });
            } else {
                socket.emit('error', {
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Change turn
        socket.on('end_turn', async (data) => {
            const gameId = data.gameId;

            const result = await dbGame.updateTurn(gameId);

            if (result.status === SUCCESS) {
                io.in(gameId).emit('update_turn', {
                    nextTurn: result.nextTurn,
                });
            } else {
                socket.emit('error', {
                    status: result.status,
                    error: result.error,
                });
            }
        });

        // Client disconnecting
        socket.on('disconnecting', async () => {
            const playerId = socket.id;
            const games = Array.from(socket.rooms);

            games.splice(0, 1);

            for (let i = 0; i < games.length; i++) {
                const gameId = games[i];

                const result = await dbPlayer.removePlayer(gameId, playerId);

                io.in(gameId).emit('update_teams', {
                    players: result.players,
                });
            }
        });

        socket.on('disconnect', () => {});
    });
};

module.exports = sockets;
