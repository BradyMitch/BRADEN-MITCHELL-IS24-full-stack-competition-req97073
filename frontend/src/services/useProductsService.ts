import { useContext, useMemo } from 'react';

import { ProductsContext } from 'providers/ProductsProvider';
import ProductsActionType from './productsActions';
import { ProductState } from './productsReducer';

const { GET_PRODUCTS, ADD_PRODUCT, REMOVE_PRODUCT, EDIT_PRODUCT } = ProductsActionType;

/**
 * A custom hook that provides products-related functionality to other components.
 * @returns {Object} - An object containing products-related functions and the current products state.
 */
const useProductsService = () => {
  // Get the products state and dispatch function from the products context.
  const { state, dispatch } = useContext<any>(ProductsContext);

  // Use useMemo to memoize the returned object and prevent unnecessary re-renders.
  return useMemo(() => {
    /**
     * Get all products.
     * @payload - A json array of type ProductsState.
     */
    const getProducts = async () => {
      try {
        const response = await fetch(`/api/products`);
        const data = await response.json();
        dispatch({ type: GET_PRODUCTS, payload: data });
      } catch (error) {
        console.error(error);
      }
    };

    /**
     * Add a new product.
     * @param {ProductState} newProduct - The product to be added to state.
     * @payload - A json object of type ProductState.
     */
    const addProduct = async (newProduct: ProductState) => {
      try {
        const response = await fetch(`/api/products`, {
          method: 'POST',
          body: JSON.stringify(newProduct),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        dispatch({ type: ADD_PRODUCT, payload: data });
      } catch (error) {
        console.error(error);
      }
    };

    /**
     * Remove an existing product.
     * @param {number} productId - The ID of the product to be removed.
     * @payload - The productId of the product to be removed.
     */
    const removeProduct = async (productId: number) => {
      try {
        await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
        });
        dispatch({ type: REMOVE_PRODUCT, payload: productId });
      } catch (error) {
        console.error(error);
      }
    };

    /**
     * Edit an existing product.
     * @param {number} productId - The ID of the product to be edited.
     * @param {Partial<ProductState>} updatedProduct - The product properties to be edited.
     * @payload - The productId of the product to be edited.
     */
    const editProduct = async (productId: number, updatedProduct: Partial<ProductState>) => {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'PATCH',
          body: JSON.stringify(updatedProduct),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        dispatch({ type: EDIT_PRODUCT, payload: data });
      } catch (error) {
        console.error(error);
      }
    };

    return {
      getProducts,
      addProduct,
      removeProduct,
      editProduct,
      state,
    };
  }, [state]);
};

export default useProductsService;
