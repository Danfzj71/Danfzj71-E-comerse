// src/middleware/authMidleware.js
module.exports = {
    isLogged: (req, res, next) => {
        if (req.session.userId) {
            return next();
        }
        res.redirect('/login');
    }
};


/*
    // src/midleware/authMiddleware.js
module.exports = (req, res, next) => {
    if (req.session.userId && req.session.userRole === 'admin') {
        return next(); // Es admin, puede pasar
    }
    // Si no es admin, lo mandamos al login o le damos error
    res.status(403).send("Acceso denegado: Se requiere cuenta de administrador.");
};

*/