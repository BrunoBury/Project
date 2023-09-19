const productModels = require('../models/productModels');

const getAllServ = async () => {
  const products = await productModels.getAllModels();

  return products;
};

const getByIdServ = async (id) => {
  const product = await productModels.getByIdModels(id);

  return product;
};

const newProductServ = async (name) => {
  const product = await productModels.newProductModels(name);
  // console.log(product);
  return product;
};

module.exports = {
 getAllServ,
 getByIdServ,
 newProductServ,
};