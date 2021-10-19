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
          <h1>{user.name}'s Profile</h1>

          <div className="profile-details">
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
            <CustomButton onClick={handleLogout} isLogout={true}>
              Logout
            </CustomButton>
            <UpdateUser />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Profile;
