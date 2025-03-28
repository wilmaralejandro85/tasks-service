const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: 'No hay token, autorización denegada' });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        console.log("Usuario autenticado en Middleware:", decoded); // 🔍 Agrega este log
        req.user = decoded; // Debe tener userId
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};