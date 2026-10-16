require("dotenv").config();

const express = require("express");
const connectMD = require("./config/db");
const userRouters = require("./routes/user");
const cors = require("cors")
const session = require("express-session");
const productsRouters = require("./routes/products");

const app = express();
const PORT = process.env.PORT

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use("/user", userRouters)
app.use("/file_upload", productsRouters)

app.get("/", (req, res) => {
    res.json({
        message: "App is running"
    })
})

connectMD();

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});