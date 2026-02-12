const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

// Conexión a la base de datos
const db = new sqlite3.Database(path.resolve(__dirname, 'database.db'));

async function createAdmin() {
    const username = 'admin';
    const email = 'admin@tienda.com';
    const password = 'admin123'; // Cambia esto después
    const role = 'admin';

    // Encriptamos la clave igual que en el registro normal
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`;

    db.run(sql, [username, email, hashedPassword, role], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                console.log('El usuario administrador ya existe.');
            } else {
                console.error('Error al crear admin:', err.message);
            }
        } else {
            console.log('¡Usuario administrador creado con éxito!');
            console.log('Email: admin@tienda.com | Pass: admin123');
        }
        db.close();
    });
}

createAdmin();