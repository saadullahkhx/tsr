import React from "react";
import "./CartCard.css";
import { ImBin } from "react-icons/im";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CartCard = ({ item }) => {
  const dispatch = useDispatch();
  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty < 1) {
      toast.error("Minimum 1 Quantity is required.");
      return;
    }

    dispatch(addItemToCart(id, newQty));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) {
      toast.error("Maximum stock for this product reached.");
      return;
    }

    dispatch(addItemToCart(id, newQty, stock));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };
  return (
    <div className="cart-card">
      <img src={item.image} alt={item.name} />
      <h4>{item.name}</h4>
      <p className="item-price">PKR.{item.price}/-</p>
      <div className="qty-control">
        <h5>Qty:</h5>
        <button onClick={() => decreaseQty(item.product, item.quantity)}>
          -
        </button>
        <p>{item.quantity}</p>
        <button
          onClick={() => increaseQty(item.product, item.quantity, item.stock)}
        >
          +
        </button>
      </div>
      <ImBin
        className="delete-item-btn"
        onClick={() => removeCartItemHandler(item.product)}
      />
    </div>
  );
};

export default CartCard;
