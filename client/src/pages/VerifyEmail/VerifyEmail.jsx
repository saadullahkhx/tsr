import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, clearErrors } from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import { VERIFY_EMAIL_RESET } from "../../redux/constants/userConstants";
import Loader from "../../components/Loader/Loader";

const VerifyEmail = ({ history, match }) => {
  const dispatch = useDispatch();

  const { error, isVerified, message, loading } = useSelector(
    (state) => state.verifyEmail
  );

  useEffect(() => {
    dispatch(verifyEmail(match.params.token));
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isVerified) {
      toast.success(message);
      dispatch({ type: VERIFY_EMAIL_RESET });
      history.push("/login");
    }
  }, [dispatch, error, isVerified, history, message, match.params.token]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      {error && <p>Failed to verify your email</p>}
      {isVerified && <p>Email Verification Successful</p>}
    </div>
  );
};

export default VerifyEmail;
