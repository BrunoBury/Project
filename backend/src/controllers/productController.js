const productServices = require('../services/productService');

const getAllControler = async (_req, res) => {
  const products = await productServices.getAllServ();

  res.status(200).json(products);
};

const getByIdControler = async (req, res) => {
  const { id } = req.params;
  const product = await productServices.getByIdServ(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  return res.status(200).json(product);
};

module.exports = {
  getAllControler,
  getByIdControler,
};