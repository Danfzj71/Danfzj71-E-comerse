const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Middleware para asegurar que el usuario esté logueado
function isLogged(req, res, next) {
    if (req.session.userId) return next();
    res.redirect('/login');
}

router.get('/cart', isLogged, cartController.showCart);
router.post('/cart/add', isLogged, cartController.addProduct);
router.post('/cart/delete/:id', isLogged, cartController.removeItem);

module.exports = router;