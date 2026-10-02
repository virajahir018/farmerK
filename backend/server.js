require("dotenv").config();

const express = require("express");
const connectMD = require("./config/db");
const userRouters = require("./routes/user");

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use("/user", userRouters)

app.get("/", (req, res) => {
    res.json({
        message: "App is running"
    })
})

connectMD();

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});