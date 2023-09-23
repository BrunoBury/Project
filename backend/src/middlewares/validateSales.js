const { productModels } = require('../models');

const validateProductId = (productId) => productId === undefined;
const validateQuantity = (quantity) => quantity === undefined || quantity === null || quantity <= 0;

const validateProductExiste = async (productId) => {
    const product = await productModels.getByIdModels(productId);
    return product !== undefined;
};

const validateProduct = async (product) => {
    const { productId, quantity } = product;
    const validationResult = {};

    if (validateProductId(productId)) {
        validationResult.productIdError = '"productId" is required';
    }

    if (validateQuantity(quantity)) {
        validationResult.quantityError = '"quantity" must be greater than or equal to 1';
    }

    if (!(await validateProductExiste(productId))) {
        validationResult.productNotFoundError = 'Product not found';
    }

    return validationResult;
};

const validateSales = async (req, res, next) => {
    const sales = req.body;

    const validationResults = await Promise.all(sales.map(validateProduct));

    if (validationResults.some((result) => result.productIdError)) {
        return res.status(400).json({ message: '"productId" is required' });
    }

    if (validationResults.some((result) => result.quantityError)) {
        return res.status(400).json({ message: '"quantity" is required' });
    }

    if (validationResults.some((result) => result.productNotFoundError)) {
        return res.status(404).json({ message: 'Product not found' });
    }

    next();
};

module.exports = {
    validateSales,
    validateProductExiste,
};    
