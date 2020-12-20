'use strict';

//------------- GLOBAL VARIABLES -------------//
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbData = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'deduction_DB',
};

module.exports.sqlPromise = mysql.createConnection(dbData);
