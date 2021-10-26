import React, { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import MetaData from "../../MetaData";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  clearErrors,
} from "../../redux/actions/ordersActions";
import "./OrderDetails.css";

const OrderDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, error, order } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, match.params.id, error]);

  return (
    <React.Fragment>
      <MetaData title="Order Details" />

      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className="order-details-page">
            <h2>Order # {order._id}</h2>

            <div className="order-shipping-info">
              <h3>Shipping Info</h3>
              <div>
                <strong>Name:</strong>
                <p>{order.shippingInfo.name}</p>
              </div>
              <div>
                <strong>Phone:</strong>
                <p>{order.shippingInfo.phoneNo}</p>
              </div>
              <div>
                <strong>Address:</strong>
                <p>{`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.postalCode}`}</p>
              </div>
              <div>
                <strong>Total Amount:</strong>
                <p>PKR. {order.totalPrice}/-</p>
              </div>
            </div>
            <div className="order-page-status">
              <h3>Order Status</h3>
              {order.orderStatus &&
              String(order.orderStatus).includes("Delivered") ? (
                <p style={{ color: "green" }}>{order.orderStatus}</p>
              ) : (
                <p style={{ color: "red" }}>{order.orderStatus}</p>
              )}
            </div>
            <div className="order-page-items">
              <h3>Ordered Items</h3>
              {order.orderItems.map((item) => {
                return (
                  <div key={item._id} className="ordered-item">
                    <img src={item.image} alt="" />
                    <span>{item.name}</span>
                    <span>PKR. {item.price}/-</span>
                    <span>{order.orderItems.length} Piece(s)</span>
                  </div>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default OrderDetails;
