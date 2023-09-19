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

const newProductModels = async (name) => {
    const [{ insertId }] = await connectiondb.execute(
'INSERT INTO products (name) VALUES (?)',
    [name],
);
// console.log(insertId);
    return insertId;
};

module.exports = { 
    getAllModels,
    getByIdModels,
    newProductModels,
};
