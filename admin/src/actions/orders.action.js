import { ordersConstant } from "./constant";

export const getOrdersSuccess = (products) => {
  return {
    type: ordersConstant.GET_ORDERS_SUCCESS,
    payload: products,
  };
};

export const getOrdersFailure = (error) => {
  return {
    type: ordersConstant.GET_ORDERS_FAILURE,
    payload: error,
  };
};

export const getOrdresRequest = (query) => {
  return {
    type: ordersConstant.GET_ORDERS_REQUEST,
    payload: query,
  };
};

export const setSelectedOrderRequest = (value) => {
  return {
    type: ordersConstant.SET_SELECTED_ORDER_REQUEST,
    payload: value,
  };
};

export const setSelectedOrderSuccess = (value) => {
  return {
    type: ordersConstant.SET_SELECTED_ORDER_SUCCESS,
    payload: value,
  };
};

export const setSelectedOrderFailure = (error) => {
  return {
    type: ordersConstant.SET_SELECTED_ORDER_FAILURE,
    payload: error,
  };
};

export const updateOrdersSuccess = (products) => {
  return {
    type: ordersConstant.UPDATE_ORDERS_SUCCESS,
    payload: products,
  };
};

export const updateOrdersFailure = (error) => {
  return {
    type: ordersConstant.UPDATE_ORDERS_FAILURE,
    payload: error,
  };
};

export const updateOrdresRequest = (query) => {
  return {
    type: ordersConstant.UPDATE_ORDERS_REQUEST,
    payload: query,
  };
};
