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

const newProductControler = async (req, res) => {
  const { name } = req.body;
  const product = await productServices.newProductServ(name);
  // console.log(product);
  if (!product) {
    return res.status(422).json({ message: 'Product already exists' });
  }
  const response = {
    id: product,
    name,
  };
  console.log(response);

  return res.status(201).json(response);
};

module.exports = {
  getAllControler,
  getByIdControler,
  newProductControler,
};