import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./components/HOC/PrivateRoutes";
import { useDispatch, useSelector } from "react-redux";

import Home from "./containers/Home";
import Products from "./containers/Products";
import Login from "./containers/Login";
import { isUserLoggedIn } from "./actions";

import "./App.scss";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  return (
    <div class='App'>
      <Routes>
        <Route
          path='/'
          exact
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='/products'
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
