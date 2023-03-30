import { Request, Response } from 'express';
import { errorWrapper, productManager } from '../utils';
import { Product } from '../utils/productManager';

const { getProducts, addProduct, removeProduct, replaceProduct } = productManager;

/**
 * Get all products.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /api/products
 */
export const getAllProducts = errorWrapper(async (req: Request, res: Response) => {
  const products = await getProducts();

  // Send products JSON array.
  res.status(200).json(products); // SUCCESS
});

// #################################################################################

/**
 * Add new product.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method POST
 * @route /api/products
 */
export const addNewProduct = errorWrapper(async (req: Request, res: Response) => {
  const products = await getProducts();

  // Form the new product object.
  const lastProductInArray = products[products.length - 1];
  const newProductId = lastProductInArray.productId + 1;

  // Add new product.
  const newProduct = { ...req.body, productId: newProductId };
  await addProduct(newProduct);

  // Send new product JSON.
  res.status(201).json(newProduct); // SUCCESS
});

// #################################################################################

/**
 * Remove a product by ID.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method DELETE
 * @route /api/products/{productId}
 */
export const removeExistingProduct = errorWrapper(async (req: Request, res: Response) => {
  const productId = req.params.productId;

  // Verify request parameter productId exists and is a number.
  if (!productId || isNaN(Number(productId))) {
    res.status(400).send('Missing or malformed parameter "productId" in request path.'); // BAD REQUEST
    return;
  }

  // Remove product.
  await removeProduct(Number(productId));
  res.status(204).send(`Product with productId ${productId} removed.`); // SUCCESS
});

// #################################################################################

/**
 * Edit product with ID.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method PATCH
 * @route /api/products/{productId}
 */
export const editProduct = errorWrapper(async (req: Request, res: Response) => {
  const products = await getProducts();

  const productId = req.params.productId;

  // Verify request parameter productId exists and is a number.
  if (!productId || isNaN(Number(productId))) {
    res.status(400).send('Missing or malformed parameter "productId" in request path.'); // BAD REQUEST
    return;
  }

  // Replace product properties with new properties (filtered to remove productId).
  const filteredReqBody = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => key !== 'productId'),
  );
  const oldProduct = products.find((product) => product.productId === Number(productId));
  const newProduct = { ...oldProduct, ...filteredReqBody };
  await replaceProduct(Number(productId), newProduct as Product);

  // Send new product JSON.
  res.status(201).json(newProduct); // SUCCESS
});
