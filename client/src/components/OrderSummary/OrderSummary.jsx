import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import { useHistory } from "react-router";
import "./OrderSummary.css";

const OrderSummary = ({
  totalPrice,
  taxPrice,
  itemsPrice,
  shippingPrice,
  targetLink,
  buttonText,
  handler,
  ...otherProps
}) => {
  const history = useHistory();

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div>
        <p>Subtotal:</p>
        <strong>PKR.{itemsPrice}</strong>
      </div>
      <div>
        <p>Shipping:</p>
        <strong>PKR. {shippingPrice}/-</strong>
      </div>
      <div>
        <p>Tax:</p>
        <strong>PKR. {taxPrice}/-</strong>
      </div>
      <div>
        <strong>Total:</strong>
        <strong>PKR. {totalPrice}/-</strong>
      </div>
      <CustomButton
        onClick={targetLink ? () => history.push(`${targetLink}`) : handler}
        {...otherProps}
      >
        {buttonText}
      </CustomButton>
    </div>
  );
};

export default OrderSummary;
