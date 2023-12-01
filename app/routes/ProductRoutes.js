const express = require('express');
const router = express.Router();
const ProductService = require('../services/ProductService');

const productService = new ProductService();

router.post('/', productService.createProduct);
router.get('/', productService.getAllProducts);
router.get('/:id', productService.getProductById);
router.delete('/', productService.deleteAllProducts);
router.get('/search/:name', productService.getProductByName);

module.exports = router;