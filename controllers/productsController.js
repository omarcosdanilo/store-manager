const productsService = require('../services/productsService');

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

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await productsService.checkExistsProduct(id);
      productsService.validateProductName(name);
      await productsService.update(id, name);

      res.status(200).json({ id, name });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      
      await productsService.checkExistsProduct(id);
      await productsService.delete(id);
  
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },

  async getByQuery(req, res, next) {
    try {
      const { q } = req.query;

      const result = await productsService.getByQuery(q);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productsController;