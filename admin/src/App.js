import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Order from "./pages/Order";
import OrderDetails from "./pages/Order/components/OrderDetails";
import ProductDetails from "./pages/Products/components/ProductDetail";
import Login from "./pages/Login";
import { isUserLoggedIn, logOut } from "./actions";

import "./App.scss";
import { useEffect } from "react";
import AdminManager from "./pages/Admin";
import EditAdmin from "./pages/Admin/EditAdmin";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticate, expiresIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [isAuthenticate]);

  useEffect(() => {
    if (expiresIn < new Date().getTime()) {
      dispatch(logOut());
    }
  }, []);

  return (
    <div className='App'>
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:productId' element={<ProductDetails />} />
          <Route path='/order' element={<Order />} />
          <Route path='/admin' element={<AdminManager />} />
          <Route path='/admin/:userId' element={<EditAdmin />} />
          <Route path='/order/:orderId' element={<OrderDetails />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
