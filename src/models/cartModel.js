const db = require('./sqlite');

const Cart = {
    // Obtener todos los productos del carrito de un usuario
    getByUserId: (userId, callback) => {
        const sql = `
            SELECT cart.id, products.name, products.price, cart.quantity, products.image_url 
            FROM cart 
            JOIN products ON cart.product_id = products.id 
            WHERE cart.user_id = ?`;
        db.all(sql, [userId], callback);
    },

    // Añadir producto o incrementar cantidad
    addToCart: (userId, productId, callback) => {
        // Primero verificamos si ya existe para no duplicar filas
        db.get("SELECT * FROM cart WHERE user_id = ? AND product_id = ?", [userId, productId], (err, row) => {
            if (row) {
                db.run("UPDATE cart SET quantity = quantity + 1 WHERE id = ?", [row.id], callback);
            } else {
                db.run("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)", [userId, productId], callback);
            }
        });
    },

    // Eliminar un item específico
    deleteItem: (cartId, userId, callback) => {
        db.run("DELETE FROM cart WHERE id = ? AND user_id = ?", [cartId, userId], callback);
    }
};

module.exports = Cart;