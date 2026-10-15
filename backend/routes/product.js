const express = require("express");
const Products = require("../models/Products");

const productRouters = express.Router();

productRouters.post("/add", async (req, res) => {

    const product = await Products.create(req.body);

    res.json(product)
})

module.exports = productRouters;