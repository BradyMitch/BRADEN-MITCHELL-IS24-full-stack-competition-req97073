import ProductsActionType from './productsActions';
const { GET_PRODUCTS, ADD_PRODUCT, REMOVE_PRODUCT, EDIT_PRODUCT } = ProductsActionType;

export interface ProductState {
  productId: number;
  productName: string;
  productOwnerName: string;
  developers: string[];
  scrumMasterName: string;
  startDate: string;
  methodology: string;
}

export type ProductsState = ProductState[];

export interface ProductsAction {
  type: ProductsActionType;
  payload?: ProductState;
}

// Initial products state.
export const initialState: ProductsState = [];

/**
 * Handles products actions and returns the updated products state.
 * @param {ProductsState} state - The current products state.
 * @param {ProductsAction} action - The products action to be handled.
 * @returns {ProductsState} - The updated products state.
 */
export const reducer = (
  state: ProductsState = initialState,
  action: ProductsAction,
): ProductsState => {
  switch (action.type) {
    case GET_PRODUCTS:
      // Update state with products.
      return action.payload as unknown as ProductsState;
    case ADD_PRODUCT:
      // Add a new product to the state and return the updated state.
      return [...state, action.payload as ProductState];
    case REMOVE_PRODUCT:
      // Remove a product with the matching productId and return the updated state.
      return state.filter((product) => product.productId !== action.payload?.productId);
    case EDIT_PRODUCT:
      // Find a product with the matching productId and update its properties with the payload,
      // then return the updated state.
      return state.map((product) =>
        product.productId === action.payload?.productId
          ? { ...product, ...action.payload }
          : product,
      );
    default:
      throw new Error('Invalid action type.');
  }
};
