const connectiondb = require('./connectiondb');

const getAllModels = async () => {
    const [products] = await connectiondb.execute('SELECT * FROM products');
    return products;
};

const getByIdModels = async (id) => {
    const [productRow] = await connectiondb.execute('SELECT * FROM products WHERE id = ?', [id]);
    const product = productRow[0];
    return product;
};

module.exports = { 
    getAllModels,
    getByIdModels,
};
