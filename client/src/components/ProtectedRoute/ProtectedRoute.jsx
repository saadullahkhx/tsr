import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProtectedRoute = ({ component: Component, ...otherProps }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  return (
    <React.Fragment>
      {loading === false && (
        <Route
          {...otherProps}
          render={(props) => {
            if (isAuthenticated === false) {
              toast.error("Please login to access this page");
              return <Redirect to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default ProtectedRoute;
