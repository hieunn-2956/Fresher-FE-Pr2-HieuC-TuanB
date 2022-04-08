import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import productsReducer from "./products.reducer";
import ordersReducer from "./order.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  orders: ordersReducer,
});

export default rootReducer;
