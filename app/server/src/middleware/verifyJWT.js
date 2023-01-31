const jwt = require('jsonwebtoken');
const UserAccount = require('../database/models/UserAccount');

// verify JWT token
const verifyToken = (req, res, next) => {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token' });
            } else {
                UserAccount.findOne({
                    where: {
                        userId: decode.userId,
                    },
                }).then((user) => {
                    if (!user) {
                        res.status(404).json({
                            message: 'Invalid token, user id not found',
                        });
                    } else {
                        req.user = user;
                        next();
                    }
                });
            }
        });
    } else {
        req.user = undefined;
        next();
    }
};

module.exports = verifyToken;
