const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const crypto = require("crypto");
const Transporter = require("../utils/sendMail");
const GenerateToken = require("../utils/token");
const Auth = require("../middleware/Auth");
const session = require("express-session");

const userRouters = express.Router();

userRouters.post("/verify-user", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(404).json({
                message: "Email not define"
            })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(404).json({
                message: "user already registered"
            })
        }

        const otp = crypto.randomInt(100000, 1000000).toString();

        req.session.otp = otp;
        req.session.email = email;

        await Transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verifycation gmail",
            text: `Your OTP ${otp}. This OTP is valid for 5 minutes.`
        })

        res.json({
            message: "OTP send successfully",
        })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

userRouters.post("/verify-otp", async (req, res) => {
    try {
        const { otp } = req.body;

        if (otp !== req.session.otp) {
            res.json({
                message: "Otp not match"
            })
        }

        res.json({
            message: "Success",
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

userRouters.post("/register", async (req, res) => {
    try {
        const { name, password } = req.body;

        console.log(req.session)

        if (!name || !password) {
            return res.json({
                message: "require all field"
            })
        }

        if (password.length < 6) {
            return res.json({
                message: "Password must be 6 latters"
            })
        }

        const isUser = await User.findOne({ email: req.session.email });

        if (isUser) {
            return res.json({
                message: "User already register"
            })
        }

        const hash = await bcrypt.hash(password, 5);

        await User.create({
            name,
            email: req.session.email,
            password: hash,
        });

        req.session.email = "";
        req.session.otp = "";

        return res.json({
            message: "User register successfully",
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

userRouters.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            message: "require all field"
        })
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.json({
            message: "User not find"
        })
    }

    const compare = await bcrypt.compare(password, user.password)

    if (!compare) {
        return res.json({
            message: "User not find"
        })
    }

    const token = GenerateToken(email);

    req.session.token = token.token

    res.json({
        message: "Login successfully",
        token: req.session.token
    })

})

userRouters.get("/profile", Auth, (req, res) => {

    res.json({
        message: "User profile"
    })
})

userRouters.post("/logout", (req, res) => {

    res.clearCookie("connect.sid");

    res.json({
        message: "Logout successfully"
    });
});

module.exports = userRouters;