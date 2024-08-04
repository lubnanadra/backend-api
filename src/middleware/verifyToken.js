const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('Bearer ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.username = decoded.username;
        next();
    });
};

module.exports = { verifyToken };
