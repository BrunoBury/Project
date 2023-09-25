const { Router } = require('express');

const { salesController } = require('../controllers');
const {
    validateProductId,
    validateProductQuantity,
    validateQuantityGreaterThanZero,
    validateProductExist,
} = require('../middlewares/validateSales');

const salesRouter = Router();

salesRouter.get('/', salesController.getAllControler);
salesRouter.get('/:id', salesController.getByIdControler);
salesRouter.post(
'/', 
validateProductId,
validateProductQuantity,
validateQuantityGreaterThanZero,
validateProductExist,

salesController.addSalesControler,
);

module.exports = salesRouter;