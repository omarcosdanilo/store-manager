const productsService = require('../services/productsService');

const ERROR_NUMBER = '0';

const productsController = {
  
  async getAll(req, res, next) {
    try {
      const products = await productsService.getAll();
  
      res.status(200).json(products);
    } catch (error) {
      next(ERROR_NUMBER);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await productsService.getById(id);

      res.status(200).json(product);
    } catch (error) {
      next(ERROR_NUMBER);
    }
  },
};

module.exports = productsController;