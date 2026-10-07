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

module.exports = userRouters;