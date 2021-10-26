import React from "react";
import "./DashboardSidebar.css";
import { Link } from "react-router-dom";
import NewProduct from "../../pages/NewProduct/NewProduct";

const DashboardSidebar = () => {
  return (
    <div className="dashboard-sidebar">
      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/products">All Products</Link>
      <NewProduct />
      <Link to="/admin/orders">Orders</Link>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/reviews">Reviews</Link>
    </div>
  );
};

export default DashboardSidebar;
