// Require model product (file: product.model.js)
const Product = require('../models/product.model');

// Check if product existed or not
module.exports.checkProduct = async function (req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: "Cannot find Product" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.product = product;
    next();
}