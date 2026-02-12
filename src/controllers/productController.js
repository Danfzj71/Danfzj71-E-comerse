const Product = require('../models/productModel');

const productController = {
    showHome: (req, res) => {
        Product.getAll((err, rows) => {
            if (err) return res.status(500).send("Error en la base de datos");
            res.render('index', { listaProductos: rows });
        });
    },
    showDetail: (req, res) => {
        Product.getById(req.params.id, (err, producto) => {
            if (err || !producto) return res.status(404).send("Producto no encontrado");
            res.render('detalle', { producto });
        });
    }
};

module.exports = productController;