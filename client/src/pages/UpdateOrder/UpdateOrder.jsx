import React, { useState, useEffect } from "react";
import MetaData from "../../MetaData";
import Loader from "../../components/Loader/Loader";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../redux/actions/ordersActions";
import { UPDATE_ORDER_RESET } from "../../redux/constants/orderConstants";
import CustomButton from "../../components/CustomButton/CustomButton";
import "./UpdateOrder.css";

const UpdateOrder = ({ match }) => {
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const { loading, order } = useSelector((state) => state.orderDetails);
  const { error, isUpdated } = useSelector((state) => state.order);

  const orderId = match.params.id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Order updated");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, isUpdated, orderId]);

  const handleUpdateOrder = (id) => {
    dispatch(updateOrder(id, { status }));
  };
  return loading ? (
    <Loader />
  ) : (
    <React.Fragment>
      <MetaData title="Update Order" />
      <DashboardSidebar />
      <div className="update-order-page">
        <div className="details-of-order">
          <h3>Order # {order && order._id}</h3>
          <div className="details-of-order-content">
            <div>
              <h3>Details</h3>
              <p>Name: {order && order.shippingInfo.name}</p>
              <p>Phone: {order && order.shippingInfo.phoneNo}</p>
              <p>Address: {order && order.shippingInfo.address}</p>
              <p>
                Amount: <strong> PKR.{order && order.totalPrice}/-</strong>
              </p>
            </div>

            <div>
              <h3>Order Status</h3>
              <p>{order && order.orderStatus}</p>
            </div>
            <div className="items-ordered">
              <h3>Ordered Items</h3>
              {order &&
                order.orderItems.map((item) => {
                  return (
                    <div key={item._id} className="item-in-order">
                      <img src={item.image} alt="" />
                      <span>{item.name}</span>
                      <span>PKR. {item.price}/-</span>
                      <span>{order.orderItems.length} Piece(s)</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="status-of-order">
          <h3>Status</h3>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="On Confirmation">On Confirmation</option>
            <option value="Ready">Ready To Deliver</option>
          </select>
          <CustomButton onClick={() => handleUpdateOrder(orderId)}>
            Update
          </CustomButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdateOrder;
