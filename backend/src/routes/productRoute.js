const { Router } = require('express');

const { productController } = require('../controllers'); 
const validateProductName = require('../middlewares/validateProduct');

const productRouter = Router();

productRouter.get('/', productController.getAllControler);
productRouter.get('/:id', productController.getByIdControler);
productRouter.post(
'/',
validateProductName,
 productController.newProductControler,
);

module.exports = productRouter;
