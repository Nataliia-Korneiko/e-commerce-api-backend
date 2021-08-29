const express = require('express');
const router = express.Router();
const { orders: ctrl } = require('../controllers');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.addOne);
router.delete('/:id', ctrl.deleteOne);
router.patch('/:id', ctrl.updateOneStatus);
router.get('/get/total/sales', ctrl.getTotalSales);
router.get('/get/count', ctrl.getAllCount);
router.get('/get/user/orders/:userId', ctrl.getAllUserOrders);

module.exports = router;
