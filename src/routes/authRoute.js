const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models/sqlite');

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')`;
    
    db.run(sql, [username, email, hashedPassword], (err) => {
        if (err) return res.send("Error al registrar usuario.");
        res.redirect('/login');
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.userRole = user.role;
            return res.redirect('/');
        }
        res.send("Credenciales incorrectas.");
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;