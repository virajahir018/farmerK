
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");

const userRouters = require("./routes/user");
const productsRouters = require("./routes/products");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://farmer-k.vercel.app"
    ],
    credentials: true
}));

app.use(express.json());

app.use(session({
    name: "farmerk.sid",
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

app.use("/user", userRouters);
app.use("/product", productsRouters);

app.get("/", (req, res) => {
    res.json({
        message: "App is running"
    });
});

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log("Server running on port", PORT);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
}

startServer();
