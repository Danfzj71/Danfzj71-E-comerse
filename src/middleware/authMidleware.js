// src/middleware/authMidleware.js
module.exports = {
    isLogged: (req, res, next) => {
        if (req.session.userId) {
            return next();
        }
        res.redirect('/login');
    }
};
