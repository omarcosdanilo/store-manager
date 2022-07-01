const productsService = require('../services/productsService');

// const ERROR_NUMBER = '0';

const productsController = {
  
  async getAll(req, res, next) {
    try {
      const products = await productsService.getAll();
  
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await productsService.getById(id);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { name } = req.body;
      const data = await productsService.create(name);
      const inserted = { id: data.insertId, name };

      res.status(201).json(inserted);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productsController;