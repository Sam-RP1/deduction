const dbGame = require('../db/db-game/db-game');
const sockets = {};

sockets.init = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('Client connected', socket.id);

        // DONE
        // Game
        socket.on('new_game', async (data) => {
            const result = await dbGame.newGame(data.gameId);
            console.log(result);
            io.in(data.gameId).emit('update_game', {
                msg: 'Game updated!',
                data: result.data,
            });
        });
        // Join & Leave
        socket.on('join_game', async (data) => {
            socket.join(data.gameId);
            const result = await dbGame.addPlayer(data.gameId, socket.id, data.playerName);
            io.in(data.gameId).emit('update_teams', {
                players: result.players,
                msg: 'Welcome to the game ' + data.playerName + '! The games ID is ' + data.gameId,
            });
        });
        socket.on('leave_game', async (data) => {
            socket.leave(data.gameId);
            const result = await dbGame.removePlayer(data.gameId, socket.id);
            socket.to(data.gameId).emit('update_teams', {
                players: result.players,
                msg: 'Player has left the game',
            });
        });
        // Teams
        socket.on('select_team', async (data) => {
            const result = await dbGame.updateTeams(data.gameId, socket.id, data.team);
            socket.to(data.gameId).emit('update_teams', {
                players: result.players,
                msg: 'TO ALL PLAYERS! A player has joined ' + data.team + ' team!',
            });
            socket.emit('update_client_team', {
                players: result.players,
                team: data.team,
                msg: 'You have joined ' + data.team + ' team!',
            });
        });
        socket.on('randomise_teams', async (data) => {
            const result = await dbGame.randomiseTeams(data.gameId);
            io.in(data.gameId).emit('random_teams', {
                msg: 'Teams randomised!',
                players: result.players,
            });
        });
        // Roles
        socket.on('select_role', async (data) => {
            const result = await dbGame.updatePlayerRole(data.gameId, socket.id, data.role);
            socket.to(data.gameId).emit('update_roles', {
                players: result.players,
                msg: 'A player changed their role to ' + data.role,
            });
            socket.emit('update_client_role', {
                players: result.players,
                role: data.role,
                msg: 'Chose ' + data.role + ' role!',
            });
        });
        // Turn
        socket.on('end_turn', async (data) => {
            // Add further check to make sure that the current players team == the current turn of the game
            const result = await dbGame.updateTurn(data.gameId);
            io.in(data.gameId).emit('update_turn', {
                msg: 'Ended turn',
                turn: result.turn,
            });
        });
        // Words
        socket.on('select_word_bundle', async (data) => {
            const result = await dbGame.updateWordBundle(data.gameId, data.bundle);
            io.in(data.gameId).emit('update_word_bundle', {
                msg: 'New word bundle selected!',
                bundle: result.bundle,
            });
            io.in(data.gameId).emit('update_words', {
                msg: 'New words!',
                words: result.words,
            });
        });
        socket.on('add_custom_word', async (data) => {
            const result = await dbGame.addCustomWord(data.gameId, data.word);
            console.log('CUSTOM WORDS', result);
            io.in(data.gameId).emit('update_custom_words', {
                msg: 'New custom words!',
                customWords: result.customWords,
            });
        });
        socket.on('remove_custom_word', async (data) => {
            const result = await dbGame.removeCustomWord(data.gameId, data.word);
            console.log('CUSTOM WORDS', result.customWords);
            io.in(data.gameId).emit('update_custom_words', {
                msg: 'New custom words!',
                customWords: result.customWords,
            });
        });
        socket.on('use_custom_words', async (data) => {
            const result = await dbGame.useCustomWords(data.gameId);
            io.in(data.gameId).emit('update_word_bundle', {
                msg: 'Word bundle reset!',
                bundle: result.bundle,
            });
            io.in(data.gameId).emit('update_words', {
                msg: 'New custom words to be used for the game!',
                words: result.words,
            });
        });
        // Game board
        socket.on('guess', async (data) => {
            if (data.playerTeam !== null && data.playerRole === 'agent' && data.word.guessData.isGuessed === false) {
                const result = await dbGame.updateGuess(data.gameId, data.word, data.playerTeam, data.playerRole);
                console.log(result);
                io.in(data.gameId).emit('guess_made', {
                    msg: 'A guess has been made!',
                    data: result.data,
                });
            } else {
                socket.emit('error', {
                    msg: 'You have made an error.',
                });
            }
        });
        //

        socket.on('submit_custom_words', (data) => {});

        socket.on('disconnect', () => {
            // create a clean up function so that if someone leaves via browser close they are removed from any game rooms they were in and their db precense is wiped and then those games are updated accordingly
            console.log('Client disconnected', socket.id);
        });
    });
};

module.exports = sockets;
