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

const updateProductController = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    return res.status(400).json({ message: '"id" is required' });
  }
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  
  const update = await productServices.updateProductServ(id, name);

  if (!update) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(update);
};

const deleteProductController = async (req, res) => {
  const { id } = req.params;

  const product = await productServices.deleteProductServ(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(204).json(product);
};

module.exports = {
  getAllControler,
  getByIdControler,
  newProductControler,
  updateProductController,
  deleteProductController,
};