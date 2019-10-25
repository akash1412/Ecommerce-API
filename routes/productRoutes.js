const productsController = require('../controllers/productsController')
const authController = require('./../controllers/authController')

const express = require('express');

const router = express.Router();



router
    .route('/')
    .get(authController.protect, productsController.getProducts)
    .post(productsController.addProduct);


router
    .route('/:id')
    .get(productsController.getProduct)
    .patch(productsController.updateProduct)
    .delete(productsController.deleteProduct)


module.exports = router;