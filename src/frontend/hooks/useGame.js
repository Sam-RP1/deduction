import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Redux Action Types
import {
    newGame,
    setTeamsAC,
    setRolesAC,
    setTurnAC,
    setWordBundleAC,
    setWordsAC,
    resetGameAC,
} from '../store/actions/game';
import { setTeamAC, setRoleAC, resetPlayerAC } from '../store/actions/player';

const useGame = (socketRef, gameId) => {
    // Redux Actions
    const dispatch = useDispatch();
    const requestNewGame = useCallback(() => dispatch(newGame()), [dispatch]); //eslint-disable-line
    // Teams
    const setTeams = useCallback((players) => dispatch(setTeamsAC(players)), [dispatch]);
    const setTeam = useCallback((team) => dispatch(setTeamAC(team)), [dispatch]);
    // Roles
    const setRoles = useCallback((role) => dispatch(setRolesAC(role)), [dispatch]);
    const setRole = useCallback((role) => dispatch(setRoleAC(role)), [dispatch]);
    // Turn
    const setTurn = useCallback((turn) => dispatch(setTurnAC(turn)), [dispatch]);
    // Words
    const setWordBundle = useCallback((bundleId) => dispatch(setWordBundleAC(bundleId)), [dispatch]);
    const setWords = useCallback((words) => dispatch(setWordsAC(words)), [dispatch]);
    // Leave
    const resetPlayer = useCallback(() => dispatch(resetPlayerAC()), [dispatch]);
    const resetGame = useCallback(() => dispatch(resetGameAC()), [dispatch]);

    useEffect(() => {
        // New game has been requested
        socketRef.current.on('update_game', (res) => {
            console.log(res.msg);
        });
        // Player(s) have changed team
        socketRef.current.on('update_teams', (res) => {
            console.log(res.msg);
            setTeams(res.players);
        });
        // Player has changed its own team
        socketRef.current.on('update_client_team', (res) => {
            console.log(res.msg);
            setTeam(res.team);
            setTeams(res.players);
        });
        // Teams have been randomised
        socketRef.current.on('random_teams', (res) => {
            console.log(res.msg);
            const playerArr = res.players;
            const playerId = socketRef.current.id;
            let team;
            for (const player in playerArr) {
                if (playerArr[player].playerId === playerId) {
                    team = playerArr[player].team;
                }
            }
            setTeam(team);
            setTeams(res.players);
        });
        // Player(s) have changed role
        socketRef.current.on('update_roles', (res) => {
            console.log(res.msg);
            setRoles(res.players);
        });
        // Player has changed its own role
        socketRef.current.on('update_client_role', (res) => {
            console.log(res.msg);
            setRole(res.role);
            setRoles(res.players);
        });
        // Game turn has changed
        socketRef.current.on('update_turn', (res) => {
            console.log(res.msg);
            setTurn(res.turn);
        });
        // Player(s) have changed word bundle
        socketRef.current.on('update_word_bundle', (res) => {
            console.log(res.msg);
            setWordBundle(res.bundle);
        });
        // Game words have changed
        socketRef.current.on('update_words', (res) => {
            console.log(res.msg);
            setWords(res.words);
        });

        // Clean up and remove all socket listeners
        return () => {
            socketRef.current.removeListener('update_game');
            socketRef.current.removeListener('update_teams');
            socketRef.current.removeListener('update_client_team');
            socketRef.current.removeListener('random_teams');
            socketRef.current.removeListener('update_roles');
            socketRef.current.removeListener('update_client_role');
            socketRef.current.removeListener('update_turn');
            socketRef.current.removeListener('update_word_bundle');
            socketRef.current.removeListener('update_words');
            socketRef.current.emit('leave_game', {
                gameId: gameId,
            });
            resetPlayer();
            resetGame();
        };
    }, []);

    const joinGame = (gameId, playerName) => {
        socketRef.current.emit('join_game', {
            gameId: gameId,
            playerName: playerName,
        });
    };

    const newGame = (gameId) => {
        socketRef.current.emit('new_game', {
            gameId: gameId,
        });
    };

    const selectTeam = (team, currentTeam) => {
        console.log('TO BE TEAM: ', team);
        console.log('CURRENT TEAM: ', currentTeam);
        if (team !== currentTeam) {
            socketRef.current.emit('select_team', {
                gameId: gameId,
                team: team,
            });
        }
    };

    const randomiseTeams = () => {
        socketRef.current.emit('randomise_teams', {
            gameId: gameId,
        });
    };

    const selectRole = (role, currentRole) => {
        if (role !== currentRole) {
            socketRef.current.emit('select_role', {
                gameId: gameId,
                role: role,
            });
        }
    };

    const selectWordBundle = (bundle, currentBundle) => {
        if (bundle !== currentBundle) {
            socketRef.current.emit('select_word_bundle', {
                gameId: gameId,
                bundle: bundle,
            });
        }
    };

    const endTurn = (team, currentTurn) => {
        console.log(team);
        console.log(currentTurn);
        if (team === currentTurn) {
            socketRef.current.emit('end_turn', {
                gameId: gameId,
            });
        }
    };

    return { joinGame, newGame, selectTeam, randomiseTeams, selectRole, selectWordBundle, endTurn };
};

export default useGame;
