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

module.exports = {
    getAllModels,
    getByIdModels,
};