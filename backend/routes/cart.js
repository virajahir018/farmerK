const express = require("express");
const Auth = require("../middleware/Auth");
const Products = require("../models/Products");
const Cart = require("../models/Cart");
const { default: mongoose } = require("mongoose");

const cartRouter = express.Router();

cartRouter.post("/create/:id", Auth, async (req, res) => {
    try {

        const productId = req.params.id;
        let { quantity } = req.body;

        if (!quantity) {
            quantity = 1;
        }

        // console.log(quantity);

        // console.log(productId)

        const product = await Products.findById(productId)

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({ user: req.user });

        if (!cart) {
            cart = new Cart({
                user: req.user,
                items: []
            });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {

            cart.items[itemIndex].quantity += quantity;
        } else {

            cart.items.push({
                product: productId,
                quantity: quantity
            });
        }

        await cart.save();

        res.status(201).json({
            message: "Product added to cart",
            cart
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})

cartRouter.get("/", Auth, async (req, res) => {
    try {

        const userId = req.user;

        const cart = await Cart.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $unwind: "$items"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "items.product",
                    foreignField: "_id",
                    as: "productData"
                }
            },
            {
                $unwind: "$productData"
            },
            {
                $addFields: {
                    subtotal: {
                        $multiply: [
                            "$productData.price",
                            "$items.quantity"
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: "$_id",
                    items: {
                        $push: {
                            product: "$productData",
                            quantity: "$items.quantity",
                            subtotal: "$subtotal"
                        }
                    },
                    totalePrice: {
                        $sum: "$subtotal"
                    }
                },
            }
        ])

        res.json(cart)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})

module.exports = cartRouter;