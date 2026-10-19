function Auth(req, res, next) {

    if (!req.session.userId) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    req.user = req.session.userId;

    next();
}


module.exports = Auth;