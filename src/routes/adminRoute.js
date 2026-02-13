const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const upload = require('../middleware/uploadMiddleware');

const { isLogged } = require('../middleware/authMidleware'); 


router.get('/add-product', isLogged, adminController.showAddProduct);
router.post('/add-product', isLogged, upload.single('image'), adminController.createProduct);

module.exports = router;





/*
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAdmin = require('../middleware/authMidleware'); // Importamos el protector

// Todas estas rutas usarán el middleware 'isAdmin'
router.get('/admin/add-product', isAdmin, adminController.showAddProduct);
router.post('/admin/add-product', isAdmin, adminController.createProduct);

module.exports = router;
*/