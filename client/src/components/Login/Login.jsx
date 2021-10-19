import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import MetaData from "../../MetaData";
import { useHistory } from "react-router-dom";
import { login, clearErrors } from "../../redux/actions/userActions";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import "./Login.css";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return loading ? (
    <Loader />
  ) : (
    <React.Fragment>
      <MetaData title="Login" />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <CustomInput
          value={email}
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomInput
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <ForgotPassword />
        <CustomButton>Login</CustomButton>
        <p>
          Don't have an account?{" "}
          <span onClick={() => history.push("/sign-up")}>Create one!</span>
        </p>
      </form>
    </React.Fragment>
  );
};

export default Login;
