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
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductsList from "./components/ProductsList/ProductsList";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";
import OrdersList from "./pages/OrdersList/OrdersList";
import UpdateOrder from "./pages/UpdateOrder/UpdateOrder";
import UsersList from "./pages/UsersList/UsersList";
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import ProductReviews from "./pages/ProductReviews/ProductReviews";

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
        <ProtectedRoute
          path="/admin/orders"
          isAdmin={true}
          component={OrdersList}
          exact
        />
        <ProtectedRoute
          path="/admin/user/update/:id"
          isAdmin={true}
          component={UpdateUser}
          exact
        />

        <ProtectedRoute
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
          exact
        />
        <ProtectedRoute
          path="/admin/dashboard"
          isAdmin={true}
          component={Dashboard}
          exact
        />
        <ProtectedRoute
          path="/admin/product/update/:id"
          isAdmin={true}
          component={UpdateProduct}
          exact
        />
        <ProtectedRoute
          path="/admin/products"
          isAdmin={true}
          component={ProductsList}
          exact
        />
        <ProtectedRoute
          path="/admin/order/update/:id"
          component={UpdateOrder}
          isAdmin={true}
          exact
        />
        <ProtectedRoute
          path="/admin/users"
          component={UsersList}
          isAdmin={true}
          exact
        />

        <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
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
