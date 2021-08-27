const express = require('express');
const router = express.Router();
const { users: ctrl } = require('../controllers');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.delete('/:id', ctrl.deleteOne);
router.patch('/:id', ctrl.updateOne);
router.get('/get/count', ctrl.getAllCount);

module.exports = router;
