import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`TSR: The Stock Room - Complete Accessories Ecommerce - ${title}`}</title>
    </Helmet>
  );
};

export default MetaData;
