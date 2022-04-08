import { productsConstant } from "../actions/constant";

const initialState = {
  products: [],
  query: "",
  loading: true,
  loadingSpec: true,
  selectedProduct: {},
  topSales: [],
  loadTopSales: true,
  popTags: [],
  loadPopTags: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productsConstant.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case productsConstant.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        loading: false,
      };

    case productsConstant.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    //  ADD
    case productsConstant.ADD_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case productsConstant.ADD_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case productsConstant.ADD_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    //  UPDATE
    case productsConstant.UPDATE_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case productsConstant.UPDATE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case productsConstant.UPDATE_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    // DELETE
    case productsConstant.DELETE_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case productsConstant.DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case productsConstant.DELETE_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    // CHART

    case productsConstant.GET_TOP_SALE_REQUEST:
      return {
        ...state,
        loadTopSales: true,
      };

    case productsConstant.GET_TOP_SALE_SUCCESS:
      return {
        ...state,
        topSales: action.payload.topSales,
        loadTopSales: false,
      };

    case productsConstant.GET_TOP_SALE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loadTopSales: false,
      };

    case productsConstant.GET_POP_TAG_REQUEST:
      return {
        ...state,
        loadPopTags: true,
      };

    case productsConstant.GET_POP_TAG_SUCCESS:
      return {
        ...state,
        popTags: action.payload.popTags,
        loadPopTags: false,
      };

    case productsConstant.GET_POP_TAG_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loadPopTags: false,
      };
  }
  return state;
};
