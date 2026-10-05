const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const crypto = require("crypto");
const Transporter = require("../utils/sendMail");

const userRouters = express.Router();

userRouters.post("/verify-user", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(404).json({
                message: "Email not define"
            })
        }

        const otp = crypto.randomInt(100000, 1000000).toString();

        req.session.otp = otp;
        req.session.email = email;

        // await Transporter.sendMail({
        //     from: process.env.EMAIL_USER,
        //     to: email,
        //     subject: "Verifycation gmail",
        //     text: `Your link ${verify.token}. This LINK is valid for 5 minutes.`
        // })

        res.json({
            message: "Link send successfully",
            email,
            otp
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

        res.json({
            message: "Success",
            otp,
            session: req.session
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

userRouters.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.json({
                message: "require all field"
            })
        }

        if (password.length < 6) {
            return res.json({
                message: "Password must be 6 latters"
            })
        }

        if (role === "admin") {
            return res.json({
                message: "Select valid role"
            })
        }

        const isUser = await User.findOne({ email });

        if (isUser) {
            return res.json({
                message: "User already register"
            })
        }

        const hash = await bcrypt.hash(password, 5);

        const user = await User.create({
            name,
            email,
            password: hash,
            role
        });

        return res.json({
            message: "User register successfully",
            user
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = userRouters;