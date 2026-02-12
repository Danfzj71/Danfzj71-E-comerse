const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.showHome);
router.get('/producto/:id', productController.showDetail);

module.exports = router;