const salesService = require('../services/salesServices');

const salesController = {

  async create(req, res, next) {
    try {
      const sales = req.body;
      
      const salesId = await salesService.create(sales);
  
      const salesObj = { id: salesId, itemsSold: sales };
  
      res.status(201).json(salesObj);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, _next) {
    const data = await salesService.getAll();

    res.status(200).json(data);
  },
};

module.exports = salesController;