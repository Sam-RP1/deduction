'use strict';

// Imports & Global Variables
const path = require('path');
const express = require('express');

const app = express();

require('dotenv').config();
require('./routes')(app);

// Express app.use
app.use(express.static(__dirname));

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});
