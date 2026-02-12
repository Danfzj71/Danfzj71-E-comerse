const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAdmin = require('../middleware/authMidleware'); // Importamos el protector

// Todas estas rutas usarán el middleware 'isAdmin'
router.get('/admin/add-product', isAdmin, adminController.showAddProduct);
router.post('/admin/add-product', isAdmin, adminController.createProduct);

module.exports = router;