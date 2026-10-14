
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            // required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        availability: {
            type: Boolean,
            default: true,
        },

        image: {
            type: String,
            required: true
        },

        imageId: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product