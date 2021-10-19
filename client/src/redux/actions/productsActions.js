import axios from "axios";
import {
  REQUEST_ALL_PRODUCTS,
  REQUEST_PRODUCTS_SUCCESS,
  REQUEST_PRODUCTS_FAILURE,
  REQUEST_PRODUCT_DETAILS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  CLEAR_ERRORS,
} from "../constants/productsConstants";

export const getProducts =
  (keyword = "", currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: REQUEST_ALL_PRODUCTS });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}${`${
        category && `&category=${category}`
      }`}`;

      const { data } = await axios.get(link);

      dispatch({ type: REQUEST_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REQUEST_PRODUCTS_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_PRODUCT_DETAILS });

    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

//Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
