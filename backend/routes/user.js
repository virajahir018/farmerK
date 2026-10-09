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

        if (!/^\d{6}$/.test(otp)) {
            return res.status(400).json({
                message: "OTP must be 6 digits"
            });
        }

        if (otp !== req.session.otp) {
            return res.status(400).json({
                message: "OTP does not match"
            });
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

        const email = req.session.email;

        if (!name || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        if (!email) {
            return res.status(400).json({
                message: "Please verify your email first"
            });
        }

        const isUser = await User.findOne({ email });

        if (isUser) {
            return res.status(409).json({
                message: "User already registered"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hash
        });

        delete req.session.email;
        delete req.session.otp;

        return res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

userRouters.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const compare = await bcrypt.compare(
            password,
            user.password
        );

        if (!compare) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = GenerateToken({
            id: user._id,
            email: user.email
        });

        req.session.token = token.token;

        return res.json({
            message: "Login successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});


userRouters.get("/profile", Auth, (req, res) => {

    res.json({
        message: "User profile",
    })
})


userRouters.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                message: "Logout failed"
            });
        }

        res.clearCookie("connect.sid");

        res.json({
            message: "Logout successfully",
        });
    });
});

module.exports = userRouters;