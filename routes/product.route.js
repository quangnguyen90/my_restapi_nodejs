const express = require('express');
// Require controller (file: controllers/product.controller.js)
const controller = require('../controllers/product.controller');
// Require product middleware (file: product.middleware.js)
const productMiddleware = require('../middlewares/product.middleware');

const router = express.Router();

/**
 * REST API OF PRODUCT
 * */
// Get All
router.get('/', controller.index);

// Detail
router.get(
    '/detail/:id',
    productMiddleware.checkProduct,
    controller.detail
);

// Create
router.post('/create', controller.create);

// Update
router.put(
    '/update/:id',
    productMiddleware.checkProduct,
    controller.update
);

// Patch update
router.patch(
    '/patch/:id',
    productMiddleware.checkProduct,
    controller.patchUpdate
);

// Delete
router.delete(
    '/delete/:id',
    productMiddleware.checkProduct,
    controller.delete
);

module.exports = router;