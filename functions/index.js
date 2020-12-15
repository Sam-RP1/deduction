const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

// App
const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./api')(app);

exports.deduction = functions.https.onRequest(app);
