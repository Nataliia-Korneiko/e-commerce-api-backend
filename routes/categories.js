const express = require('express');
const router = express.Router();
const { categories: ctrl } = require('../controllers');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.addOne);
router.delete('/:id', ctrl.deleteOne);
router.put('/:id', ctrl.updateOne);

module.exports = router;
