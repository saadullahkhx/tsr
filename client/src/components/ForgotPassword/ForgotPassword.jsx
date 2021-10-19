import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, forgotPassword } from "../../redux/actions/userActions";
import CustomInput from "../CustomInput/CustomInput";
import "./ForgotPassword.css";
import CustomButton from "../CustomButton/CustomButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const dispatch = useDispatch();

  const { error, message } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (email === "") return toast.error("Email is required");

    dispatch(forgotPassword(email));
  };

  return (
    <React.Fragment>
      <span onClick={onOpenModal}>Forgot Password?</span>
      <Modal open={open} onClose={onCloseModal}>
        <div className="forgot-password">
          <div>
            <h5>Lost your password? Let us help.</h5>
            <CustomInput
              placeholder="Your Email Address..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomButton type="button" onClick={handleForgotPassword}>
              Recover Password
            </CustomButton>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ForgotPassword;
