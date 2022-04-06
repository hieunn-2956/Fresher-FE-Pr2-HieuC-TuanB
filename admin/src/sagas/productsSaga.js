import {
  takeEvery,
  select,
  all,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";
import { productsConstant } from "../actions/constant";
import {
  getProductsSuccess,
  getProductsFailure,
  addProductsSuccess,
  addProductsFailure,
  updateProductsRequest,
  updateProductsSuccess,
  updateProductsFailure,
  deleteProductSuccess,
  deleteProductFailure,
} from "../actions";
import axiosInstance from "../helper/axios";
import axios from "axios";

const getProduct = (state) => state.products;

const getProducts = async (query) => {
  const response = await axiosInstance.post(
    "/product/admin/getProductsByQuery",
    {
      query,
    }
  );
  return { products: response.data.products, meta: response.data.meta };
};

const addProduct = async (payload) => {
  await axiosInstance.post("product/admin/create", {
    ...payload,
  });
};

const updateExistedProduct = async (payload) => {
  await axiosInstance.put("/product/admin/update", {
    ...payload,
  });
};

const deleteExistedProduct = async (payload) => {
  const { productId } = payload;
  const res = await axiosInstance.delete(`/product/admin/${productId}`);
};

export function* getProductsByQuery({ payload }) {
  const product = yield select(getProduct);
  const { query, ...rest } = product;

  try {
    const products = yield getProducts(query);
    yield put(getProductsSuccess(products));
  } catch (error) {
    yield put(getProductsFailure(error));
  }
}

export function* addNewProduct({ payload }) {
  try {
    yield addProduct(payload);
    yield put(addProductsSuccess());
  } catch (error) {
    yield put(addProductsFailure(error));
  }
}

export function* updateProduct({ payload }) {
  try {
    yield updateExistedProduct(payload);
    yield put(updateProductsSuccess());
  } catch (error) {
    yield put(updateProductsFailure(error));
  }
}

export function* deleteProduct({ payload }) {
  try {
    yield deleteExistedProduct(payload);
    yield put(deleteProductSuccess());
  } catch (error) {
    yield put(deleteProductFailure(error));
  }
}

export function* onLoadingProducts() {
  yield takeEvery(productsConstant.GET_PRODUCTS_REQUEST, getProductsByQuery);
}

export function* onAddingProduct() {
  yield takeEvery(productsConstant.ADD_PRODUCTS_REQUEST, addNewProduct);
  yield takeEvery(productsConstant.ADD_PRODUCTS_SUCCESS, getProductsByQuery);
}

export function* onUpdateProduct() {
  yield takeEvery(productsConstant.UPDATE_PRODUCTS_REQUEST, updateProduct);
  yield takeEvery(productsConstant.UPDATE_PRODUCTS_SUCCESS, getProductsByQuery);
}

export function* onDeleteProduct() {
  yield takeEvery(productsConstant.DELETE_PRODUCTS_REQUEST, deleteProduct);
  yield takeEvery(productsConstant.DELETE_PRODUCTS_SUCCESS, getProductsByQuery);
}

export function* productsSaga() {
  yield all([
    call(onLoadingProducts),
    call(onAddingProduct),
    call(onUpdateProduct),
    call(onDeleteProduct),
  ]);
}
