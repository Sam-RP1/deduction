module.exports = function (app) {
    app.use('/api/create', require('./create'));
    app.use('/api/game', require('./game'));
};
