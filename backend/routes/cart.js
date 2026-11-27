const express = require("express");
const Auth = require("../middleware/Auth");
const Products = require("../models/Products");
const Cart = require("../models/Cart");
const { default: mongoose } = require("mongoose");

const cartRouter = express.Router();

cartRouter.post("/add/:id", Auth, async (req, res) => {
    try {

        const productId = req.params.id;
        let { quantity } = req.body;

        quantity = Number(quantity);

        if (!quantity) {
            quantity = 1;
        }

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
            message: error.message,
            message: console.log(error.message)
        })
    }
})

cartRouter.get("/all", Auth, async (req, res) => {
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
                    totalPrice: {
                        $sum: "$subtotal"
                    }

                },

            }

        ])

        res.json(
            {
                product: cart[0].items,
                total: cart[0].totalPrice
            })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})

cartRouter.post("/delete/:id", Auth, async (req, res) => {
    try {
        const { id } = req.params
        // console.log(req.params)
        // if (!id) {
        //     return res.status(400).json({
        //         message: "Please enter Id"
        //     })
        // }

        const userCart = await Cart.findOneAndDelete(
            { user: req.user },
            {
                $pull: {
                    items: { product: id }
                }
            },
            { new: true }
        );

        res.status(200).json({
            message: "Product delete successful",
            userCart
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = cartRouter;