const jwt = require("jsonwebtoken");

function Auth(req, res, next) {
    try {
        const token = req.session.token

        if (!token) {
            return res.json({
                message: "Token required"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = Auth;