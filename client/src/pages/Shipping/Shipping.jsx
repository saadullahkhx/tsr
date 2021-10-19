import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../redux/actions/cartActions";
import { useHistory } from "react-router-dom";
import MetaData from "../../MetaData";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import "./Shipping.css";
import { toast } from "react-toastify";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const [name, setName] = useState(shippingInfo.name);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address || !city || !postalCode || !phoneNo)
      return toast.error("All fields are required");

    dispatch(saveShippingInfo({ name, address, city, phoneNo, postalCode }));
    history.push("/confirm");
  };

  return (
    <React.Fragment>
      <MetaData title="Shipping Info" />
      <div className="shipping-page">
        <h1>Your Details</h1>
        <form className="shipping-form" onSubmit={handleSubmit}>
          <CustomInput
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomInput
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <CustomInput
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <CustomInput
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <CustomInput
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />

          <CustomButton>Continue</CustomButton>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Shipping;
