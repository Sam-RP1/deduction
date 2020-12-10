const CreateRouter = require('express').Router();

CreateRouter.route('/').post(require('./create.js'));

module.exports = CreateRouter;
