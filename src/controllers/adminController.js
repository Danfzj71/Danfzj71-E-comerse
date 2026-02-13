const Product = require('../models/productModel');
const db = require('../models/sqlite');

const adminController = {
    // ... showAddProduct ...
    showAddProduct: (req, res) => {
        res.render('admin/add-product', { error: null });
    },


    createProduct: (req, res) => {
        const { name, description, price } = req.body;
        // La ruta de la imagen 
        const image_url = req.file ? `/uploads/${req.file.filename}` : '/uploads/default.png';

        if (parseFloat(price) <= 0) {
            return res.render('admin/add-product', { error: "Precio inválido" });
        }

        Product.create({ name, description, price, image_url }, (err) => {
            if (err) return res.send("Error al guardar");
            res.redirect('/');
        });
    },

    deleteProduct: (req, res) => {
    const id = req.params.id;
        db.run("DELETE FROM products WHERE id = ?", [id], (err) => {
            if (err) {
                console.error("Error al eliminar producto:", err);
                return res.redirect('/?error=no-se-pudo-eliminar');
            }
        res.redirect('/'); // Redirigimos al inicio para ver que ya no está
        });
    }

};

module.exports = adminController;

