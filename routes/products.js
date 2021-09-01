const express = require('express');
const router = express.Router();
const { products: ctrl } = require('../controllers');
const upload = require('../helpers/upload');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', upload.single('image'), ctrl.addOne);
router.delete('/:id', ctrl.deleteOne);
router.patch('/:id', ctrl.updateOne);
router.patch('/:id/rating', ctrl.updateOneRating);
router.patch('/:id/resume', ctrl.updateOneResume);
router.patch('/:id/images', upload.array('images', 10), ctrl.updateOneImages);
router.get('/get/count', ctrl.getAllCount);
router.get('/get/featured/:count', ctrl.getAllFeatured);

module.exports = router;
