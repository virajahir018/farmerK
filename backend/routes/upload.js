const express = require("express");
const multer = require("multer");
const { Readable } = require("stream");
const Auth = require("../middleware/Auth");
const cloudinary = require("../config/cloudinary");
const Product = require("../models/Products");

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
    let uploadedPublicId;

    try {
        const { name, description, price } = req.body;

        if (
            !name ||
            !description ||
            price === undefined ||
            price === ""
        ) {
            return res.status(400).json({
                message: "Name, description and price are required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Please select a product image"
            });
        }

        const result = await new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "farmer_ptroducts",
                    resource_type: "image"
                },

                (error, result) => {
                    if (error) return reject(error);

                    resolve(result)
                }
            );

            Readable.from(req.file.buffer).pipe(stream)

        })

        uploadedPublicId = result.public_id;

        const product = await Product.create({
            user: req.session.userId,
            name,
            description,
            price,
            image: result.secure_url,
            imageId: result.public_id
        })

        res.json({
            message: "File uploaded successfully",
            product
        })

    } catch (error) {
        console.error("Product upload error:", error);

        if (uploadedPublicId) {

            try {
                await cloudinary.uploader.destroy(uploadedPublicId)

            } catch (cleanupError) {
                console.error("Image cleanup failed:", cleanupError.message);
            }
        }
        return res.status(500).json({
            message: "Unable to add product"
        });
    }
})

uploadsRouters.get("/all", Auth, async (req, res) => {
    try {
        const products = await Product.find({ availability: true })
            .populate("user", "name")
            .sort({ createdAt: -1 });

        return res.status(200).json(products);
    } catch (error) {
        console.error("Fetch products error:", error);

        return res.status(500).json({
            message: "Unable to fetch products"
        });
    }
});
module.exports = uploadsRouters;