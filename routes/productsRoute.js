const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.post('/', productsController.create);

router.get('/search', productsController.getByQuery);

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.put('/:id', productsController.update);

router.delete('/:id', productsController.delete);

module.exports = router;