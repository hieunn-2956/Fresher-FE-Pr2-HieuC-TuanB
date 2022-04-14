import {
  ADD_PRODUCTS_FAILURE,
  ADD_PRODUCTS_REQUEST,
  ADD_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAILURE,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  GET_POP_TAG_FAILURE,
  GET_POP_TAG_REQUEST,
  GET_POP_TAG_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_TOP_SALE_FAILURE,
  GET_TOP_SALE_REQUEST,
  GET_TOP_SALE_SUCCESS,
  UPDATE_PRODUCTS_FAILURE,
  UPDATE_PRODUCTS_REQUEST,
  UPDATE_PRODUCTS_SUCCESS,
} from "./constant";

export const getProductsSuccess = (products) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const getProductsFailure = (error) => {
  return {
    type: GET_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const getProductByIdRequest = (query) => {
  return {
    type: GET_PRODUCT_BY_ID_REQUEST,
    payload: query,
  };
};

export const getProductByIdSuccess = (product) => {
  return {
    type: GET_PRODUCT_BY_ID_SUCCESS,
    payload: product,
  };
};

export const getProductByIdFailure = (error) => {
  return {
    type: GET_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const getProductsRequest = (query) => {
  return {
    type: GET_PRODUCTS_REQUEST,
    payload: query,
  };
};

export const addProductsSuccess = (products) => {
  return {
    type: ADD_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const addProductsFailure = (error) => {
  return {
    type: ADD_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const addProductsRequest = (form) => {
  return {
    type: ADD_PRODUCTS_REQUEST,
    payload: form,
  };
};

export const updateProductsSuccess = (products) => {
  return {
    type: UPDATE_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const updateProductsFailure = (error) => {
  return {
    type: UPDATE_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const updateProductsRequest = (form) => {
  return {
    type: UPDATE_PRODUCTS_REQUEST,
    payload: form,
  };
};

export const deleteProductSuccess = (products) => {
  return {
    type: DELETE_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const deleteProductFailure = (error) => {
  return {
    type: DELETE_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const deleteProductRequest = (productId) => {
  return {
    type: DELETE_PRODUCTS_REQUEST,
    payload: productId,
  };
};

export const getTopSalesSuccess = (data) => {
  return {
    type: GET_TOP_SALE_SUCCESS,
    payload: data,
  };
};

export const getTopSalesFailure = (error) => {
  return {
    type: GET_TOP_SALE_FAILURE,
    payload: error,
  };
};

export const getTopSalesRequest = (payload) => {
  return {
    type: GET_TOP_SALE_REQUEST,
    payload: payload,
  };
};

export const getPopTagSuccess = (data) => {
  return {
    type: GET_POP_TAG_SUCCESS,
    payload: data,
  };
};

export const getPopTagFailure = (error) => {
  return {
    type: GET_POP_TAG_FAILURE,
    payload: error,
  };
};

export const getPopTagRequest = (payload) => {
  return {
    type: GET_POP_TAG_REQUEST,
    payload: payload,
  };
};
