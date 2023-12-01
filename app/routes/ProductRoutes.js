const express = require('express');
const router = express.Router();
const ProductService = require('../services/ProductService');

const redisMiddleware = require('../middlewares/RedisMiddleware')

const productService = new ProductService();

router.post('/', productService.createProduct);
router.get('/', productService.getAllProducts);
router.get('/:name',  redisMiddleware.cacheMiddleware, productService.getProductByName);
router.delete('/', productService.deleteAllProducts);
router.get('/search/:name', productService.getProductByName);
router.put('/:name', productService.updateProduct)

module.exports = router;