const bcrypt = require('bcrypt');
const db = require('../models/sqlite'); // Asegúrate de que esta ruta sea correcta según tu estructura de carpetas

const authController = {
    register: async (req, res) => {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.run("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')", 
        [username, email, hashedPassword], (err) => {
            if (err) return res.render('register', { error: "Email ya registrado" });
            res.redirect('/login');
        });
    },
    login: (req, res) => {
        const { email, password } = req.body;
        db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
            if (user && await bcrypt.compare(password, user.password)) {
                req.session.userId = user.id;
                req.session.username = user.username;
                req.session.userRole = user.role;
                return res.redirect('/');
            }
            res.render('login', { error: "Credenciales inválidas" });
        });
    }
};

module.exports = authController;