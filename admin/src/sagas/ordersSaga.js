import {
  takeEvery,
  select,
  all,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";
import { ordersConstant } from "../actions/constant";
import {
  getOrdersFailure,
  getOrdersSuccess,
  setSelectedOrderFailure,
  setSelectedOrderSuccess,
  updateOrdersFailure,
  updateOrdersSuccess,
} from "../actions";
import axiosInstance from "../helper/axios";

const getOrder = (state) => state.orders;

const getOrders = async () => {
  const response = await axiosInstance.get("order/admin/getCustomerOrders");
  return { orders: response.data.orders };
};

const updateOrder = async (payload) => {
  await axiosInstance.post("order/admin/update", payload);
};

const getOrderById = async (orderId) => {
  const response = await axiosInstance.get(`order/admin/${orderId}`);
  return { selectedOrder: response.data.order };
};

export function* getCustomerOrders({ payload }) {
  try {
    const orders = yield getOrders();
    yield put(getOrdersSuccess(orders));
  } catch (error) {
    yield put(getOrdersFailure(error));
  }
}

export function* updateCustomerOrder({ payload }) {
  const order = yield select(getOrder);
  console.log(order);
  const { selectedOrder } = order;
  try {
    yield updateOrder(payload);
    yield put(updateOrdersSuccess());
  } catch (error) {
    yield put(updateOrdersFailure(error));
  }
}

export function* setSelectedOrder({ payload: orderId }) {
  const order = yield select(getOrder);
  const { selectedOrder } = order;
  const orderIdParams = selectedOrder._id ? selectedOrder._id : orderId;
  try {
    const selectedOrder = yield getOrderById(orderIdParams);
    yield put(setSelectedOrderSuccess(selectedOrder));
  } catch (error) {
    yield put(setSelectedOrderFailure(error));
  }
}

export function* onLoadingOrders() {
  yield takeEvery(ordersConstant.GET_ORDERS_REQUEST, getCustomerOrders);
}

export function* onSetSelectedOrder() {
  yield takeLatest(ordersConstant.SET_SELECTED_ORDER_REQUEST, setSelectedOrder);
}

export function* onUpdateOrder() {
  yield takeEvery(ordersConstant.UPDATE_ORDERS_REQUEST, updateCustomerOrder);
  yield takeEvery(ordersConstant.UPDATE_ORDERS_SUCCESS, setSelectedOrder);
}

export function* ordersSaga() {
  yield all([
    call(onLoadingOrders),
    call(onSetSelectedOrder),
    call(onUpdateOrder),
  ]);
}
