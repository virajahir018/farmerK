const express = require("express");
const Product = require("../models/Products");

const productRouters = express.Router();

productRouters.post("/add", async (req, res) => {
    const product = await Product.create(req.body);

    res.json(product)
})

module.exports = productRouters;