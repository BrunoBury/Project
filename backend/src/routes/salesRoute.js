const { Router } = require('express');

const { salesController } = require('../controllers');

const salesRouter = Router();

salesRouter.get('/', salesController.getAllControler);
salesRouter.get('/:id', salesController.getByIdControler);

module.exports = salesRouter;