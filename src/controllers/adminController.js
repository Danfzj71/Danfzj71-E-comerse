const Product = require('../models/productModel');

const adminController = {
    showAddProduct: (req, res) => {
        res.render('admin/addProduct'); 
    },

    createProduct: (req, res) => {
        const { name, description, price, image_url } = req.body;
        Product.create({ name, description, price, image_url }, (err) => {
            if (err) return res.status(500).send("Error al guardar");
            res.redirect('/');
        });
    }
};

module.exports = adminController;