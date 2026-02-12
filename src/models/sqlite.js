const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(
    path.resolve(__dirname, '../../database.db'),
    (err) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err.message);
            return;
        }

        // 1. Tabla de Productos
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            image_url TEXT
        )`);

        // 2. Tabla de Usuarios (con Roles)
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user' -- Aquí defines 'user' o 'admin'
        )`);

        // 3. Tabla de Carrito (Relacional)
        db.run(`CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER DEFAULT 1,
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (product_id) REFERENCES products (id)
        )`);

        console.log('Base de datos y tablas listas.');
    }
);

module.exports = db;