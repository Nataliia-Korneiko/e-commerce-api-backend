const express = require('express');
const router = express.Router();
const { products: ctrl } = require('../controllers');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.addOne);
router.put('/:id', ctrl.updateOne);
router.delete('/:id', ctrl.deleteOne);

module.exports = router;
