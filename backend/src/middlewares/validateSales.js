const { productModels } = require('../models');

const validateProductId = (req, res, next) => {
    const sales = req.body;
  
    const missingProductId = sales.find((item) => !item.productId);
  
    if (missingProductId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  
    next();
  };

const validateProductQuantity = async (req, res, next) => {
    const sales = req.body;
  
    const invalidQuantity = sales
    .find((item) => item.quantity === undefined || item.quantity === null);
  
    if (invalidQuantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  
    next();
  };

const validateQuantityGreaterThanZero = async (req, res, next) => {
    const sales = req.body;
  
    const invalidQuantity = sales
    .find((item) => item.quantity <= 0);
  
    if (invalidQuantity) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  
    next();
  };

const validateProductExist = async (req, res, next) => {
    const sales = req.body;
    const produductsDB = await productModels.getAllModels();
    const productsIds = produductsDB.map((product) => product.id);

    const invalidProduct = sales
    .filter((item) => !productsIds.includes(item.productId));

    if (invalidProduct.length > 0) {
        return res.status(404).json({ message: 'Product not found' });
    }

    next();
};

module.exports = {
    validateProductId,
    validateProductQuantity,
    validateQuantityGreaterThanZero,
    validateProductExist,
};    