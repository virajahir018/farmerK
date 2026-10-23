function Role(req, res, next) {

    if (req.session.userRole === "farmer" || req.session.userRole === "admin") {
        return next();
    }

    return res.status(401).json({
        message: "Your not able this role"
    });

}

module.exports = Role