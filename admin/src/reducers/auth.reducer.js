import { authConstant } from "../actions/constant";

const initialState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    userName: "",
    dob: "",
    phone: "",
    email: "",
    picture: "",
    isMng: false,
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstant.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstant.LOGIN_FAILURE:
      state = {
        ...state,
        authenticating: false,
        error: action.payload.error,
      };
    case authConstant.LOG_OUT:
      state = initialState;
      break;
  }
  return state;
};

export default authReducer;
