// Require model product (file: product.model.js)
const Product = require('../models/product.model');

// Index controller
module.exports.index = async function (req, res) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

// Detail controller
module.exports.detail = async function (req, res) {
    const id = req.params.id;
    const filter = { _id: id };
    try {
        const product = await Product.findOne(filter);
        res.json(product);
    } catch {
        const errors = { msg: "Get Detail: Product does not exist" };
        res.status(400).json({ errors });
    }
};

// Create controller
module.exports.create = async function (req, res) {
    let product = new Product({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
    });
    try {
        const newProduct = await product.save();
        res.status(201).json({ newProduct });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update controller
module.exports.update = async function (req, res) {
    const id = req.params.id;
    const filter = { _id: id };
    const update = req.body;
    try {
        const updatedProduct = await Product.findOneAndUpdate(filter, update, {
            new: true
        });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Patch Update controller
module.exports.patchUpdate = async function (req, res) {
    const id = req.params.id;
    const filter = { _id: id };
    try {
        const updatedProduct = await Product.findOne(filter);
        if (req.body.image) {
            updatedProduct.image = req.body.image;
        }

        if (req.body.price) {
            updatedProduct.price = req.body.price;
        }
        await updatedProduct.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete controller
module.exports.delete = async function (req, res) {
    const id = req.params.id;
    const filter = { _id: id };
    try {
        await Product.deleteOne(filter);
        const successMsg = { msg: "Product has been deleted"};
        res.status(204).json({ message: successMsg });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};