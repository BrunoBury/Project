const { Router } = require('express');

const { salesController } = require('../controllers');
const { validateSales } = require('../middlewares/validateSales');

const salesRouter = Router();

salesRouter.get('/', salesController.getAllControler);
salesRouter.get('/:id', salesController.getByIdControler);
salesRouter.post(
'/', 
validateSales,
salesController.addSalesControler,
);

module.exports = salesRouter;