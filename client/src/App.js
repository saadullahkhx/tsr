import React, { useEffect } from "react";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductPage from "./pages/ProductPage/ProductPage";

import { Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { loadUser } from "./redux/actions/userActions";
import store from "./redux/store";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Cart from "./pages/Cart/Cart";
import Shipping from "./pages/Shipping/Shipping";
import { useSelector } from "react-redux";
import ConfirmOrder from "./pages/ConfirmOrder/ConfirmOrder";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <React.Fragment>
      <Header />
      <div className="App">
        <Route path="/" component={Homepage} exact />
        <Route path="/search/:keyword" component={Homepage} />
        <Route path="/products/:productId" component={ProductPage} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/sign-up" component={Register} exact />
        <Route path="/password/reset/:token" component={ResetPassword} exact />
        <Route path="/cart" component={Cart} exact />
        <Route
          path="/shipping"
          render={() =>
            cartItems.length > 0 ? <Shipping /> : <Redirect to="/" />
          }
          exact
        />
        <Route
          path="/confirm"
          render={() =>
            cartItems.length > 0 ? <ConfirmOrder /> : <Redirect to="/" />
          }
          exact
        />
        <ProtectedRoute path="/profile" component={Profile} exact />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
