import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';

import { ProductsAction, ProductsState, initialState, reducer } from 'services/productsReducer';

// Create an initial context with initialState.
export const ProductsContext = createContext<ProductsState>(initialState);

// Interface that extends the ProductsState interface and adds a dispatch function.
export interface ProductsStateWithDispatch extends ProductsState {
  dispatch: Dispatch<ProductsAction>;
}

interface IProductsProvider {
  children: ReactNode;
}

/**
 * Provides a products context to its children.
 * @param {ReactNode} children - The children components to be wrapped with the products context.
 */
const ProductsProvider = (props: IProductsProvider) => {
  const { children } = props;
  // Initialize the products state and dispatch function using the reducer.
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductsContext.Provider value={{ state, dispatch } as unknown as ProductsStateWithDispatch}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
