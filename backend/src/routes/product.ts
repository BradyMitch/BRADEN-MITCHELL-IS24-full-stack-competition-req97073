import express from 'express';
const router = express.Router();

import { productController } from '../controllers';
const { getAllProducts, addNewProduct, removeExistingProduct, editProduct } = productController;

/**
 * Get all products.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /api/products
 */
router.get('/', getAllProducts);

/**
 * Add new product.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method POST
 * @route /api/products
 */
router.post('/', addNewProduct);

/**
 * Remove a product by ID.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method DELETE
 * @route /api/products/{productId}
 */
router.delete('/:productId', removeExistingProduct);

/**
 * Edit product with ID.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method PATCH
 * @route /api/products/{productId}
 */
router.patch('/:productId', editProduct);

export default router;
