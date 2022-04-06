import { productsConstant } from "./constant";

export const getProductsSuccess = (products) => {
  return {
    type: productsConstant.GET_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const getProductsFailure = (error) => {
  return {
    type: productsConstant.GET_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const getProductsRequest = (query) => {
  return {
    type: productsConstant.GET_PRODUCTS_REQUEST,
    payload: query,
  };
};

export const addProductsSuccess = (products) => {
  return {
    type: productsConstant.ADD_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const addProductsFailure = (error) => {
  return {
    type: productsConstant.ADD_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const addProductsRequest = (form) => {
  return {
    type: productsConstant.ADD_PRODUCTS_REQUEST,
    payload: form,
  };
};

export const updateProductsSuccess = (products) => {
  return {
    type: productsConstant.UPDATE_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const updateProductsFailure = (error) => {
  return {
    type: productsConstant.UPDATE_PRODUCTS_SUCCESS,
    payload: error,
  };
};

export const updateProductsRequest = (form) => {
  return {
    type: productsConstant.UPDATE_PRODUCTS_REQUEST,
    payload: form,
  };
};

export const deleteProductSuccess = (products) => {
  return {
    type: productsConstant.DELETE_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const deleteProductFailure = (error) => {
  return {
    type: productsConstant.DELETE_PRODUCTS_SUCCESS,
    payload: error,
  };
};

export const deleteProductRequest = (productId) => {
  return {
    type: productsConstant.DELETE_PRODUCTS_REQUEST,
    payload: productId,
  };
};
