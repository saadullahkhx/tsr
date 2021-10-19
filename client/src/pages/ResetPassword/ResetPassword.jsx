import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";

const ResetPassword = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Changes saved. Please login with new credentials.");

      history.push("/login");
    }
  }, [dispatch, error, success, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords don't match");
    }

    dispatch(resetPassword(match.params.token, { password, confirmPassword }));
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="reset-password-page">
        <CustomInput
          value={password}
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <CustomInput
          value={confirmPassword}
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <CustomButton>Change Password</CustomButton>
      </form>
    </React.Fragment>
  );
};

export default ResetPassword;
