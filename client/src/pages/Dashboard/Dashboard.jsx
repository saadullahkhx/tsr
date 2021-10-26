import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../redux/actions/productsActions";
import "./Dashboard.css";
import MetaData from "../../MetaData";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";
import { allOrders } from "../../redux/actions/ordersActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders, totalAmount } = useSelector((state) => state.allOrders);
  let outOfStock = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
  }, [dispatch]);
  return (
    <div className="dashboard-page">
      <MetaData title="Dashboard" />
      <DashboardSidebar />
      <div className="dashboard-content">
        <h2>Dashboard</h2>
        <div className="dashboard">
          <div className="card-total-amount d-card">
            <h3>Total Amount</h3>
            <p>PKR. {totalAmount && totalAmount.toFixed(2)}/-</p>
          </div>
          <div className="card-total-products d-card">
            <h3>Total Products</h3>
            <p>{products && products.length}</p>
          </div>
          <div className="card-total-orders d-card">
            <h3>Total Orders</h3>
            <p>{orders && orders.length}</p>
          </div>
          <div className="card-total-users d-card">
            <h3>Users</h3>
            <p>{users && users.length}</p>
          </div>
          <div className="card-out-of-stock d-card">
            <h3>Out Of Stock</h3>
            <p>{outOfStock}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
