const express = require("express");
const multer = require("multer");
const { Readable } = require("stream");
const Auth = require("../middleware/Auth");
const cloudinary = require("../config/cloudinary");
const Products = require("../models/Products");
const Role = require("../middleware/Role");

const productsRouters = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 10
    },
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

productsRouters.post("/add", Auth, Role, upload.array("images"), async (req, res) => {
    const uploadedPublicIds = [];

    try {
        const { name, description, price } = req.body;

        if (
            !name?.trim() ||
            !description?.trim() ||
            price === undefined ||
            price === ""
        ) {
            return res.status(400).json({
                message: "Name, description and price are required"
            });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: "Please select product images"
            });
        }

        const uploadedImages = await Promise.all(
            req.files.map((file) =>
                new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "farmer_products",
                            resource_type: "image"
                        },
                        (error, result) => {
                            if (error) {
                                return reject(error);
                            }

                            uploadedPublicIds.push(result.public_id);

                            resolve({
                                image: result.secure_url,
                                imageId: result.public_id
                            });
                        }
                    );

                    Readable.from([file.buffer]).pipe(stream);
                })
            )
        );

        console.log(uploadedImages)

        const product = await Products.create({
            user: req.session.userId,
            name,
            description,
            price,
            images: uploadedImages
        });

        return res.status(201).json({
            message: "Product added successfully",
            product
        });


    } catch (error) {
        console.error("Product upload error:", error);


        await Promise.all(
            uploadedPublicIds.map(async (publicId) => {
                try {
                    await cloudinary.uploader.destroy(publicId);
                } catch (cleanupError) {
                    console.error(
                        "Image cleanup failed:",
                        cleanupError.message
                    );
                }
            })
        );

        return res.status(500).json({
            message: "Unable to add product",
            error: error.message
        });
    }
})

productsRouters.get("/all", async (req, res) => {
    try {
        const products = await Products.find({ availability: true })
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

productsRouters.get("/get_page", async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10));
        const limit = Math.max(1, parseInt(4, 10));

        const skip = (page - 1) * limit;

        const products = await Products.find({ availability: true })
            .sort({ createdAt: -1, _id: -1 })
            .skip(skip)
            .limit(limit);

        const totalProduct = await Products.countDocuments();

        const totalPages = Math.ceil(totalProduct / limit);

        res.json({
            totalProduct,
            totalPages,
            products
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

productsRouters.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Products.findById(id)
            .populate("user", "-password")

        res.json({
            message: "Product find successfully",
            product
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

productsRouters.post("/filter", async (req, res) => {
    try {
        const { user, name, price, availability } = req.query;

        let filter = {};

        if (user) filter.user = user;
        if (name) filter.name = { $regex: name, $options: "i" };



        const product = await Products.find({ price });

        if (product.length === 0) {
            return res.json({
                message: "Product not found"
            })
        }


        return res.json(product)

    } catch (error) {
        return res.json({
            massege: error.message
        })
    }
})

module.exports = productsRouters;