const connectiondb = require('./connectiondb');

const getAllModels = async () => {
    const [sales] = await connectiondb.execute(`
      SELECT
        s.id AS saleId,
        s.date,
        sp.product_id AS productId,
        sp.quantity
      FROM
        sales AS s
      INNER JOIN
        sales_products AS sp
      ON
        s.id = sp.sale_id
        ORDER BY s.id ASC, sp.product_id ASC;
    `);
    return sales;
};

const getByIdModels = async (id) => {
    const [sale] = await connectiondb.execute(`
        SELECT
            s.id AS saleId,
            s.date,
            sp.product_id AS productId,
            sp.quantity
        FROM
            sales AS s
        INNER JOIN
            sales_products AS sp
        ON
            s.id = sp.sale_id
        WHERE
            s.id = ?
        ORDER BY s.id ASC, sp.product_id ASC;
    `, [id]);
    return sale;
};

const addSalesModels = async (sale) => {
    const [{ insertId }] = await connectiondb.execute(
        'INSERT INTO sales () VALUES ()',
    );

    const salesProducts = sale.map(({ productId, quantity }) => connectiondb.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [insertId, productId, quantity],
    ));
    
    await Promise.all(salesProducts);

    return {
        id: insertId,
        itemsSold: sale,
    };
    };

module.exports = {
    getAllModels,
    getByIdModels,
    addSalesModels,
};