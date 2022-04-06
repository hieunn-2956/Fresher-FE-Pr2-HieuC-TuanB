import { authConstant } from "./constant";

export const loginSuccess = (user) => {
  return {
    type: authConstant.LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailure = (error) => {
  return {
    type: authConstant.LOGIN_FAILURE,
    payload: error,
  };
};

export const loginRequest = (credential) => {
  return {
    type: authConstant.LOGIN_REQUEST,
    payload: credential,
  };
};

export const isUserLoggedIn = () => ({
  type: authConstant.KEEP_LOGIN,
});

export const logOut = () => ({
  type: authConstant.LOG_OUT,
});
