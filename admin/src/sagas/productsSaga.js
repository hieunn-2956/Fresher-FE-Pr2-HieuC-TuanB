import {
  takeEvery,
  select,
  all,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";
import {
  ADD_PRODUCTS_REQUEST,
  ADD_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  GET_POP_TAG_REQUEST,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_TOP_SALE_REQUEST,
  UPDATE_PRODUCTS_REQUEST,
  UPDATE_PRODUCTS_SUCCESS,
} from "../actions/constant";
import {
  getProductsSuccess,
  getProductsFailure,
  addProductsSuccess,
  addProductsFailure,
  updateProductsSuccess,
  updateProductsFailure,
  deleteProductSuccess,
  deleteProductFailure,
  getProductByIdSuccess,
  getProductByIdFailure,
  getTopSalesSuccess,
  getTopSalesFailure,
  getPopTagSuccess,
  getPopTagFailure,
} from "../actions";
import axiosInstance from "../helper/axios";

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

const getProductById = async (productId) => {
  const response = await axiosInstance.get(`product/admin/${productId}`);
  return { product: response.data };
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

const getTopSales = async (payload) => {
  const response = await axiosInstance.post("summary/getBestSalesProduct", {
    ...payload,
  });
  return { topSales: response.data.results };
};

const getPopTags = async (payload) => {
  const response = await axiosInstance.post("summary/getPopulateTags", {
    ...payload,
  });
  return { popTags: response.data.results };
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

export function* getProductDetailsById({ payload }) {
  try {
    const product = yield getProductById(payload);
    yield put(getProductByIdSuccess(product));
  } catch (error) {
    yield put(getProductByIdFailure(error));
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

export function* getTopSalesProduct({ payload }) {
  try {
    const topSales = yield getTopSales(payload);
    yield put(getTopSalesSuccess(topSales));
  } catch (error) {
    yield put(getTopSalesFailure(error));
  }
}

export function* getPopularTag({ payload }) {
  try {
    const popTags = yield getPopTags(payload);
    yield put(getPopTagSuccess(popTags));
  } catch (error) {
    yield put(getPopTagFailure(error));
  }
}

export function* onLoadingProducts() {
  yield takeEvery(GET_PRODUCTS_REQUEST, getProductsByQuery);
}

export function* onLoadingProductDetails() {
  yield takeLatest(GET_PRODUCT_BY_ID_REQUEST, getProductDetailsById);
}

export function* onAddingProduct() {
  yield takeEvery(ADD_PRODUCTS_REQUEST, addNewProduct);
  yield takeEvery(ADD_PRODUCTS_SUCCESS, getProductsByQuery);
}

export function* onUpdateProduct() {
  yield takeEvery(UPDATE_PRODUCTS_REQUEST, updateProduct);
  yield takeEvery(UPDATE_PRODUCTS_SUCCESS, getProductsByQuery);
}

export function* onDeleteProduct() {
  yield takeEvery(DELETE_PRODUCTS_REQUEST, deleteProduct);
  yield takeEvery(DELETE_PRODUCTS_SUCCESS, getProductsByQuery);
}

export function* onLoadingTopSales() {
  yield takeLatest(GET_TOP_SALE_REQUEST, getTopSalesProduct);
}

export function* onLoadingPopTag() {
  yield takeLatest(GET_POP_TAG_REQUEST, getPopularTag);
}

export function* productsSaga() {
  yield all([
    call(onLoadingProducts),
    call(onLoadingProductDetails),
    call(onAddingProduct),
    call(onUpdateProduct),
    call(onDeleteProduct),
    call(onLoadingTopSales),
    call(onLoadingPopTag),
  ]);
}
