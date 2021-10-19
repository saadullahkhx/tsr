import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducers,
  productDetailsReducer,
} from "./reducers/productsReducers.js";

import { cartReducer } from "./reducers/cartReducer.js";

import {
  userReducer,
  userProfileReducer,
  forgotPasswordReducer,
} from "./reducers/userReducer.js";

import { newOrderReducer, myOrdersReducer } from "./reducers/ordersReducer";

const reducer = combineReducers({
  products: productsReducers,
  productDetails: productDetailsReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
