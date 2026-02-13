const Product = require('../models/productModel');
const db = require('../models/sqlite');

const productController = {
    // Función para el Index (asegúrate de que el nombre coincida con tu ruta '/')
    showHome: (req, res) => {
        db.all("SELECT * FROM products", [], (err, rows) => {
            if (err) return res.status(500).send("Error al cargar productos");
            res.render('index', { listaProductos: rows });
        });
    },

    // FUNCIÓN DE DETALLE
    showDetail: (req, res) => {
        const id = req.params.id; // Captura el número de la URL
        
        if (!id) return res.redirect('/');

        db.get("SELECT * FROM products WHERE id = ?", [id], (err, producto) => {
            if (err) {
                console.error(" Error en Base de Datos:", err);
                return res.status(500).send("Error interno del servidor");
            }
            
            if (!producto) {
                console.log(` Producto con ID ${id} no encontrado.`);
                return res.status(404).render('404', { message: "Producto no encontrado" });
            }

            // Renderiza la vista pasando el objeto 'producto'
            res.render('product-detail', { producto: producto });
        });
    }
};

module.exports = productController;

/**
 * const Product = require('../models/productModel');
const db = require('../models/sqlite');

const productController = {
    showHome: (req, res) => {
        Product.getAll((err, rows) => {
            if (err) return res.status(500).send("Error en la base de datos");
            res.render('index', { listaProductos: rows });
        });
    },

    // src/controllers/productController.js
    showDetail: (req, res) => {
        const id = req.params.id; // Aquí capturamos el 4 o 5 de la URL
        
        db.get("SELECT * FROM products WHERE id = ?", [id], (err, producto) => {
            if (err) {
                console.error(err);
                return res.redirect('/');
            }
            if (!producto) {
                return res.status(404).send("Producto no encontrado");
            }
            // Renderiza la vista 'product-detail.ejs' y le pasa el objeto 'producto'
            res.render('product-detail', { producto });
        });
    }
    

};

module.exports = productController;

 */