require('dotenv').config(); // 1. Cargar variables de entorno siempre primero
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// --- CONFIGURACIONES ---
app.set('view engine', 'ejs');
app.use(express.static('public')); 
// Si tus vistas están dentro de src/views, usa: app.set('views', path.join(__dirname, 'src/views'));
app.set('views', path.join(__dirname, 'src', 'views'));


// --- MIDDLEWARES (Deben ir antes de las rutas) ---
app.use(express.urlencoded({ extended: false })); // Para leer formularios POST
app.use(session({
    secret: process.env.SESSION_SECRET || 'clave-secreta-provisional',
    resave: false,
    saveUninitialized: false
}));

// Middleware para pasar datos del usuario a TODAS las vistas (opcional pero recomendado)
app.use((req, res, next) => {
    res.locals.user = req.session.username || null;
    res.locals.role = req.session.userRole || null;
    next();
});

// --- RUTAS ---
const indexRoute = require('./src/routes/indexRoute');
const authRoute = require('./src/routes/authRoute');
const cartRoute = require('./src/routes/cartRoute');
const adminRoute = require('./src/routes/adminRoute');

app.use('/', indexRoute);
app.use('/', authRoute);
app.use('/', cartRoute);
app.use('/', adminRoute);

// --- PUERTO Y LANZAMIENTO ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});