const db = require('./sqlite');

const Product = {
    getAll: (callback) => {
        db.all("SELECT * FROM products", [], callback);
    },
    getById: (id, callback) => {
        db.get("SELECT * FROM products WHERE id = ?", [id], callback);
    },
    create: (data, callback) => {
        const { name, description, price, image_url } = data;
        db.run(
            "INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)",
            [name, description, price, image_url],
            callback
        );
    }
};

module.exports = Product;