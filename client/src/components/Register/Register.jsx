import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../MetaData";
import { useHistory } from "react-router-dom";
import { register, clearErrors } from "../../redux/actions/userActions";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import "./Register.css";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = userDetails;

  const history = useHistory();
  const dispatch = useDispatch();

  const { error, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, history]);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(register(formData));
  };
  return (
    <React.Fragment>
      <MetaData title="Register" />
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <CustomInput
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          onChange={handleChange}
        />
        <CustomInput
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />
        <CustomInput
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <CustomInput
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          type="password"
          onChange={handleChange}
        />
        <CustomButton>Register</CustomButton>
        <p>
          Already have an account?{" "}
          <span onClick={() => history.push("/login")}>Login!</span>
        </p>
      </form>
    </React.Fragment>
  );
};

export default Register;
