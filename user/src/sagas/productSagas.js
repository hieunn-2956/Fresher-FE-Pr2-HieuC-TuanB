import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  GET_PRODUCT_HOT_REQUEST,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST,
} from "../actions/constant";
import {
  getProductHotFailure,
  getProductHotSuccess,
  getProductFailure,
  getProductSuccess,
  getProductByIdSuccess,
  getProductByIdFailure,
} from "../actions/products.action";
import axiosInstance from "../helper/axios";

const fetchHotProducts = async () => {
  const response = await axiosInstance.get("/product/isHot");
  return { products: response.data.products };
};

const fetchProducts = async (query) => {
  const response = await axiosInstance.get("/product", {
    params: query,
  });
  return {
    products: response.data.docs,
    pagination: {
      _page: response.data.page,
      _limit: response.data.limit,
      _totalRows: response.data.totalDocs,
    },
  };
};

const fetchProductById = async (productId) => {
  const {
    data: { product },
  } = await axiosInstance.get(`product/${productId}`);
  return product;
};

export function* getHotProducts() {
  try {
    const products = yield fetchHotProducts();
    yield put(getProductHotSuccess(products));
  } catch (error) {
    yield put(getProductHotFailure(error));
  }
}

export function* getProducts({ payload }) {
  try {
    const data = yield fetchProducts(payload);
    yield put(getProductSuccess(data));
  } catch (error) {
    yield put(getProductFailure(error));
  }
}

export function* getProductById({ payload }) {
  try {
    const product = yield fetchProductById(payload);
    yield put(getProductByIdSuccess(product));
  } catch (error) {
    yield put(getProductByIdFailure(error));
  }
}

export function* onLoadingHotProducts() {
  yield takeEvery(GET_PRODUCT_HOT_REQUEST, getHotProducts);
}

export function* onLoadingProducts() {
  yield takeEvery(GET_PRODUCT_REQUEST, getProducts);
}

export function* onLoadingProductById() {
  yield takeLatest(GET_PRODUCT_BY_ID_REQUEST, getProductById);
}

export function* productsSaga() {
  yield all([
    call(onLoadingHotProducts),
    call(onLoadingProducts),
    call(onLoadingProductById),
  ]);
}
