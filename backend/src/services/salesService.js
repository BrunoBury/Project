const salesModels = require('../models/salesModels');

const getAllServ = async () => {
    const sales = await salesModels.getAllModels();
    
    return sales;
};

const getByIdServ = async (id) => {
    const sale = await salesModels.getByIdModels(id);

    return sale;
};

module.exports = {
    getAllServ,
    getByIdServ,
};
