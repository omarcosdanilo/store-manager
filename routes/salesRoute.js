const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/', salesController.create);
router.get('/:id', salesController.getById);
router.get('/', salesController.getAll);
router.delete('/:id', salesController.delete);
router.put('/:id', salesController.update);

module.exports = router;