const connectiondb = require('./connectiondb');

const getAllModels = async () => {
    const [products] = await connectiondb.execute('SELECT * FROM products');
    return products;
};

const getByIdModels = async (id) => {
    const [productRow] = await connectiondb.execute('SELECT * FROM products WHERE id = ?', [id]);
    const product = productRow[0];
    // console.log(product);
    return product;
};

const newProductModels = async (name) => {
    const [{ insertId }] = await connectiondb.execute(
'INSERT INTO products (name) VALUES (?)',
    [name],
);
    return insertId;
};

const updateProductModels = async (id, name) => {
        await connectiondb.execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);

        const [[product]] = await connectiondb.execute('SELECT * FROM products WHERE id = ?', [id]);
        console.log(product);
        return product;
};

const deleteProductModels = async (id) => {
    const [product] = await connectiondb.execute('DELETE FROM products WHERE id = ?', [id]);
    if (product.affectedRows === 0) { 
        return null;
    }    

    return product;
};

module.exports = { 
    getAllModels,
    getByIdModels,
    newProductModels,
    updateProductModels,
    deleteProductModels,
};
