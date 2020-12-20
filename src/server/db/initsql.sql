CREATE DATABASE if not exists deduction_DB CHARACTER SET utf8;

CREATE TABLE if not exists deduction_DB.game_instances(
    created VARCHAR(100) NOT NULL,
    game_id VARCHAR(30) NOT NULL,
    game_password VARCHAR(12) NOT NULL,
    players JSON NOT NULL,
    score JSON NOT NULL,
    word_group VARCHAR(30),
    custom_words VARCHAR(750),
    words JSON NOT NULL,
    turn VARCHAR(4) NOT NULL,
    guesses_blue JSON NOT NULL,
    guesses_red JSON NOT NULL,
    quick_game BOOLEAN NOT NULL,
    turn_timer BOOLEAN NOT NULL,
    game_timer INT NOT NULL,
    last_query VARCHAR(100) NOT NULL,
    PRIMARY KEY (game_id)
) ENGINE=INNODB;

use deduction_DB

insert into game_instances (
    created,
    game_id,
    game_password,
    players,
    score,
    word_group,
    custom_words,
    words,
    turn,
    guesses_blue,
    guesses_red,
    quick_game,
    turn_timer,
    game_timer,
    last_query
    ) values (
    199999999,
    'GAME_ID',
    'GAMEPASSWORD',
    "{ '0': { 'name': 'player1' } }",
    "{ 'score': {'blue': 8, 'red': 9} }",
    'eng-standard',
    'acustomword,what,two',
    "{ '0': { 'denomination': 'red', 'index': '2', 'word': 'wordHere' } }",
    'red',
    "{ '0': { 'denomination': 'red', 'index': '2', 'word': 'wordHere' } }",
    "{ '0': {} }",
    false,
    false,
    0,
    199999998
    )

-- created: 19235235235
-- lobby_id: 'warps room'
-- players: { idNum: { name: nameHere } }
-- score: { score: { blue: 8, red: 9 } }
-- word_group: 'eng-standard'
-- custom_words: 'word,word,word,word,word,word,word,word'
-- words: { 0: { denomination: 'red', index: 0, word: 'Big' } x24 more}
-- turn: 'blue'
-- guesses_blue: { 0: { denomination: 'red', index: 0, word: 'word' } }
-- guesses_red: { 0: { denomination: 'blue', index: 5, word: 'word2' } }
-- quick_game: false
-- turn_timer: false
-- game_timer: 0
-- last_query: 132412346346