const express = require('express');
const router = express.Router();
const { products: ctrl } = require('../controllers');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.addOne);
router.delete('/:id', ctrl.deleteOne);
router.patch('/:id', ctrl.updateOne);
router.patch('/:id/rating', ctrl.updateOneRating);
router.patch('/:id/resume', ctrl.updateOneResume);
router.get('/get/count', ctrl.getAllCount);
router.get('/get/featured/:count', ctrl.getAllFeatured);

module.exports = router;
