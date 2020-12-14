const CreateRouter = require('express').Router();

CreateRouter.route('/').post(require('./create.js'));
CreateRouter.route('/refresh').post(require('./create.js'));

module.exports = CreateRouter;
