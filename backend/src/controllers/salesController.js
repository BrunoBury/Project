const salesServices = require('../services/salesService');

const getAllControler = async (req, res) => {
    const sales = await salesServices.getAllServ();
    res.status(200).json(sales);
    };

const getByIdControler = async (req, res) => {
    const { id } = req.params;
    const sale = await salesServices.getByIdServ(id);
    if (!sale || sale.length === 0) {
        return res.status(404).json({ message: 'Sale not found' });
    }
    
    const saleNoId = sale.map((saleItem) => {
        const { saleId, ...rest } = saleItem;
        return rest;
    });
    // console.log(saleNoId);
    res.status(200).json(saleNoId);
};

module.exports = {
    getAllControler,
    getByIdControler,
};