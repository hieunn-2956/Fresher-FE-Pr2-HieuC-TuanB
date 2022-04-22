import {
  takeEvery,
  select,
  all,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";
import { KEEP_LOGIN, LOGIN_REQUEST, LOG_OUT } from "../actions/constant";
import { loginSuccess, loginFailure } from "../actions";
import axiosInstance from "../helper/axios";
import toast from "react-hot-toast";

const logIn = async (user) => {
  const response = await axiosInstance.post("/admin/login", {
    ...user,
  });
  return {
    token: response.data.token,
    user: response.data.user,
    expiresIn: response.data.expiresIn.then,
  };
};

export function* logInWithCredentials({ payload: { email, password } }) {
  try {
    const user = yield logIn({ email, password });
    yield put(loginSuccess(user));
    toast.success("Logged In");
    localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user.user));
  } catch (error) {
    const { response } = error;
    toast.error(`${response.data.error}`);
    yield put(loginFailure(error));
  }
}

export function* isUserAlreadyLoggedIn() {
  const token = localStorage.getItem("token");
  if (token) {
    const user = JSON.parse(localStorage.getItem("user"));
    yield put(loginSuccess({ token, user }));
  } else {
    yield put(loginFailure({ error: "Login failed" }));
  }
}

export function* logoutRequest() {
  localStorage.clear();
}

export function* onLogInStart() {
  yield takeLatest(LOGIN_REQUEST, logInWithCredentials);
}

export function* isUserLoggedIn() {
  yield takeEvery(KEEP_LOGIN, isUserAlreadyLoggedIn);
}

export function* onLogOut() {
  yield takeEvery(LOG_OUT, logoutRequest);
}

export function* authSagas() {
  yield all([call(onLogInStart), call(isUserLoggedIn), call(onLogOut)]);
}
