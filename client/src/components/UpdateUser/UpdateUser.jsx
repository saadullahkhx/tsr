import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import "./UpdateUser.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  updatePassword,
  clearErrors,
  loadUser,
} from "../../redux/actions/userActions";
import {
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_RESET,
} from "../../redux/constants/userConstants";

const UpdateUser = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector(
    (state) => state.userProfile
  );

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Changes saved!");
      dispatch(loadUser());

      setOpen(false);

      dispatch({ type: UPDATE_PROFILE_RESET });
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, isUpdated, user]);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") setEmail(user.email);
    if (name === "") setName(user.name);

    dispatch(updateProfile({ name, email }));
  };

  const submitPassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    dispatch(updatePassword({ oldPassword, newPassword }));
  };

  return (
    <React.Fragment>
      <CustomButton onClick={onOpenModal}>Update Profile</CustomButton>
      <Modal open={open} onClose={onCloseModal}>
        <div className="update-user">
          <form onSubmit={handleSubmit}>
            <h5>Update Profile</h5>
            <CustomInput
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <CustomInput
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomButton disabled={loading ? true : false}>
              Save Changes
            </CustomButton>
          </form>
          <form onSubmit={submitPassword}>
            <h5>Change Password</h5>
            <CustomInput
              type="password"
              placeholder="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <CustomInput
              type="password"
              placeholder="Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <CustomInput
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <CustomButton disabled={loading ? true : false}>
              Change Password
            </CustomButton>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default UpdateUser;
