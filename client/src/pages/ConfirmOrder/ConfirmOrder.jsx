import React, { useEffect } from "react";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { useSelector, useDispatch } from "react-redux";
import {
  createOrder,
  createUnAuthOrder,
  clearErrors,
} from "../../redux/actions/ordersActions";
import "./ConfirmOrder.css";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { clearCart } from "../../redux/actions/cartActions";

const ConfirmOrder = () => {
  const { error } = useSelector((state) => state.newOrder);

  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 3000 ? 0 : 200;
  const taxPrice = Number((0.17 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  // const proceedToPayment = () => {
  //   const data = {
  //     itemsPrice: itemsPrice.toFixed(2),
  //     shippingPrice,
  //     taxPrice,
  //     totalPrice,
  //   };

  //   sessionStorage.setItem("orderInfo", JSON.stringify(data));
  //   history.push("/");
  // };

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };

  const submitOrder = () => {
    if (user) {
      dispatch(createOrder(order));
    } else {
      dispatch(createUnAuthOrder(order));
    }

    dispatch(clearCart());

    toast.success("Order placed!");
    history.push("/");
  };
  return (
    <div className="confirm-order-page">
      <div className="shipping-info">
        <strong style={{ fontSize: "13px" }}>
          *Please note that we are currently operating in Pakistan and accepting
          payments via Cash On Delivery only!
        </strong>
        <h2>Your Details</h2>
        <div>
          <strong>Name: </strong>
          <p>{shippingInfo.name}</p>
        </div>
        <div>
          <strong>Phone: </strong>
          <p>{shippingInfo.phoneNo}</p>
        </div>
        <div>
          <strong>Address: </strong>
          <p>{shippingInfo.address}</p>
        </div>
      </div>
      <OrderSummary
        totalPrice={totalPrice}
        taxPrice={taxPrice}
        shippingPrice={shippingPrice}
        itemsPrice={itemsPrice}
        buttonText="Place Order"
        handler={submitOrder}
      />
    </div>
  );
};

export default ConfirmOrder;
