const productModels = require('../models/productModels');

const getAllServ = async () => {
  const products = await productModels.getAllModels();

  return products;
};

const getByIdServ = async (id) => {
  const product = await productModels.getByIdModels(id);

  return product;
};

module.exports = {
 getAllServ,
  getByIdServ,
};