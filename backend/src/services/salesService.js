const salesModels = require('../models/salesModels');

const getAllServ = async () => {
    const sales = await salesModels.getAllModels();
    
    return sales;
};

const getByIdServ = async (id) => {
    const sale = await salesModels.getByIdModels(id);

    return sale;
};

const addSalesServ = async (sale) => {
    const newSale = await salesModels.addSalesModels(sale);

    return newSale;
};

module.exports = {
    getAllServ,
    getByIdServ,
    addSalesServ,
};
