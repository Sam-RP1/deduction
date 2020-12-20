/**
 * routes/index.js
 **/
module.exports = function (app) {
    app.use('/', require('./main'));
    app.use('/api', require('./api'));
};
