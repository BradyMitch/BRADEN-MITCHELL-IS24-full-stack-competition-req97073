import fs from 'fs';
import HttpError from './HttpError';

// Location of the products JSON array file.
const PRODUCTS_JSON_PATH = 'src/data/products.json';

export interface Product {
  productId: number;
  productName: string;
  productOwnerName: string;
  developers: string[];
  scrumMasterName: string;
  startDate: string;
  methodology: string;
}

/**
 * Get all products from the data file.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @returns {Promise<Product[]>} A promise that resolves with an array of products.
 */
export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(PRODUCTS_JSON_PATH, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        try {
          const products = JSON.parse(data);
          resolve(products); // Promise Fulfilled.
        } catch (error) {
          reject(error); // Promise Failed.
        }
      }
    });
  });
};

/**
 * Save products to the data file.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {Product[]} products - An array of products to be saved.
 * @returns {Promise<void>} A promise that resolves with no value.
 */
const saveProducts = (products: Product[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(PRODUCTS_JSON_PATH, JSON.stringify(products, null, 2), (error) => {
      if (error) {
        reject(error); // Promise Failed.
      } else {
        resolve(); // Promise Fulfilled.
      }
    });
  });
};

/**
 * Add a product to the data file.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {Product} product - The product to be added.
 * @returns {Promise<void>} A promise that resolves with no value.
 */
export const addProduct = async (product: Product): Promise<void> => {
  const products = await getProducts();
  products.push(product);
  await saveProducts(products);
};

/**
 * Remove a product from the data file.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {number} productId - The ID of the product to be removed.
 * @returns {Promise<void>} A promise that resolves with no value.
 * @throws {HttpError} If the product with the specified ID is not found.
 */
export const removeProduct = async (productId: number): Promise<void> => {
  const products = await getProducts();
  const index = products.findIndex((product) => product.productId === productId);
  if (index === -1) throw new HttpError(`Product with ID ${productId} was not found.`, 404);
  products.splice(index, 1);
  await saveProducts(products);
};

/**
 * Replace a product in the data file.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {number} productId - The ID of the product to be replaced.
 * @param {Product} updatedProduct - The updated product object to replace the existing one.
 * @returns {Promise<void>} A promise that resolves with no value.
 * @throws {HttpError} If the product with the specified ID is not found.
 */
export const replaceProduct = async (productId: number, updatedProduct: Product): Promise<void> => {
  const products = await getProducts();
  const productIndex = products.findIndex((product) => product.productId === productId);
  if (productIndex === -1) throw new HttpError(`Product with ID ${productId} was not found.`, 404);
  products.splice(productIndex, 1, updatedProduct);
  await saveProducts(products);
};
