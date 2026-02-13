const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const upload = require('../middleware/uploadMiddleware');

const { isLogged } = require('../middleware/authMidleware'); 


router.get('/add-product', isLogged, adminController.showAddProduct);
router.post('/add-product', isLogged, upload.single('image'), adminController.createProduct);
router.post('/delete-product/:id', isLogged, adminController.deleteProduct);

module.exports = router;




