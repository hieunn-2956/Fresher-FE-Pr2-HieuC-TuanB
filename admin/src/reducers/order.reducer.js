import { ordersConstant } from "../actions/constant";

const initialState = {
  orders: [],
  selectedOrder: {},
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ordersConstant.GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ordersConstant.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        loading: false,
      };
    case ordersConstant.GET_ORDERS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    // SET_SELECTED
    case ordersConstant.SET_SELECTED_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ordersConstant.SET_SELECTED_ORDER_SUCCESS:
      return {
        ...state,
        selectedOrder: action.payload.selectedOrder,
        loading: false,
      };
    case ordersConstant.SET_SELECTED_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    // UPDATE
    case ordersConstant.UPDATE_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ordersConstant.UPDATE_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ordersConstant.UPDATE_ORDERS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
  }
  return state;
};
