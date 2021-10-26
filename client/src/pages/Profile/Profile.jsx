import React from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../redux/actions/userActions";
import { useHistory } from "react-router";
import Loader from "../../components/Loader/Loader";
import MetaData from "../../MetaData";
import "./Profile.css";
import UpdateUser from "../../components/UpdateUser/UpdateUser";
import ListOrders from "../../components/ListOrders/ListOrders";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user, loading } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());

    toast.success("Logged out successfully.");
    history.push("/");
  };
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="profile-page">
          <MetaData title={`${user.name} profile`} />

          <div className="profile-details">
            <h1>{user.name}'s Profile</h1>
            <div>
              <h4>Full Name</h4>
              <p>{user.name}</p>
            </div>
            <div>
              <h4>Email Address</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <h4>Joined On</h4>
              <p>{user.createdAt}</p>
            </div>
            {user.role === "admin" ? (
              <Link to="/admin/dashboard" style={{ marginBottom: "5px" }}>
                <CustomButton>Admin Dashboard</CustomButton>
              </Link>
            ) : null}
            <CustomButton onClick={handleLogout} isLogout={true}>
              Logout
            </CustomButton>
            <UpdateUser />
          </div>
          <ListOrders />
        </div>
      )}
    </React.Fragment>
  );
};

export default Profile;
