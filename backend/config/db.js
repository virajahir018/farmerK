const mongoose = require("mongoose");

async function connectMD() {
    try {
        await mongoose.connect(process.env.MONGO_URL)

        console.log("MongoDB Connected")
    } catch (error) {
        console.log("MongoDB Connection Error:", error.message)
    }
}

module.exports = connectMD