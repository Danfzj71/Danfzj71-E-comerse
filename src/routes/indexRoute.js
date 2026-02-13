const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para la Home
router.get('/', productController.showHome);

// RUTA DE DETALLES - Asegúrate de que NO haya espacios entre los /
router.get('/product/:id', productController.showDetail);

module.exports = router;

/*
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.showHome);
router.get('/producto/:id', productController.showDetail);

module.exports = router;
*/