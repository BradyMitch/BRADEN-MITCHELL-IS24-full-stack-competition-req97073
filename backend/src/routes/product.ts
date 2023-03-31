import express from 'express';
const router = express.Router();

import { productController } from '../controllers';
const { getAllProducts, addNewProduct, removeExistingProduct, editProduct, replaceProduct } =
  productController;

/**
 * Get all products.
 * @method GET
 * @route /api/products
 */
router.get('/', getAllProducts);

/**
 * Add new product.
 * @method POST
 * @route /api/products
 */
router.post('/', addNewProduct);

/**
 * Remove a product by ID.
 * @method DELETE
 * @route /api/products/{productId}
 */
router.delete('/:productId', removeExistingProduct);

/**
 * Edit product with ID.
 * @method PATCH
 * @route /api/products/{productId}
 */
router.patch('/:productId', editProduct);

/**
 * Replace product with ID.
 * (NOT USED IN FRONTEND IMPLEMENTATION - PATCH IS PREFERRED)
 * @method PUT
 * @route /api/products/{productId}
 */
router.put('/:productId', replaceProduct);

export default router;
