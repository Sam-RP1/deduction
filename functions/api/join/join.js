const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const join = express.Router();

module.exports = join;

join.use(cors({ origin: true }));
join.use(bodyParser.json());
join.use(bodyParser.urlencoded({ extended: true }));

// Function
join.get('/:gameid', async (req, res) => {
    try {
        const collection = 'gameInstances';
        const gameId = req.params.gameid;

        const game = await admin.firestore().collection(collection).doc(gameId).get();

        if (!game.exists) {
            res.send({ exists: false });
        } else {
            const gameData = game.data();
            gameData.exists = true;
            res.send(gameData);
        }
    } catch (e) {
        res.send({
            error: e,
        });
    }
});
