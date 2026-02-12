// src/Controllers/adminController.js
const Product = require('../models/productModel');

const adminController = {
    showAddProduct: (req, res) => {
        res.render('admin/add-product', { error: null });
    },

    createProduct: (req, res) => {
        const { name, description, price, image_url } = req.body;

        // Validar precio en el servidor
        if (parseFloat(price) <= 0) {
            return res.render('admin/add-product', { 
                error: "El precio debe ser un número mayor a cero." 
            });
        }

        Product.create({ name, description, price, image_url }, (err) => {
            if (err) {
                return res.render('admin/add-product', { 
                    error: "Error al guardar en la base de datos." 
                });
            }
            res.redirect('/');
        });
    }
};

module.exports = adminController;