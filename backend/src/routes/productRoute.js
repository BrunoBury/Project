const { Router } = require('express');

const { productController } = require('../controllers'); 

const productRouter = Router();

productRouter.get('/', productController.getAllControler);
productRouter.get('/:id', productController.getByIdControler);
productRouter.post('/', productController.newProductControler);

module.exports = productRouter;
