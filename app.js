require('dotenv').config(); 
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const db = require('./src/models/sqlite'); 

// --- CONFIGURACIONES ---
app.set('view engine', 'ejs');
app.use(express.static('public')); 
// vistas en src/views
app.set('views', path.join(__dirname, 'src', 'views'));


// --- MIDDLEWARES 
app.use(express.urlencoded({ extended: false })); // Para leer formularios POST
app.use(session({
    secret: process.env.SESSION_SECRET || 'clave-secreta-provisional',
    resave: false,
    saveUninitialized: false
}));

// Middleware para pasar datos del usuario a TODAS las vistas (opcional pero recomendado)
app.use((req, res, next) => {
    const db = require('./src/models/sqlite'); 
    next();
});

app.use((req, res, next) => {
    res.locals.user = req.session.username || null;
    res.locals.role = req.session.userRole || null;
    
    
    if (!req.session.userId) {
        res.locals.cartCount = 0;
        return next(); 
        }

    
    db.get("SELECT SUM(quantity) as count FROM cart WHERE user_id = ?", [req.session.userId], (err, row) => {
        if (err) {
            console.error("Error en cartCount:", err);
            res.locals.cartCount = 0;
        } else {
            res.locals.cartCount = row ? (row.count || 0) : 0;
        }
        next(); 
    });
});

// --- RUTAS ---
const adminRoute = require('./src/routes/adminRoute');
const indexRoute = require('./src/routes/indexRoute');
const authRoute = require('./src/routes/authRoute');
const cartRoute = require('./src/routes/cartRoute');


app.use('/admin', adminRoute);
app.use('/', indexRoute);
app.use('/', authRoute);
app.use('/', cartRoute);


// --- PUERTO Y LANZAMIENTO ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


