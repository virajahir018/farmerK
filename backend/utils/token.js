const jwt = require("jsonwebtoken");

function GenerateToken(obj) {
    const token = jwt.sign(
        { obj },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    )

    return { token };
}

module.exports = GenerateToken;