import {
  REQUEST_ALL_PRODUCTS,
  REQUEST_PRODUCTS_SUCCESS,
  REQUEST_PRODUCTS_FAILURE,
  REQUEST_PRODUCT_DETAILS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  CLEAR_ERRORS,
} from "../constants/productsConstants";

export const productsReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case REQUEST_ALL_PRODUCTS:
      return {
        loading: true,
        products: [],
      };

    case REQUEST_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts,
        resultsPerPage: action.payload.resultsPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };

    case REQUEST_PRODUCTS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case REQUEST_PRODUCT_DETAILS:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
