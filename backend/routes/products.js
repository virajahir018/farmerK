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

productsRouters.post("/add_single_product", Auth, Role, upload.single("image"), async (req, res) => {
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

        const product = await Products.create({
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

productsRouters.post("/add_multiple_product", Auth, upload.array("images", 10), async (req, res) => {
    const uploadedPublicIds = [];

    try {
        const products = JSON.parse(req.body.products);
        const files = req.files;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                message: "Please send products as a JSON array"
            });
        }

        if (products.length !== files.length) {
            return res.status(400).json({
                message: "Each product must have one image"
            });
        }

        for (const item of products) {
            if (
                !item.name?.trim() ||
                !item.description?.trim() ||
                item.price === undefined ||
                item.price === "" ||
                !Number.isFinite(Number(item.price)) ||
                Number(item.price) < 0
            ) {
                return res.status(400).json({
                    message: "Every product needs a name, description and valid price"
                });
            }
        }

        const uploadedImages = await Promise.all(
            files.map((file) =>
                new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "farmer_products",
                            resource_type: "image"
                        },
                        (error, result) => {
                            if (error) return reject(error);

                            uploadedPublicIds.push(result.public_id);

                            resolve({
                                image: result.secure_url,
                                imageId: result.public_id
                            });
                        }
                    );

                    Readable.from(file.buffer).pipe(stream);
                })
            )
        );

        const productDocuments = products.map((item, index) => ({
            user: req.session.userId,
            name: item.name.trim(),
            description: item.description.trim(),
            price: Number(item.price),
            image: uploadedImages[index].image,
            imageId: uploadedImages[index].imageId
        }));

        const savedProducts = await Products.insertMany(productDocuments);

        return res.status(201).json({
            message: "Products and images uploaded successfully",
            products: savedProducts
        });

    } catch (error) {
        console.error("Product upload error:", error);

        await Promise.all(
            uploadedPublicIds.map((publicId) =>
                cloudinary.uploader.destroy(publicId).catch((cleanupError) => {
                    console.error("Image cleanup failed:", cleanupError.message);
                })
            )
        );

        return res.status(500).json({
            message: "Unable to add products"
        });
    }
}
);

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

module.exports = productsRouters;