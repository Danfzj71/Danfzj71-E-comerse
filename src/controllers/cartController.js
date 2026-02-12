const Cart = require('../models/cartModel');

const cartController = {
    showCart: (req, res) => {
        const userId = req.session.userId;
        
        Cart.getByUserId(userId, (err, items) => {
            if (err) return res.status(500).send("Error al cargar el carrito");
            
            // Calculamos el total usando reduce
            const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            res.render('cart', { items, total });
        });
    },

    addProduct: (req, res) => {
        const userId = req.session.userId;
        const { productId } = req.body;

        Cart.addToCart(userId, productId, (err) => {
            if (err) return res.status(500).send("No se pudo agregar el producto");
            res.redirect('/cart');
        });
    },

    removeItem: (req, res) => {
        const cartId = req.params.id;
        const userId = req.session.userId;

        Cart.deleteItem(cartId, userId, (err) => {
            if (err) return res.status(500).send("Error al eliminar item");
            res.redirect('/cart');
        });
    }
};

module.exports = cartController;