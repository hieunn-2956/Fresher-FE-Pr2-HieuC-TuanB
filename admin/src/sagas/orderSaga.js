import {
  takeEvery,
  select,
  all,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";
import {
  GET_ORDERS_REQUEST,
  GET_ORDER_DETAIL_REQUEST,
  GET_SALE_BY_DAY_REQUEST,
  GET_SALE_BY_MONTH_REQUEST,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "../actions/constant";
import {
  getOrderDetailFailure,
  getOrderDetailSuccess,
  getOrdersFailure,
  getOrdersSuccess,
  getSalesByDaySuccess,
  getSalesByDayFailure,
  getSalesByMonthFailure,
  getSalesByMonthSuccess,
  updateOrdersFailure,
  updateOrdersSuccess,
} from "../actions";
import axiosInstance from "../helper/axios";
import toast from "react-hot-toast";

const getOrder = (state) => state.orders;

const getOrders = async () => {
  const response = await axiosInstance.get("order/admin/getCustomerOrders");
  return { orders: response.data.orders };
};

const getOrderById = async (orderId) => {
  const response = await axiosInstance.get(`order/admin/${orderId}`);
  return { orderDetails: response.data.order };
};

const updateOrder = async (payload) => {
  const response = await axiosInstance.put("order/admin/update", payload);
  return { message: response.data.message };
};

const fetchSalesByDay = async (payload) => {
  const response = await axiosInstance.post("summary/getSalesByDay", {
    ...payload,
  });
  return { salesByDay: response.data.results };
};

const fetchSalesByMonth = async (payload) => {
  const response = await axiosInstance.get("summary/getSalesByMonth", {
    ...payload,
  });
  return { salesByMonth: response.data.results };
};

export function* getCustomerOrders({ payload }) {
  try {
    const orders = yield getOrders();
    yield put(getOrdersSuccess(orders));
  } catch (error) {
    yield put(getOrdersFailure(error));
  }
}

export function* getOrderDetails({ payload: orderId }) {
  const order = yield select(getOrder);
  const { orderDetails } = order;
  const orderIdParams = orderId || orderDetails._id;
  try {
    const orderDetails = yield getOrderById(orderIdParams);
    yield put(getOrderDetailSuccess(orderDetails));
  } catch (error) {
    yield put(getOrderDetailFailure(error));
  }
}

export function* updateCustomerOrder({ payload }) {
  try {
    const { message } = yield updateOrder(payload);
    yield put(updateOrdersSuccess());
    toast.success(message);
  } catch (error) {
    const { response } = error;
    yield put(updateOrdersFailure(error));
    toast.error(response.data.error);
  }
}
export function* getSalesByDay({ payload }) {
  try {
    const salesByDay = yield fetchSalesByDay(payload);
    yield put(getSalesByDaySuccess(salesByDay));
  } catch (error) {
    yield put(getSalesByDayFailure(error));
  }
}

export function* getSalesByMonth({ payload }) {
  try {
    const salesByMonth = yield fetchSalesByMonth(payload);
    yield put(getSalesByMonthSuccess(salesByMonth));
  } catch (error) {
    yield put(getSalesByMonthFailure(error));
  }
}

export function* onLoadingOrders() {
  yield takeEvery(GET_ORDERS_REQUEST, getCustomerOrders);
}

export function* onLoadingOrderDetails() {
  yield takeEvery(GET_ORDER_DETAIL_REQUEST, getOrderDetails);
}

export function* onUpdateOrder() {
  yield takeEvery(UPDATE_ORDER_REQUEST, updateCustomerOrder);
  yield takeEvery(UPDATE_ORDER_SUCCESS, getOrderDetails);
}

export function* onLoadingSalesByDay() {
  yield takeLatest(GET_SALE_BY_DAY_REQUEST, getSalesByDay);
}

export function* onLoadingSalesByMonth() {
  yield takeLatest(GET_SALE_BY_MONTH_REQUEST, getSalesByMonth);
}

export function* ordersSaga() {
  yield all([
    call(onLoadingOrders),
    call(onLoadingOrderDetails),
    call(onUpdateOrder),
    call(onLoadingSalesByDay),
    call(onLoadingSalesByMonth),
  ]);
}
