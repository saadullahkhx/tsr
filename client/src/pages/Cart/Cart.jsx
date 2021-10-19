import React from "react";
import { useSelector } from "react-redux";
import CartCard from "../../components/CartCard/CartCard";
import MetaData from "../../MetaData";
import "./Cart.css";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 3000 ? 0 : 200;
  const taxPrice = Number((0.17 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);
  return (
    <React.Fragment>
      <MetaData title="Your Cart" />
      <div className="cart-page">
        {cartItems.length === 0 ? (
          <h4>Your Cart is Empty</h4>
        ) : (
          <React.Fragment>
            <div className="cart">
              <h1>Your Cart</h1>
              {cartItems.map((item) => (
                <CartCard key={item.product} item={item} />
              ))}
            </div>
            <OrderSummary
              totalPrice={totalPrice}
              taxPrice={taxPrice}
              shippingPrice={shippingPrice}
              itemsPrice={itemsPrice}
              targetLink="/shipping"
              buttonText="Proceed"
            />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Cart;
