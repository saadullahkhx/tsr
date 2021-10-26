import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getUserDetails,
  clearErrors,
  loadUser,
} from "../../redux/actions/userActions";

import { toast } from "react-toastify";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstants";

import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";

const UpdateUser = ({ match }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  const { error, isUpdated } = useSelector((state) => state.userProfile);
  const { user } = useSelector((state) => state.userDetails);

  const userId = match.params.id;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (isUpdated) {
      toast.success("User Updated");

      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, isUpdated, user, userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser(user._id, { name, email, role }));
  };

  return (
    <React.Fragment>
      <form className="update-product-form" onSubmit={handleSubmit}>
        <h3>User # {user._id}</h3>
        <CustomInput
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <CustomInput
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <CustomButton>Update</CustomButton>
      </form>
    </React.Fragment>
  );
};

export default UpdateUser;
