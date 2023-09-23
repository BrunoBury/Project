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

const updateProductServ = async (id, name) => {
  const product = await productModels.updateProductModels(id, name);
  if (!product) {
    return null;
  }
 return product;
};

const deleteProductServ = async (id) => {
  const product = await productModels.deleteProductModels(id);
 return product;
};

module.exports = {
 getAllServ,
 getByIdServ,
 newProductServ,
 updateProductServ,
  deleteProductServ,
};