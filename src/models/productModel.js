const db = require('./sqlite');

const Product = {
    // Método para obtener todos los productos
    getAll: (callback) => {
        db.all("SELECT * FROM products", [], callback);
    },

    // El método create que ya teníamos
    create: (data, callback) => {
        const { name, description, price, image_url } = data;
        db.run(
            "INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)",
            [name, description, price, image_url],
            callback
        );
    }
};

// ¡MUY IMPORTANTE! Sin esto, el controlador recibirá un objeto vacío
module.exports = Product;
