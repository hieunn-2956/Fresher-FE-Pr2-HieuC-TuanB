import { productsConstant } from "../actions/constant";

const initialState = {
  products: [],
  query: "",
  loading: true,
  loadingSpec: true,
  selectedProduct: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productsConstant.GET_PRODUCTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productsConstant.GET_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
        loading: false,
      };
      break;
    case productsConstant.GET_PRODUCTS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    //  ADD
    case productsConstant.ADD_PRODUCTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productsConstant.ADD_PRODUCTS_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productsConstant.ADD_PRODUCTS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    //  UPDATE
    case productsConstant.UPDATE_PRODUCTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productsConstant.UPDATE_PRODUCTS_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productsConstant.UPDATE_PRODUCTS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;

    // DELETE
    case productsConstant.DELETE_PRODUCTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productsConstant.DELETE_PRODUCTS_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productsConstant.DELETE_PRODUCTS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};
