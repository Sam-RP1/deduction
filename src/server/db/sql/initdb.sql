CREATE DATABASE if not exists deduction_DB CHARACTER SET utf8;

CREATE TABLE if not exists deduction_DB.game_instances(
    created VARCHAR(100) NOT NULL,
    game_id VARCHAR(20) NOT NULL,
    game_password VARCHAR(20) NOT NULL,
    players VARCHAR(1000) NOT NULL,
    score JSON NOT NULL,
    word_group VARCHAR(30),
    custom_words VARCHAR(2000),
    words VARCHAR(3000) NOT NULL,
    turn VARCHAR(4) NOT NULL,
    quick_game BOOLEAN NOT NULL,
    turn_timer BOOLEAN NOT NULL,
    game_timer INT NOT NULL,
    last_query VARCHAR(1000) NOT NULL,
    PRIMARY KEY (game_id)
) ENGINE=INNODB;
-- created: 19235235235
-- lobby_id: 'warps room'
-- players: { idNum: { name: nameHere } }
-- score: { score: { blue: 8, red: 9 } }
-- word_group: 'eng-standard'
-- custom_words: 'word,word,word,word,word,word,word,word'
-- words: [ { denomination: 'red', index: 0, word: 'Big', guessData: { isGuessed: true/false, team: 'red } } x24 more]
-- turn: 'blue'
-- quick_game: false
-- turn_timer: false
-- game_timer: 0
-- last_query: 132412346346

CREATE TABLE if not exists deduction_DB.word_bundles(
    bundle_id VARCHAR(50) NOT NULL,
    category INT NOT NULL,
    is_enabled BOOLEAN NOT NULL,
    easy TEXT,
    normal TEXT,
    hard TEXT,
    expert TEXT,
    PRIMARY KEY (bundle_id)
) ENGINE=INNODB;
-- category 0: Language
-- category 1: Themed
-- category 2: Game