const express = require("express");
const multer = require("multer");
const { Readable } = require("stream");
const Auth = require("../middleware/Auth");

const uploadsRouters = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(
                new Error("Only JPG, PNG and WEBP images are allowed")
            );
        }

        cb(null, true)
    }
});

uploadsRouters.post("/add", Auth, upload.single("image"), async (req, res) => {
    let uploadId;

    try {

    } catch (error) {
        return res.json({
            message: error.message
        })
    }
})

// uploadsRouters.post("/multiple_file", upload.array("avatar", 10), (req, res) => {
//     res.json({
//         message: "Upload successfully",
//         file: req.file
//     });
// })

module.exports = uploadsRouters;