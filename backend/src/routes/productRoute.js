const { Router } = require('express');

const { productController } = require('../controllers'); 

const productRouter = Router();

productRouter.get('/', productController.getAllControler);
productRouter.get('/:id', productController.getByIdControler);

module.exports = productRouter;
